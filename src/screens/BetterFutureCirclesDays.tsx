import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, MD3Theme, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Announcement } from '../components/Announcement';
import { MainStackParams } from '../models/navigation';
import { ContentModel } from '../models/homepage/Content';
import { API } from '../plugins/axios';
import { DEFAULT_PAGE, PAGE_SIZE } from '../constants/constants';
import { useQuery } from 'react-query';
import { RootState } from '../redux/configureStore';
import { useSelector } from 'react-redux';

type BetterFutureCirclesDaysProps = StackScreenProps<MainStackParams, 'BetterFutureCirclesDays'>;

export const BetterFutureCirclesDays = (props: BetterFutureCirclesDaysProps) => {
    const { navigation } = props;
    const { colors } = useTheme();
    const dynamicStyles = createDynamicStyles(colors);
    const [contents, setContents] = useState<ContentModel[]>([]);
    const { token } = useSelector((state: RootState) => state.auth);

    const { isFetching } = useQuery(
        ['trainings', DEFAULT_PAGE, PAGE_SIZE, token],
        async () => {
            const [announcementsResponse] = await Promise.all([
                API.get('/api/contents', {
                    params: {
                        page: DEFAULT_PAGE,
                        page_size: PAGE_SIZE,
                        is_better_future_circle_days: true,
                    },
                }),
            ]);
            return {
                announcements: announcementsResponse.data || [],
            };
        },
        {
            onSuccess: (data) => {
                const announcements = Array.isArray(data.announcements) ? data.announcements : [];
                setContents(announcements);
            },
            onError: (error) => {
                console.error('Error fetching trainings:', error);
                setContents([]);
            },
        }
    );

    if (isFetching) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <Appbar.Header style={styles.appbarHeader}>
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
                            <Text variant="titleMedium" style={dynamicStyles.interestText}>
                                Better Future Circle Days
                            </Text>
                        </View>
                    }
                />
            </Appbar.Header>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {contents.map((content, index) => (
                        <Announcement
                            key={index}
                            title={content.title || ''}
                            image={content.images?.[0]?.image_url || ''}
                            body={content.description || ''}
                            location={content.location || 'Istanbul, Turkey'}
                            date={content.created_at || ''}
                            type={content.content_type?.name || ''}
                            style={[styles.announcement, index === contents.length - 1 && styles.lastAnnouncement]}
                            onPress={() => navigation.navigate('Announcement', { id: content.id || 0 })}
                        />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
const createDynamicStyles = (colors: MD3Theme['colors']) =>
    StyleSheet.create({
        appbarActionRight: {
            backgroundColor: colors.onPrimary || '#FFFFFF',
            marginRight: 5,
            marginTop: 20,
        },
        titleContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        interestText: {
            fontWeight: 'bold',
            paddingLeft: 0,
            marginLeft: -40,
        },
    });
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    appbarHeader: {
        width: '100%',
        backgroundColor: 'transparent',
        alignContent: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        marginTop: 24,
        marginHorizontal: 16,
        alignContent: 'center',
        justifyContent: 'center',
    },
    announcement: {
        height : 'auto',
        marginBottom: 10,
    },
    announcementItem: {
        marginBottom: 8,
    },
    lastAnnouncement: {
        marginRight: 0,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
