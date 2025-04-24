import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Appbar, Searchbar, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainStackParams } from '../models/navigation';
import { ContentModel } from '../models/homepage/Content';
import { Inspiration } from '../components/Inspiration';
import { DEFAULT_PAGE, PAGE_SIZE } from '../constants/constants';
import { API } from '../plugins/axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';
import { Member } from '../components/Member';
import { UserModelList } from '../models/users/User/user.model';
import { StartupModel } from '../models/homepage/Startup';
import { Funding } from '../components/Funding';

type SearchProps = StackScreenProps<MainStackParams, 'Search'>;

export const Search = (props: SearchProps) => {
  const { navigation } = props;
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const { token } = useSelector((state: RootState) => state.auth);
  const [contents, setContents] = useState<ContentModel[]>([]);
  const [members, setMembers] = useState<UserModelList[]>([]);
  const [startups, setStartups] = useState<StartupModel[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(4);
  const [loadingFollowId, setLoadingFollowId] = useState<number | null>(null);

  const contentTypes = [
    { id: 4, name: 'Contents' },
    { id: 1, name: 'Members' },
    //{ id: 2, name: 'Investment' },
    { id: 3, name: 'Startups' },
  ];
  const dynamicStyles = createDynamicStyles(colors);

  // Debounce the search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setPage(DEFAULT_PAGE);
      setContents([]);
      setMembers([]);
      setStartups([]);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch functions
  const fetchAnnouncements = useCallback(
    async (pageNum: number) => {
      const response = await API.get('/api/contents', {
        params: {
          page: pageNum,
          page_size: PAGE_SIZE,
          keyword: debouncedSearchQuery,
        },
      });
      return response.data || [];
    },
    [debouncedSearchQuery]
  );

  const fetchMembers = useCallback(
    async (pageNum: number) => {
      const response = await API.get('/api/users', {
        params: {
          page: pageNum,
          page_size: PAGE_SIZE,
          keyword: debouncedSearchQuery,
        },
      });
      return response.data || [];
    },
    [debouncedSearchQuery]
  );

  const fetchStartups = useCallback(
    async (pageNum: number) => {
      const response = await API.get('/api/startups/', {
        params: {
          page: pageNum,
          page_size: PAGE_SIZE,
          keyword: debouncedSearchQuery,
        },
      });
      return response.data || [];
    },
    [debouncedSearchQuery]
  );

  // Follow handlers
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

  const handleFollowPress1 = useCallback(
    async (startupId: number) => {
      if (!startupId || loadingFollowId !== null) return;
      setLoadingFollowId(startupId);
      try {
        const currentMember = startups.find((startup) => startup.id === startupId);
        const currentFollowing = currentMember?.is_favorite || false;
        await API.post('/api/startups/add-favorites', {
          startup_id: startupId,
          status: !currentFollowing,
        });
        setStartups((prev) =>
          prev.map((member) =>
            member.id === startupId ? { ...member, is_favorite: !currentFollowing } : member
          )
        );
      } catch (error: any) {
        console.error('Error toggling follow status:', error.response?.data || error.message);
      } finally {
        setLoadingFollowId(null);
      }
    },
    [startups, loadingFollowId]
  );

  // Fetch data based on category
  const { isFetching } = useQuery(
    ['search', debouncedSearchQuery, page, PAGE_SIZE, token, selectedCategoryId],
    () => {
      if (selectedCategoryId === 1) return fetchMembers(page);
      if (selectedCategoryId === 3) return fetchStartups(page);
      if (selectedCategoryId === 4) return fetchAnnouncements(page);
      return Promise.resolve([]);
    },
    {
      onSuccess: (data) => {
        if (selectedCategoryId === 1) {
          setMembers(page === DEFAULT_PAGE ? data : (prev) => [...prev, ...data]);
        } else if (selectedCategoryId === 3) {
          setStartups(page === DEFAULT_PAGE ? data : (prev) => [...prev, ...data]);
        } else if (selectedCategoryId === 4) {
          setContents(page === DEFAULT_PAGE ? data : (prev) => [...prev, ...data]);
        }
        setHasMore(data.length === PAGE_SIZE);
      },
      enabled: debouncedSearchQuery.length >= 3 && !isLoadingMore && selectedCategoryId !== 2,
    }
  );

  const handleCategoryPress = (categoryId: number) => {
    setSelectedCategoryId(categoryId === selectedCategoryId ? null : categoryId);
    setContents([]);
    setMembers([]);
    setStartups([]);
    setPage(DEFAULT_PAGE);
    setHasMore(true);
  };

  const loadMore = useCallback(async () => {
    if (!isLoadingMore && hasMore && !isFetching) {
      setIsLoadingMore(true);
      const nextPage = page + 1;
      try {
        let newData: ContentModel[] | UserModelList[] | StartupModel[] = [];
        if (selectedCategoryId === 1) {
          newData = await fetchMembers(nextPage);
          setMembers((prev) => [...prev, ...(newData as UserModelList[])]);
        } else if (selectedCategoryId === 3) {
          newData = await fetchStartups(nextPage);
          setStartups((prev) => [...prev, ...(newData as StartupModel[])]);
        } else if (selectedCategoryId === 4) {
          newData = await fetchAnnouncements(nextPage);
          setContents((prev) => [...prev, ...(newData as ContentModel[])]);
        }
        setPage(nextPage);
        setHasMore(newData.length === PAGE_SIZE);
      } catch (error) {
        console.error('Error loading more:', error);
      } finally {
        setIsLoadingMore(false);
      }
    }
  }, [isLoadingMore, hasMore, isFetching, page, selectedCategoryId, fetchAnnouncements, fetchMembers, fetchStartups]);

  const handleScroll = ({ nativeEvent }: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const paddingToBottom = 20;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      loadMore();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Appbar.Header style={styles.appbarHeader}>
          <View style={styles.searchContainer}>
            <Searchbar
              icon={require('../assets/flat-icons/search.png')}
              clearIcon={require('../assets/flat-icons/cross-circle.png')}
              placeholder="Search in AryaUp"
              placeholderTextColor={'gray'}
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={dynamicStyles.searchbar}
              inputStyle={dynamicStyles.searchbarInput}
            />
          </View>
          <Text
            variant="titleSmall"
            style={styles.cancelText}
            onPress={() => navigation.goBack()}
          >
            Cancel
          </Text>
        </Appbar.Header>
        <View style={styles.bodyContainer}>
          <View style={dynamicStyles.chipContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {contentTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    dynamicStyles.interestBox,
                    selectedCategoryId === type.id && dynamicStyles.selectedInterestBox,
                  ]}
                  onPress={() => handleCategoryPress(type.id)}
                >
                  <Text
                    style={[
                      dynamicStyles.interestText,
                      selectedCategoryId === type.id && dynamicStyles.selectedInterestText,
                    ]}
                  >
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={handleScroll}
          >
            {selectedCategoryId === 4 && (
              <>
                {contents?.map((inspiration, index) => (
                  <Inspiration
                    key={inspiration.id}
                    title={inspiration.title ?? 'Untitled'}
                    image={inspiration.images?.[0]?.image_url ?? ''}
                    profileImage={inspiration.created_user?.photo}
                    name={inspiration.created_user?.full_name ?? 'Unknown'}
                    date={inspiration.created_at ?? ''}
                    style={{ marginBottom: index === contents.length - 1 ? 0 : 8 }}
                    onPress={() => navigation.navigate('Announcement', { id: inspiration.id || 0 })}
                  />
                ))}
                {isFetching && (
                  <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 16 }} />
                )}
              </>
            )}
            {selectedCategoryId === 1 && (
              <>
                {members?.map((member, index) => (
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
                      navigation.navigate('Member', { id: member.id });
                    }}
                    onFollowPress={() => handleFollowPress(member.id || 0)}
                  />
                ))}
                {isFetching && (
                  <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 16 }} />
                )}
              </>
            )}
            {selectedCategoryId === 3 && (
              <>
                {startups?.map((startup, index) => (
                  <Funding
                    key={startup.id ? `startup-${startup.id}` : `startup-${index}`}
                    startup_id={startup.id || 0}
                    title={startup.name ?? ''}
                    bio={startup.description ?? ''}
                    image={startup.logo ?? ''}
                    following={startup.is_favorite ?? false}
                    fundingRound={startup.funding_round_type?.name ?? ''}
                    type={startup.startup_type ?? undefined}
                    status={startup.startup_status ?? undefined}
                    investmentStatus={startup.startup_investment_status ?? undefined}
                    valuation={startup.valuation ?? 0}
                    targetAmount={startup.target_amount ?? 0}
                    amountCollected={startup.amount_collected ?? 0}
                    totalInvestment={startup.total_investment ?? 0}
                    currency={startup.currency ?? undefined}
                    style={[styles.fundingItem, index === startups.length - 1 && styles.noMarginBottom]}
                    isLoading={loadingFollowId === startup.id}
                    onPress={() => navigation.navigate('Startup', { id: startup.id || 0 })}
                    onFollowPress={() => handleFollowPress1(startup.id || 0)}
                  />
                ))}
                {isFetching && (
                  <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 16 }} />
                )}
              </>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  appbarHeader: {
    backgroundColor: 'transparent',
  },
  searchContainer: {
    flex: 1,
  },
  cancelText: {
    fontWeight: '500',
    marginHorizontal: 16,
  },
  bodyContainer: {
    // Additional styling if needed
  },
  memberItem: {
    marginBottom: 8,
  },
  lastMemberItem: {
    marginBottom: 0,
  },
  fundingItem: {
    marginBottom: 8,
  },
  noMarginBottom: {
    marginBottom: 0,
  },
});

const createDynamicStyles = (colors: any) =>
  StyleSheet.create({
    searchbar: {
      backgroundColor: '#fff',
      height: 40,
      paddingVertical: 0,
    },
    searchbarInput: {
      textAlignVertical: 'center',
      fontSize: 14,
      paddingBottom: 20,
      marginVertical: 0,
      lineHeight: 20,
      height: 40,
    },
    chipContainer: {
      marginBottom: 16,
    },
    interestBox: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      borderRadius: 15,
      backgroundColor: '#f5f5f5',
      marginVertical: 6,
      paddingHorizontal: 10,
      marginHorizontal: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    selectedInterestBox: {
      backgroundColor: colors.primary,
    },
    interestText: {
      fontSize: 12,
      color: colors.primary,
      paddingLeft: 0,
      marginLeft: 0,
    },
    selectedInterestText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    loadingMoreContainer: {
      padding: 16,
      alignItems: 'center',
    },
  });