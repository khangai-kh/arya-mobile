import React, { useState, useCallback } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, MD3Theme, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Inspiration } from '../components/Inspiration';
import { MainStackParams } from '../models/navigation';
import { ContentModel } from '../models/homepage/Content';
import { DEFAULT_PAGE, PAGE_SIZE } from '../constants/constants';
import { API } from '../plugins/axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';

type InspirationsProps = StackScreenProps<MainStackParams, 'Inspirations'>;

export const Inspirations = (props: InspirationsProps) => {
    const { navigation } = props;
    const { colors } = useTheme();
    const dynamicStyles = createDynamicStyles(colors);
    const { token } = useSelector((state: RootState) => state.auth);
    const [inspirations, setInspirations] = useState<ContentModel[]>([]);
    const [page, setPage] = useState(DEFAULT_PAGE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchInspirations = async (pageNum: number) => {
        const response = await API.get('/api/contents', {
            params: {
                page: pageNum,
                page_size: PAGE_SIZE,
                content_type_id: 2,
            },
        });
        return response.data || [];
    };

    const { isFetching: isFetchingAnnouncements } = useQuery(
        ['contents', page, PAGE_SIZE, token],
        () => fetchInspirations(page),
        {
            onSuccess: (data) => {
                if (page === DEFAULT_PAGE) {
                    setInspirations(data);
                } else {
                    setInspirations(prev => [...prev, ...data]);
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
                const newData = await fetchInspirations(nextPage);
                setInspirations(prev => [...prev, ...newData]);
                setPage(nextPage);
                setHasMore(newData.length === PAGE_SIZE);
            } catch (error) {
                console.error('Error loading more inspirations:', error);
            } finally {
                setIsLoadingMore(false);
            }
        }
    }, [isLoadingMore, hasMore, isFetchingAnnouncements, page]);

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

    if (isFetchingAnnouncements && page === DEFAULT_PAGE) {
        return (
            <View style={dynamicStyles.loaderContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={dynamicStyles.safeArea} edges={['top']}>
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
                                Inspirations
                            </Text>
                        </View>
                    }
                />
            </Appbar.Header>
            <View style={dynamicStyles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {inspirations.map((inspiration, index) => (
                        <Inspiration
                            key={inspiration.id}
                            title={inspiration.title ?? 'Untitled'}
                            image={inspiration.image_url ?? ''}
                            profileImage={inspiration.profileImage}
                            name={inspiration.created_user?.full_name ?? 'Unknown'}
                            date={inspiration.created_at ?? ''}
                            style={{
                                marginBottom: index === inspirations.length - 1 ? 0 : 8
                            }}
                            onPress={() => {
                                navigation.navigate('Inspiration', {
                                    id: inspiration.id.toString(),
                                });
                            }}
                        />
                    ))}
                    {isLoadingMore && (
                        <View style={dynamicStyles.loadingMoreContainer}>
                            <ActivityIndicator size="small" color={colors.primary} />
                        </View>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const createDynamicStyles = (colors: MD3Theme['colors']) =>
    StyleSheet.create({
        safeArea: {
            flex: 1,
        },
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
        container: {
            flex: 1,
            marginTop: 24,
            marginHorizontal: 16,
        },
        loaderContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background,
        },
        loadingMoreContainer: {
            padding: 16,
            alignItems: 'center',
        },
    });