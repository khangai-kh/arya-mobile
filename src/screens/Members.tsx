import { CompositeNavigationProp, NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState, useCallback, useMemo } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { Member } from '../components/Member';
import { MainStackParams } from '../models/navigation';
import { UserModel, UserModelList } from '../models/users/User/user.model';
import { API } from '../plugins/axios';
import { DEFAULT_PAGE, PAGE_SIZE } from '../constants/constants';
import { RootState } from '../redux/configureStore';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { BottomTabStackParams } from '../navigation/user/tabs/BottomTab';

type UseNavigationProps = CompositeNavigationProp<
  NavigationProp<BottomTabStackParams, 'Home'>,
  NavigationProp<MainStackParams>
>;

type MembersProps = {
  refresh?: boolean;
  myUsers?: boolean;
  filterModel?: Record<string, any>;
};

export const Members = (props: MembersProps) => {
  const { navigate } = useNavigation<UseNavigationProps>();
  const refresh = props.refresh || false;
  const myUsers = props.myUsers || false;
  const { colors } = useTheme();
  const [members, setMembers] = useState<UserModelList[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const { token } = useSelector((state: RootState) => state.auth);
  const filterState = useSelector((state: RootState) => state.filter);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalMembers, setTotalMembers] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingFollowId, setLoadingFollowId] = useState<number | null>(null);

  console.log(myUsers);
  // Check if there are active filters
  const hasActiveFilters = useMemo(() => {
    return (
      filterState &&
      (filterState.roleIds.length > 0 ||
        filterState.batchIds.length > 0 ||
        filterState.interestIds.length > 0 ||
        filterState.sectorIds.length > 0 ||
        filterState.cities.length > 0 ||
        filterState.in_my_favorited ||
        filterState.in_mentor ||
        filterState.have_investestment ||
        filterState.keyword)
    );
  }, [filterState]);

  // Determine the active filter model: prioritize Redux filter state over props
  const filterModel = useMemo(() => {
    if (hasActiveFilters) {
      return {
        roleIds: filterState.roleIds,
        batchIds: filterState.batchIds,
        interestIds: filterState.interestIds,
        sectorIds: filterState.sectorIds,
        cities: filterState.cities,
        in_my_favorited: filterState.in_my_favorited,
        in_mentor: filterState.in_mentor,
        have_investestment: filterState.have_investestment,
        keyword: filterState.keyword,
        page: filterState.page || DEFAULT_PAGE,
        page_size: filterState.page_size || PAGE_SIZE,
      };
    }
    return props.filterModel ?? {};
  }, [filterState, props.filterModel, hasActiveFilters]);

  const fetchAnnouncements = useCallback(
   
    async (pageNum: number) => {
      try {
        console.log('Fetching members with filter:', filterModel);

        if (Object.keys(filterModel).length > 0) {
          const response = await API.post('/api/user/member-filter', {
            ...filterModel,
            page: pageNum,
            page_size: PAGE_SIZE,
          });
          console.log('Members filter response:', response.data);
          return response;
        }

        if (myUsers) {
          const response = await API.get('/api/user/my-favorite-users', {
            params: {
              page: pageNum,
              page_size: PAGE_SIZE,
            },
          });
          return response;
        }

        const response = await API.get('/api/users', {
          params: {
            page: pageNum,
            page_size: PAGE_SIZE,
          },
        });
        return response;

      } catch (error) {
        console.error('Error fetching announcements:', error);
        throw error;
      }
    },
    [filterModel, myUsers] // Added myUsers to dependencies
  );

  const { isFetching: isFetchingAnnouncements, refetch } = useQuery(
    ['contents', page, PAGE_SIZE, token, filterModel],
    () => fetchAnnouncements(page),
    {
      onSuccess: (data) => {
        if (page === DEFAULT_PAGE) {
          setMembers(data.data);
        } else {
          setMembers((prev) => [...prev, ...data.data]);
        }
        setTotalMembers(data.total);
        setHasMore(data.data.length === PAGE_SIZE);
      },
      enabled: !isLoadingMore,
    }
  );

  useFocusEffect(
    useCallback(() => {
      if (refresh || Object.keys(filterModel).length > 0) {
        setPage(DEFAULT_PAGE);
        setMembers([]);
        refetch();
      }
    }, [refresh, filterModel, refetch])
  );

  const loadMore = useCallback(async () => {
    if (!isLoadingMore && hasMore && !isFetchingAnnouncements) {
      setIsLoadingMore(true);
      const nextPage = page + 1;
      try {
        const newData = await fetchAnnouncements(nextPage);
        setMembers((prev) => [...prev, ...newData.data]);
        setPage(nextPage);
        setHasMore(newData.data.length === PAGE_SIZE);
      } catch (error) {
        console.error('Error loading more members:', error);
      } finally {
        setIsLoadingMore(false);
      }
    }
  }, [isLoadingMore, hasMore, isFetchingAnnouncements, page, fetchAnnouncements]);

  const handleScroll = ({ nativeEvent }: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      loadMore();
    }
  };

  const handleFollowPress = useCallback(
    async (userId: number) => {
      setLoadingFollowId(userId);
      try {
        const currentMember = members.find((member) => member.id === userId);
        const currentFollowing = currentMember?.is_favorited || false;

        if (currentFollowing) {
          await API.post('/api/users/unfollow', { user_id: userId });
        } else {
          await API.post('/api/users/follow', { user_id: userId });
        }
        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.id === userId
              ? { ...member, is_favorited: !currentFollowing }
              : member
          )
        );
      } catch (error) {
        console.error('Error toggling follow status:', error);
      } finally {
        setLoadingFollowId(null);
      }
    },
    [members]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{totalMembers} members</Text>
        <View style={styles.filterIconContainer}>
          <IconButton
            icon={require('../assets/flat-icons/filter.png')}
            size={18}
            onPress={() => {
              navigate('MemberFilter');
            }}
          />
          {hasActiveFilters && <View style={styles.filterDot} />}
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
      >
        {isFetchingAnnouncements && page === DEFAULT_PAGE ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          members.map((member, index) => (
            <Member
              key={index}
              name={member.full_name || ''}
              image={member.photo}
              memberRole={member.role?.name || ''}
              company = {member.carrier?.company_name }
              title = {member.carrier?.title }
              following={member.is_favorited || false}
              interests={member.interests}
              isLoading={loadingFollowId === (member.id || 0)}
              style={[
                styles.memberItem,
                index === members.length - 1 && styles.lastMemberItem,
              ]}
              onPress={() => {
                navigate('Member', { id: member.id });
              }}
              onFollowPress={() => handleFollowPress(member.id || 0)}
            />
          ))
        )}
        {isLoadingMore && (
          <View style={styles.loadingMoreContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  filterIconContainer: {
    position: 'relative',
  },
  filterDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C71585', // Use a noticeable color, matching your filter count color
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingMoreContainer: {
    alignItems: 'center',
    padding: 20,
  },
  memberItem: {
    marginBottom: 8,
  },
  lastMemberItem: {
    marginBottom: 0,
  },
});

export default Members;
