import { CompositeNavigationProp, NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { Announcement } from '../components/Announcement';
import { Inspiration } from '../components/Inspiration';
import { MainStackParams } from '../models/navigation';
import { BottomTabStackParams } from '../navigation/user/tabs/BottomTab';
import { ContentModel } from '../models/homepage/Content/content.model';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';
import { DEFAULT_PAGE, PAGE_SIZE } from '../constants/constants';
import { API } from '../plugins/axios';

type UseNavigationProps = CompositeNavigationProp<NavigationProp<BottomTabStackParams, 'Home'>, NavigationProp<MainStackParams>>;

export const Contents = () => {
    const { navigate } = useNavigation<UseNavigationProps>();
    const { colors } = useTheme();
    const { token } = useSelector((state: RootState) => state.auth);

    const [contents, setContents] = useState<ContentModel[]>([ ]);

    const { isFetching, refetch } = useQuery(
        ['announcements', DEFAULT_PAGE, PAGE_SIZE, token],
        () => {
            return API.get('/api/contents', {
                params: {
                    page: DEFAULT_PAGE,
                    page_size: PAGE_SIZE,
                },
            });
        },
        {
            onSuccess: ({ data }) => {
                console.log(data); // Log full API response to inspect its structure
                setContents(data || []); // Set contents directly from data
            },
        }
    );
    const [inspirations, setInspirations] = useState([
        {
            title: "Sustainability and Social Innovation: Who is Really Responsible?",
            image: "",
            name: "Hüsna Nur Sontürk",
            profileImage: "",
            date: "2024-09-24",
        },
        {
            title: "The Most Important Route of Your Journey: Lifelong Learning",
            image: "",
            name: "Beyza Bilgi",
            profileImage: "",
            date: "2024-09-24",
        },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            refetch();
        }, 60000); // Refetch every minute
        return () => clearInterval(interval);
    }, [refetch]);

    if (isFetching) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.sectionHeader}>
                <Text variant="titleMedium" style={styles.sectionTitle}>Announcements</Text>
                <Button mode="text" textColor="#00AEEF" onPress={() => navigate('Announcements')}>
                    See all
                </Button>
            </View>
            <ScrollView horizontal>
                {contents.map((content, index) => (
                    <Announcement
                        key={index}
                        title={content.title || ''}
                        image={content.image_url}
                        body={content.description || ''}
                        location={content.location || 'Istanbul, Turkey'}
                        date={content.created_at || ''}
                        type={content.content_type?.name || ''}
                        style={[styles.announcement, index === contents.length - 1 && styles.lastAnnouncement]}
                        onPress={() => navigate('Announcement', { id: content.title || '' })}
                    />
                ))}
            </ScrollView>
            <View style={styles.sectionHeader}>
                <Text variant="titleMedium" style={styles.sectionTitle}>Financial Inspirations</Text>
                <Button mode="text" textColor="#00AEEF" style={styles.button} onPress={() => navigate('Inspirations')}>
                    See all
                </Button>
            </View>
            {inspirations.map((inspiration, index) => (
                <Inspiration
                    key={index}
                    title={inspiration.title}
                    image={inspiration.image}
                    profileImage={inspiration.profileImage}
                    name={inspiration.name}
                    date={inspiration.date}
                    style={[styles.inspiration, index === inspirations.length - 1 && styles.lastInspiration]}
                    onPress={() => navigate('Inspiration', { id: inspiration.title })}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionHeader: {
        marginTop: 24,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontWeight: '600',
    },
    button: {
        margin: 0,
        padding: 0,
    },
    announcement: {
        marginRight: 12,
        height : 350,
    },
    lastAnnouncement: {
        marginRight: 0,
    },
    inspiration: {
        marginBottom: 8,
    },
    lastInspiration: {
        marginBottom: 0,
    },
});
