import { CompositeNavigationProp, NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { Member } from '../components/Member';
import { MainStackParams } from '../models/navigation';
import { UserModelList } from '../models/users/User/user.model';
import { API } from '../plugins/axios';
import { DEFAULT_PAGE, PAGE_SIZE } from '../constants/constants';
import { RootState } from '../redux/configureStore';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { StackScreenProps } from '@react-navigation/stack';
import { BottomTabStackParams } from '../navigation/user/tabs/BottomTab';

type UseNavigationProps = CompositeNavigationProp<
  NavigationProp<BottomTabStackParams, 'Home'>,
  NavigationProp<MainStackParams>
>;
type MembersProps = StackScreenProps<MainStackParams, 'Members'>;


export const Members = (props: MembersProps) => {
  const { navigate } = useNavigation<UseNavigationProps>();
  const { route } = props;
  const refresh = route.params?.refresh || false;
  const { colors } = useTheme();
  const [members, setMembers] = useState<UserModelList[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const { token } = useSelector((state: RootState) => state.auth);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalMembers, setTotalMembers] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingFollowId, setLoadingFollowId] = useState<number | null>(null);

  const fetchAnnouncements = useCallback(
    async (pageNum: number) => {
      const response = await API.get('/api/users', {
        params: {
          page: pageNum,
          page_size: PAGE_SIZE,
        },
      });
      return response || [];
    },
    []
  );

  const { isFetching: isFetchingAnnouncements, refetch } = useQuery(
    ['contents', page, PAGE_SIZE, token],
    () => fetchAnnouncements(page),
    {
      onSuccess: (data) => {
        if (page === DEFAULT_PAGE) {
          setMembers(data.data);
        } else {
          setMembers(prev => [...prev, ...data.data]);
        }
        setTotalMembers(data.total);
        setHasMore(data.data.length === PAGE_SIZE);
      },
      enabled: !isLoadingMore,
    }
  );

  useFocusEffect(
    useCallback(() => {
      if (refresh) {
        setPage(DEFAULT_PAGE);
        setMembers([]);
        refetch();
      }
    }, [refresh, refetch])
  );

  const loadMore = useCallback(async () => {
    if (!isLoadingMore && hasMore && !isFetchingAnnouncements) {
      setIsLoadingMore(true);
      const nextPage = page + 1;
      try {
        const newData = await fetchAnnouncements(nextPage);
        setMembers(prev => [...prev, ...newData.data]);
        setPage(nextPage);
        setHasMore(newData.data.length === PAGE_SIZE);
      } catch (error) {
        console.error('Error loading more announcements:', error);
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
      setLoadingFollowId(userId); // Set loading state for this member
      try {
        // Get the current following state from the latest members array
        const currentMember = members.find(member => member.id === userId);
        const currentFollowing = currentMember?.is_favorited || false;

        if (currentFollowing) {
          console.log('unfollow');
          console.log(userId)
          await API.post('/api/users/unfollow', { user_id: userId });
        } else {
          console.log('follow');
          await API.post('/api/users/follow', { user_id: userId });
        }
        // Update the member's following status in the state
        setMembers(prevMembers =>
          prevMembers.map(member =>
            member.id === userId
              ? { ...member, is_favorited: !currentFollowing }
              : member
          )
        );
      } catch (error) {
        console.error('Error toggling follow status:', error);
      } finally {
        setLoadingFollowId(null); // Clear loading state
      }
    },
    [members] // Depend on members to ensure we get the latest state
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{totalMembers} members</Text>
        <IconButton
          icon={require('../assets/flat-icons/filter.png')}
          size={18}
          onPress={() => {
            navigate('MemberFilter');
          }}
        />
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
              status={member.title}
              following={member.is_favorited || false}
              interests={member.interests}
              isLoading={loadingFollowId === (member.id || 0)}
              style={[
                styles.memberItem,
                index === members.length - 1 && styles.lastMemberItem,
              ]}
              onPress={() => {
                navigate('Member', {
                  id: member.id,
                });
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