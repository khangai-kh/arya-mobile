import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Chip, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Announcement } from '../components/Announcement';
import { MainStackParams } from '../models/navigation';

type AnnouncementsProps = StackScreenProps<MainStackParams, 'Announcements'>;

export const Announcements = ({ navigation }: AnnouncementsProps) => {
    const { colors } = useTheme();
    const [announcements] = useState([
        {
            title: 'Arya Retreat\'24',
            image: '',
            body: 'Freedom: Manage Your Money, Discover Your Power',
            location: 'Tasigo Hotel Eskişehir',
            date: '2024-09-24',
            type: 'Event',
        },
        {
            title: 'Arya GSYF Invests $250,000 in PhiTech',
            image: '',
            body: 'Health biotechnology focused on genome technologies',
            location: 'Tasigo Hotel Eskişehir',
            date: '16.11.2023',
            type: 'Investment',
        },
        {
            title: 'Arya Retreat\'24',
            image: '',
            body: 'Freedom: Manage Your Money, Discover Your Power',
            location: 'Tasigo Hotel Eskişehir',
            date: '2024-09-24',
            type: 'Event',
        },
    ]);

    const [types] = useState([
        { id: 0, value: 'Event' },
        { id: 1, value: 'Investment' },
        { id: 2, value: 'Funding' },
        { id: 3, value: 'Workshop' },
        { id: 4, value: 'Webinar' },
        { id: 5, value: 'Success' },
    ]);

    const [category, setCategory] = useState<string | undefined>();

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <View style={styles.container}>
                {/* Category Chips */}
                <View style={styles.chipContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {types.map((type) => (
                            <Chip
                                key={type.id}
                                style={[
                                    styles.chip,
                                    category === type.value && { backgroundColor: colors.primary },
                                ]}
                                onPress={() => setCategory(type.value)}
                            >
                                <Text
                                    style={{
                                        color: category === type.value ? colors.onPrimary : colors.primary,
                                    }}
                                >
                                    {type.value}
                                </Text>
                            </Chip>
                        ))}
                    </ScrollView>
                </View>

                {/* Announcements List */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {announcements.map((announcement, index) => (
                        <Announcement
                            key={`${announcement.title}-${index}`}
                            {...announcement}
                            style={[
                                styles.announcement,
                                index === announcements.length - 1 && styles.lastAnnouncement,
                            ]}
                            onPress={() =>
                                navigation.navigate(
                                    announcement.type === 'Announcement' ? 'Announcement' : 'Content',
                                    { id: announcement.title }
                                )
                            }
                        />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop: 24,
        marginHorizontal: 16,
    },
    chipContainer: {
        marginBottom: 16,
    },
    chip: {
        marginRight: 8,
    },
    announcement: {
        marginBottom: 8,
    },
    lastAnnouncement: {
        marginBottom: 0,
    },
});
