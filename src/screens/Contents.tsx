import { CompositeNavigationProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Text, useTheme } from 'react-native-paper';
import { Announcement } from '../components/Announcement';
import { Inspiration } from '../components/Inspiration';
import { AppStackParams } from '../navigation/App';
import { BottomTabStackParams } from '../navigation/BottomTab';

type UseNavigationProps = CompositeNavigationProp<NavigationProp<BottomTabStackParams, 'Home'>, NavigationProp<AppStackParams>>;

export const Contents = () => {

    const { navigate } = useNavigation<UseNavigationProps>();
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
            title: "Arya Retreat'24",
            image: "",
            body: "Freedom: Manage Your Money, Discover Your Power",
            location: "Tasigo Hotel Eskişehir",
            date: "2024-09-24",
            type: "Event",
        }
    ]);
    const [
        inspirations,
        setInspirations
    ] = useState([
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
        }
    ]);

    return (
        <ScrollView
            style={{
                flex: 1,
                marginHorizontal: 16
            }}
            showsVerticalScrollIndicator={false}
        >
            <View
                style={{
                    marginTop: 24,
                    marginBottom: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Text
                    variant='titleMedium'
                    style={{
                        fontWeight: '600'
                    }}
                >
                    Announcements
                </Text>
                <Button
                    mode='text'
                    textColor="#00AEEF"
                    onPress={() => {
                        navigate('Announcements');
                    }}
                >
                    See all
                </Button>
            </View>
            <ScrollView horizontal>
                {announcements.map((announcement, index) => (
                    <Announcement
                        title={announcement.title}
                        image={announcement.image}
                        body={announcement.body}
                        location={announcement.location}
                        date={announcement.date}
                        type={announcement.type}
                        style={{
                            marginRight: index === announcements.length - 1 ? 0 : 12
                        }}
                        onPress={() => {
                            navigate('Announcement', {
                                id: announcement.title
                            });
                        }}
                    />
                ))}
            </ScrollView>
            <View
                style={{
                    marginTop: 24,
                    marginBottom: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Text
                    variant='titleMedium'
                    style={{
                        fontWeight: '600'
                    }}
                >
                    Financial Inspirations
                </Text>
                <Button
                    mode='text'
                    textColor="#00AEEF"
                    style={{
                        margin: 0,
                        padding: 0
                    }}
                    onPress={() => {
                        navigate('Inspirations');
                    }}
                >
                    See all
                </Button>
            </View>
            {inspirations.map((inspiration, index) => (
                <Inspiration
                    title={inspiration.title}
                    image={inspiration.image}
                    profileImage={inspiration.profileImage}
                    name={inspiration.name}
                    date={inspiration.date}
                    style={{
                        marginBottom: index === inspirations.length - 1 ? 0 : 8
                    }}
                    onPress={() => {
                        navigate('Inspiration', {
                            id: inspiration.title
                        });
                    }}
                />
            ))}
        </ScrollView>
    );
};
