import { CompositeNavigationProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import { AppStackParams } from '../navigation/App';
import { BottomTabStackParams } from '../navigation/BottomTab';

type UseNavigationProps = CompositeNavigationProp<NavigationProp<BottomTabStackParams, 'Home'>, NavigationProp<AppStackParams>>;

export const Entrepreneurship = () => {

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
        <ScrollView style={{ flex: 1 }}>

        </ScrollView>
    );
};
