import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Chip, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Announcement } from '../components/Announcement';
import { AppStackParams } from '../navigation/App';
type AnnouncementsProps = StackScreenProps<AppStackParams, 'Announcements'>;

export const Announcements = (props: AnnouncementsProps) => {

    const { navigation } = props;
    const { colors } = useTheme();
    const [
        announcements,
        setAnnouncements
    ] = useState([
        {
            title: "Arya Retreat'24",
            image: "",
            body: "Freedom: Manage Your Money, Discover Your Power",
            location: "Tasigo Hotel Eskişehir",
            date: "2024-09-24",
            type: "Event",
        },
        {
            title: "Arya GSYF Invests $250,000 in PhiTech",
            image: "",
            body: "Health biotechnology focused on genome technologies",
            location: "Tasigo Hotel Eskişehir",
            date: "16.11.2023",
            type: "Investment",
        }, {
            title: "Arya Retreat'24",
            image: "",
            body: "Freedom: Manage Your Money, Discover Your Power",
            location: "Tasigo Hotel Eskişehir",
            date: "2024-09-24",
            type: "Event",
        },
        {
            title: "Arya Retreat'24",
            image: "",
            body: "Freedom: Manage Your Money, Discover Your Power",
            location: "Tasigo Hotel Eskişehir",
            date: "2024-09-24",
            type: "Investment",
        }, {
            title: "Arya Retreat'24",
            image: "",
            body: "Freedom: Manage Your Money, Discover Your Power",
            location: "Tasigo Hotel Eskişehir",
            date: "2024-09-24",
            type: "Event",
        },
        {
            title: "Arya Retreat'24",
            image: "",
            body: "Freedom: Manage Your Money, Discover Your Power",
            location: "Tasigo Hotel Eskişehir",
            date: "2024-09-24",
            type: "Event",
        }
    ]);
    const [
        types,
        setTypes
    ] = useState([
        {
            id: 0,
            value: 'Event'
        },
        {
            id: 1,
            value: 'Investment'
        },
        {
            id: 2,
            value: 'Funding'
        },
        {
            id: 3,
            value: 'Workshop'
        },
        {
            id: 4,
            value: 'Webinar'
        },
        {
            id: 5,
            value: 'Success'
        },
    ]);
    const [
        category,
        setCategory
    ] = useState<String>();

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
            edges={[
                'bottom'
            ]}
        >
            <View
                style={{
                    flex: 1,
                    marginTop: 24,
                    marginHorizontal: 16
                }}
            >
                <View style={{ marginBottom: 16 }}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal
                    >
                        {types.map((type, index) => (
                            <Chip
                                key={type.id}
                                style={{
                                    backgroundColor: category === type.value ? colors.primary : '#fff',
                                    marginRight: index === types.length ? 0 : 4
                                }}
                                onPress={() => setCategory(type.value)}
                            >
                                <Text>
                                    {type.value}
                                </Text>
                            </Chip>
                        ))}
                    </ScrollView>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {announcements.map((announcement, index) => (
                        <Announcement
                            title={announcement.title}
                            image={announcement.image}
                            body={announcement.body}
                            location={announcement.location}
                            date={announcement.date}
                            type={announcement.type}
                            style={{
                                marginBottom: index === announcements.length - 1 ? 0 : 8
                            }}
                            onPress={() => {
                                if (announcement.type === 'Announcement') {
                                    navigation.navigate('Announcement', {
                                        id: announcement.title
                                    });
                                } else {
                                    navigation.navigate('Content', {
                                        id: announcement.title
                                    });
                                }
                            }}
                        />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};