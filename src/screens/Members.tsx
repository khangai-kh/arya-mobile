import { CompositeNavigationProp, NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { Member } from '../components/Member';
import { MainStackParams } from '../models/navigation';
import { BottomTabStackParams } from '../navigation/user/tabs/BottomTab';
import { UserModelList } from '../models/users/User/user.model';
import { API } from '../plugins/axios';
import { DEFAULT_PAGE, PAGE_SIZE } from '../constants/constants';
import { RootState } from '../redux/configureStore';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

type UseNavigationProps = CompositeNavigationProp<
  NavigationProp<BottomTabStackParams, 'Home'>,
  NavigationProp<MainStackParams>
>;

export const Members = () => {
  const { navigate } = useNavigation<UseNavigationProps>();
  const { colors } = useTheme();
  const [members, setMembers] = useState<UserModelList[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const { token } = useSelector((state: RootState) => state.auth);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchAnnouncements = useCallback(
    async (pageNum: number) => {
      const response = await API.get('/api/users', {
        params: {
          page: pageNum,
          page_size: PAGE_SIZE,
        },
      });
      return response.data.users || [];
    },
    []
  );

  const { isFetching: isFetchingAnnouncements } = useQuery(
    ['contents', page, PAGE_SIZE, token],
    () => fetchAnnouncements(page),
    {
      onSuccess: (data) => {
        if (page === DEFAULT_PAGE) {
          setMembers(data);
        } else {
          setMembers(prev => [...prev, ...data]);
        }
        setHasMore(data.length === PAGE_SIZE);
      },
      enabled: !isLoadingMore,
    }
  );

  const loadMore = useCallback(async () => {
    if (!isLoadingMore && hasMore && !isFetchingAnnouncements) {
      setIsLoadingMore(true);
      const nextPage = page + 1;
      try {
        const newData = await fetchAnnouncements(nextPage);
        setMembers(prev => [...prev, ...newData]);
        setPage(nextPage);
        setHasMore(newData.length === PAGE_SIZE);
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>200 members</Text>
        <IconButton
         icon={require('../assets/flat-icons/filter.png')}
          size={18}
          onPress={() => {}}
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
              memberRole={member.role?.role_name || ''}
              status={member.title}
              following={member.is_connected || false}
              interests={member.interests}
              style={[
                styles.memberItem,
                index === members.length - 1 && styles.lastMemberItem
              ]}
              onPress={() => {
                navigate('Member', {
                  id: member.id,
                });
              }}
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