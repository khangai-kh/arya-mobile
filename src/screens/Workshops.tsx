import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Workshop } from '../components/Workshop';
import { MainStackParams } from '../models/navigation';
type WorkshopsProps = StackScreenProps<MainStackParams, 'Workshops'>;

export const Workshops = (props: WorkshopsProps) => {

    const { navigation } = props;
    const { colors } = useTheme();

    const [
        workshops,
        setWorkshops
    ] = useState([
        {
            image: '',
            name: 'Entrepreneur Workshops',
            organizer: 'Akbank & Arya',
            location: 'Online & Offline Venue',
            date: '07.06.2024 13:30-18:00'
        },
        {
            image: '',
            name: 'Start in Izmir',
            organizer: 'Akbank & Arya',
            location: 'Originn Creative Hub, Izmir',
            date: '03.12.2024'
        },
        {
            image: '',
            name: 'Entrepreneur Workshops',
            organizer: 'Akbank & Arya',
            location: 'Online & Offline Venue',
            date: '07.06.2024 13:30-18:00'
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        marginTop: 24,
                        marginHorizontal: 16
                    }}
                >
                    {workshops.map((workshop, index) => (
                        <Workshop
                            name={workshop.name}
                            image={workshop.image}
                            organizer={workshop.organizer}
                            location={workshop.location}
                            date={workshop.date}
                            style={{
                                marginBottom: index === workshops.length - 1 ? 0 : 8
                            }}
                            onPress={() => {
                                navigation.navigate('Workshop', {
                                    id: workshop.name
                                });
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};