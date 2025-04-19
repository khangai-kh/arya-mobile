import React, { useCallback, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Button, IconButton, MD3Theme, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Funding } from '../components/Funding';
import { MainStackParams } from '../models/navigation';
import { API } from '../plugins/axios';
import { DEFAULT_PAGE, PAGE_SIZE } from '../constants/constants';
import { useQuery } from 'react-query';
import { RootState } from '../redux/configureStore';
import { StartupModel } from '../models/homepage/Startup';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';

type StartupsProps = StackScreenProps<MainStackParams, 'Startups'>;

export const Startups = ({ navigation, route }: StartupsProps) => {
  const { colors } = useTheme();
  const { filterModel, type: type } = route?.params || {};
  const dynamicStyles = createDynamicStyles(colors);
  const [page, setPage] = useState({ active: DEFAULT_PAGE, graduates: DEFAULT_PAGE });
  const { token } = useSelector((state: RootState) => state.auth);
  const [startups, setStartups] = useState<StartupModel[]>([]);
  const [graduateStartups, setGraduateStartups] = useState<StartupModel[]>([]);
  const [totalMembers, setTotalMembers] = useState({ active: 0, graduates: 0 });
  const [hasMore, setHasMore] = useState({ active: true, graduates: true });
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadingFollowId, setLoadingFollowId] = useState<number | null>(null);
  const [value, setValue] = useState<'active' | 'graduates'>('active');

  const fetchStartupsData = useCallback(
    async (pageNum: number, fetchType: 'active' | 'graduates') => {
      if (!token) {
        throw new Error('No authentication token available');
      }

      try {
        const params =
          fetchType === 'active'
            ? type !== 0
              ? { page: pageNum, page_size: PAGE_SIZE, startup_investment_status_ids: type }
              : {
                  page: pageNum,
                  page_size: PAGE_SIZE,
                  startup_types_ids: 1,
                  startup_investment_status_ids: 1,
                }
            : {
                page: pageNum,
                page_size: PAGE_SIZE,
                startup_investment_status_ids: [1, 2], // Adjust for graduates
              };

        const response = await API.get('/api/startups/', {
          params,
          headers: { Authorization: `Bearer ${token.trim()}` },
        });

        return {
          startups: response.data || [],
          total: response.pagination?.total_startups || 0,
        };
      } catch (error: any) {
        if (error.response?.status === 401) {
          navigation.navigate('SignIn');
          throw new Error('Session expired. Please log in again.');
        }
        throw error;
      }
    },
    [navigation, token, type]
  );

  const { isFetching, refetch } = useQuery(
    ['startupsData', page, value, token],
    async () => {
      const activeData = await fetchStartupsData(page.active, 'active');
      const graduatesData = type === 0 ? await fetchStartupsData(page.graduates, 'graduates') : { startups: [], total: 0 };
      return { active: activeData, graduates: graduatesData };
    },
    {
      enabled: !!token,
      onSuccess: (data) => {
        // Update active startups
        if (page.active === DEFAULT_PAGE) {
          setStartups(data.active.startups);
        } else {
          setStartups((prev) => [...prev, ...data.active.startups]);
        }
        setTotalMembers((prev) => ({ ...prev, active: data.active.total }));
        setHasMore((prev) => ({ ...prev, active: data.active.startups.length === PAGE_SIZE }));

        // Update graduate startups (if applicable)
        if (type === 0) {
          if (page.graduates === DEFAULT_PAGE) {
            setGraduateStartups(data.graduates.startups);
          } else {
            setGraduateStartups((prev) => [...prev, ...data.graduates.startups]);
          }
          setTotalMembers((prev) => ({ ...prev, graduates: data.graduates.total }));
          setHasMore((prev) => ({ ...prev, graduates: data.graduates.startups.length === PAGE_SIZE }));
        }
      },
      onError: (error: any) => {
        console.error('Failed to fetch startups:', error.message);
        setStartups([]);
        setGraduateStartups([]);
      },
    }
  );

  useFocusEffect(
    useCallback(() => {
      if (token) {
        setPage({ active: DEFAULT_PAGE, graduates: DEFAULT_PAGE });
        setStartups([]);
        setGraduateStartups([]);
        refetch();
      }
    }, [refetch, token])
  );

  const loadMore = useCallback(async () => {
    if (!isLoadingMore && hasMore[value] && !isFetching && token) {
      setIsLoadingMore(true);
      const nextPage = page[value] + 1;
      try {
        const newData = await fetchStartupsData(nextPage, value);
        if (value === 'active') {
          setStartups((prev) => [...prev, ...newData.startups]);
          setPage((prev) => ({ ...prev, active: nextPage }));
          setHasMore((prev) => ({ ...prev, active: newData.startups.length === PAGE_SIZE }));
        } else {
          setGraduateStartups((prev) => [...prev, ...newData.startups]);
          setPage((prev) => ({ ...prev, graduates: nextPage }));
          setHasMore((prev) => ({ ...prev, graduates: newData.startups.length === PAGE_SIZE }));
        }
      } catch (error: any) {
        console.error('Error loading more startups:', error.message);
      } finally {
        setIsLoadingMore(false);
      }
    }
  }, [isLoadingMore, hasMore, isFetching, page, fetchStartupsData, token, value]);

  const handleScroll = ({ nativeEvent }: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const paddingToBottom = 20;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      loadMore();
    }
  };

  const handleFollowPress = useCallback(
    async (startupId: number) => {
      if (!startupId || loadingFollowId !== null) return;
      setLoadingFollowId(startupId);
      try {
        const currentList = value === 'active' ? startups : graduateStartups;
        const currentMember = currentList.find((startup) => startup.id === startupId);
        const currentFollowing = currentMember?.is_favorite || false;
        await API.post('/api/startups/add-favorites', {
          startup_id: startupId,
          status: !currentFollowing,
        });

        const updateList = (prev: StartupModel[]) =>
          prev.map((member) =>
            member.id === startupId ? { ...member, is_favorite: !currentFollowing } : member
          );

        if (value === 'active') {
          setStartups(updateList);
        } else {
          setGraduateStartups(updateList);
        }
      } catch (error: any) {
        console.error('Error toggling follow status:', error.response?.data || error.message);
      } finally {
        setLoadingFollowId(null);
      }
    },
    [startups, graduateStartups, loadingFollowId, value]
  );

  if (!token) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Please log in to view startups.</Text>
          <IconButton icon="login" onPress={() => navigation.navigate('SignIn')} />
        </View>
      </SafeAreaView>
    );
  }

  const displayedStartups = value === 'active' ? startups : graduateStartups;
  const displayedTotal = totalMembers[value];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Appbar.Header style={dynamicStyles.appbarHeader}>
        <Appbar.Action
          icon={require('../assets/flat-icons/angle-small-left.png')}
          color="#414042"
          size={20}
          style={dynamicStyles.appbarActionRight}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          title={
            <View style={dynamicStyles.titleContainer}>
              <Text variant="titleMedium" style={dynamicStyles.titleText}>
                {type === 0 ? 'Academy startups' : 'Startups'}
              </Text>
            </View>
          }
        />
      </Appbar.Header>
      {isFetching && displayedStartups.length === 0 ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text>{displayedTotal} startups</Text>
              <IconButton
                icon={require('../assets/flat-icons/filter.png')}
                size={18}
                onPress={() => navigation.navigate('StartupsFilter')}
              />
            </View>
            {type === 0 && (
              <View style={styles.buttonContainer}>
                <View style={styles.safeArea} >
                <Button
                  mode={value === 'active' ? 'contained' : 'text'}
                  onPress={() => setValue('active')}
                >
                  Active ({totalMembers.active})
                </Button>
                </View>
                <View style={styles.safeArea} >
                <Button
                  mode={value === 'graduates' ? 'contained' : 'text'}
                  onPress={() => setValue('graduates')}
                >
                  Graduates ({totalMembers.graduates})
                </Button>
                </View>
              </View>
            )}
            {displayedStartups.map((startup, index) => (
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
                style={[styles.fundingItem, index === displayedStartups.length - 1 && styles.noMarginBottom]}
                isLoading={loadingFollowId === startup.id}
                onPress={() => navigation.navigate('Startup', { id: startup.id || 0 })}
                onFollowPress={() => handleFollowPress(startup.id || 0)}
              />
            ))}
            {isLoadingMore && (
              <View style={styles.loaderMoreContainer}>
                <ActivityIndicator size="small" color={colors.primary} />
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

// Styles remain unchanged
const createDynamicStyles = (colors: MD3Theme['colors']) =>
  StyleSheet.create({
    appbarHeader: {
      width: '100%',
      backgroundColor: 'transparent',
      alignContent: 'flex-start',
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    appbarActionRight: {
      backgroundColor: colors.onPrimary,
      marginRight: 5,
    },
    titleContainer: {
      alignItems: 'center',
    },
    titleText: {
      fontWeight: 'bold',
      marginLeft: -40,
    },
  });

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fundingItem: {
    marginBottom: 8,
  },
  noMarginBottom: {
    marginBottom: 0,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderMoreContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 32,
    marginBottom: 10,
  },
});
