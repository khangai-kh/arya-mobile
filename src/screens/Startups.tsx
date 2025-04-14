import React, { useCallback, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, IconButton, MD3Theme, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Funding } from '../components/Funding';
import { MainStackParams } from '../models/navigation';
import { API } from '../plugins/axios';
import { DEFAULT_PAGE, PAGE_SIZE } from '../constants/constants';
import { useQuery } from 'react-query';
import { RootState } from '../redux/configureStore';
import { StartupModel } from '../models/homepage/Startup';
import {  useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';

type StartupsProps = StackScreenProps<MainStackParams, 'Startups'>;

export const Startups = ({ navigation }: StartupsProps) => {
    const { colors } = useTheme();
    const dynamicStyles = createDynamicStyles(colors);
    const [page, setPage] = useState(DEFAULT_PAGE);
    const { token } = useSelector((state: RootState) => state.auth);
    const [startups, setStartups] = useState<StartupModel[]>([]);
    const [totalMembers, setTotalMembers] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [loadingFollowId, setLoadingFollowId] = useState<number | null>(null);

    const fetchStartupsData = useCallback(
        async (pageNum: number) => {
            if (!token) {
                throw new Error('No authentication token available');
            }

            try {
                const response = await API.get('/api/startups/', {
                    params: {
                        page: pageNum,
                        page_size: PAGE_SIZE,
                        is_active_funding: true,
                    },
                    headers: { Authorization: `Bearer ${token.trim()}` },
                });

                return {
                    startups: response.data || [],
                    total: response.pagination.total_startups || 0,
                };
            } catch (error: any) {
                if (error.response?.status === 401) {
                    navigation.navigate('SignIn');
                    throw new Error('Session expired. Please log in again.');
                }
                throw error;
            }
        },
        [navigation, token]
    );

    const { isFetching: isFetchingStartups, refetch } = useQuery(
        ['startupsData', page, PAGE_SIZE, token],
        () => fetchStartupsData(page),
        {
            enabled: !!token && !isLoadingMore,
            onSuccess: (data) => {
                if (page === DEFAULT_PAGE) {
                    setStartups(data.startups);
                } else {
                    setStartups((prev) => [...prev, ...data.startups]);
                }
                setTotalMembers(data.total);
                setHasMore(data.startups.length === PAGE_SIZE);
            },
            onError: (error: any) => {
                console.error('Failed to fetch startups:', error.message);
            },
        }
    );

    useFocusEffect(
        useCallback(() => {
            if (token) {
                setPage(DEFAULT_PAGE);
                setStartups([]);
                refetch();
            }
        }, [refetch, token])
    );

    const loadMore = useCallback(async () => {
        if (!isLoadingMore && hasMore && !isFetchingStartups && token) {
            setIsLoadingMore(true);
            const nextPage = page + 1;
            try {
                const newData = await fetchStartupsData(nextPage);
                setStartups((prev) => [...prev, ...newData.startups]);
                setPage(nextPage);
                setHasMore(newData.startups.length === PAGE_SIZE);
            } catch (error: any) {
                console.error('Error loading more startups:', error.message);
            } finally {
                setIsLoadingMore(false);
            }
        }
    }, [isLoadingMore, hasMore, isFetchingStartups, page, fetchStartupsData, token]);

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
        async (startupId: number) => {
            if (!startupId || loadingFollowId !== null) return;
            console.log('Follow button pressed:', startupId);
            setLoadingFollowId(startupId);
            try {
                const currentMember = startups.find((startup) => startup.id === startupId);
                const currentFollowing = currentMember?.is_favorite || false;
                console.log('Current following status:', currentFollowing);
                await API.put(
                    '/api/startups/add-favorites',
                    { startup_id: startupId, status: !currentFollowing },
                );

                setStartups((prevMembers) =>
                    prevMembers.map((member) =>
                        member.id === startupId
                            ? { ...member, is_favorite: !currentFollowing }
                            : member
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

    if (!token) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Text>Please log in to view startups.</Text>
                    <IconButton
                        icon="login"
                        onPress={() => navigation.navigate('SignIn')}
                    />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <Appbar.Header style={dynamicStyles.appbarHeader}>
                <Appbar.Action
                    icon={require('../assets/flat-icons/angle-small-left.png')}
                    color="#414042"
                    size={20}
                    style={dynamicStyles.appbarActionRight}
                    onPress={() => {
                      console.log('Back button pressed');
                      navigation.goBack();
                  }}
                />
                <Appbar.Content
                    title={
                        <View style={dynamicStyles.titleContainer}>
                            <Text variant="titleMedium" style={dynamicStyles.titleText}>
                                Startups
                            </Text>
                        </View>
                    }
                />
            </Appbar.Header>
            {isFetchingStartups && startups.length === 0 ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <ScrollView
                    style={styles.scrollView}
                    onScroll={handleScroll}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text>{totalMembers} startups</Text>
                            <IconButton
                                icon={require('../assets/flat-icons/filter.png')}
                                size={18}
                                onPress={() => {
                                    navigation.navigate('StartupsFilter');
                                }}
                            />
                        </View>
                        {startups.map((startup, index) => (
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
                                style={[
                                    styles.fundingItem,
                                    index === startups.length - 1 && styles.noMarginBottom,
                                ]}
                                isLoading={loadingFollowId === startup.id}
                                onPress={() => {
                                    navigation.navigate('Startup', {
                                        id: startup.id || 0,
                                    });
                                }}
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderMoreContainer: {
        paddingVertical: 16,
        alignItems: 'center',
    },
});
