import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Inspiration } from '../components/Inspiration';
import { MainStackParams } from '../models/navigation';
type InspirationsProps = StackScreenProps<MainStackParams, 'Inspirations'>;

export const Inspirations = (props: InspirationsProps) => {

    const { navigation } = props;
    const { colors } = useTheme();
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
                                navigation.navigate('Inspiration', {
                                    id: inspiration.title
                                });
                            }}
                        />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};