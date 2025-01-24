import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Announcement } from '../components/Announcement';
import { MainStackParams } from '../models/navigation';
type BetterFutureCirclesDaysProps = StackScreenProps<MainStackParams, 'BetterFutureCirclesDays'>;

export const BetterFutureCirclesDays = (props: BetterFutureCirclesDaysProps) => {

    const { navigation } = props;
    const { colors } = useTheme();
    const [
        betterFutureCirclesDays,
        setBetterFutureCirclesDays
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
            type: "Event",
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
                <ScrollView showsVerticalScrollIndicator={false}>
                    {betterFutureCirclesDays.map((item, index) => (
                        <Announcement
                            title={item.title}
                            image={item.image}
                            body={item.body}
                            location={item.location}
                            date={item.date}
                            type={item.type}
                            style={{
                                marginBottom: index === BetterFutureCirclesDays.length - 1 ? 0 : 8
                            }}
                            onPress={() => {
                                navigation.navigate('Announcement', {
                                    id: item.title
                                });
                            }}
                        />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};