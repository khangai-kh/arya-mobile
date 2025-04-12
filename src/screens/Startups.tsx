import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, IconButton, MD3Theme, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Funding } from '../components/Funding';
import { MainStackParams } from '../models/navigation';
import { API } from '../plugins/axios';
import { DEFAULT_PAGE, PAGE_SIZE } from '../constants/constants';
import { useQuery } from 'react-query';
import { RootState } from '../redux/configureStore';
import { useSelector } from 'react-redux';
import { StartupModel } from '../models/homepage/Startup';
import { useFocusEffect } from '@react-navigation/native';

type StartupsProps = StackScreenProps<MainStackParams, 'Startups'>;

export const Startups = (props: StartupsProps) => {
    const { navigation } = props;
    const { colors } = useTheme();
    const dynamicStyles = createDynamicStyles(colors);
    const refresh = props.refresh || false;
    const [page, setPage] = useState(DEFAULT_PAGE);
    const { token } = useSelector((state: RootState) => state.auth);
    const [startups, setStartups] = useState<StartupModel[]>([]);
    const [totalMembers, setTotalMembers] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

     const fetchAnnouncements = useCallback(
        async (pageNum: number) => {
            const response = await API.get('/api/startups', {
              params: {
                page: pageNum,
                page_size: PAGE_SIZE,
              },
            });
            return response;
          },
        [] // Dependency array added
      );

      const { isFetching: isFetchingAnnouncements, refetch } = useQuery(
        ['contents', page, PAGE_SIZE, token],
        () => fetchAnnouncements(page),
        {
          onSuccess: (data) => {
            if (page === DEFAULT_PAGE) {
              setStartups(data.data);
            } else {
                setStartups((prev) => [...prev, ...data.data]);
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
            setStartups([]);
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
            setStartups((prev) => [...prev, ...newData.data]);
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

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
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
                        Announcements
                    </Text>
                    </View>
                }
                />
            </Appbar.Header>
            <ScrollView style={styles.scrollView}
                onScroll={handleScroll}
                showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text>{totalMembers} startups</Text>
                        <IconButton
                            icon={require('../assets/flat-icons/filter.png')}
                            size={18}
                            onPress={() => { navigation.navigate('StartupsFilter'); }}
                        />
                    </View>
                    {startups.map((startup, index) => (
                        <Funding
                            startup_id = {startup.id}
                            title={startup.name ?? ''}
                            bio={startup.description ?? ''}
                            image={startup.startup_logo ?? ''}
                            following={startup.is_favorite}
                            type={startup.startup_type ?? undefined}
                            status={startup.startup_status ?? undefined}
                            investmentStatus={undefined}
                            valuation={startup.valuation != null ? String(startup.valuation) : undefined}
                            targetAmount={startup.target_amount != null ? String(startup.targetAmount) : undefined}
                            amountCollected={startup.amount_collected != null ? String(startup.amountCollected) : undefined}
                            totalInvestment={startup.total_investment != null ? String(startup.totalInvestment) : undefined}
                            style={[
                                styles.fundingItem,
                                index === startups.length - 1 && styles.noMarginBottom
                            ]}
                            onPress={() => {
                                navigation.navigate('Startup', {
                                    id: startup.id,
                                });
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const createDynamicStyles = (colors: MD3Theme['colors']) =>
  StyleSheet.create({
    appbarHeader: {
        width: '100%',
        backgroundColor: 'transparent',
        alignContent: 'flex-start',
        justifyContent: 'space-between',
        borderBottomColor: colors.outline,
        borderBottomWidth: StyleSheet.hairlineWidth,
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
        marginTop: 24,
        marginHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    fundingItem: {
        marginBottom: 8,
    },
    noMarginBottom: {
        marginBottom: 0,
    },
});
