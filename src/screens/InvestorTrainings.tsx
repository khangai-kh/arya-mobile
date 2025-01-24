import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Training } from '../components/Training';
import { MainStackParams } from '../models/navigation';

type InvestorTrainingsProps = StackScreenProps<MainStackParams, 'InvestorTrainings'>;

export const InvestorTrainings = (props: InvestorTrainingsProps) => {

    const { navigation } = props;
    const { colors } = useTheme();

    const [
        trainings,
        setTrainings
    ] = useState([
        {
            title: 'Understanding Venture Capital',
            about: 'Gain insights into how venture capital works and what investors look for in startups',
            image: ''
        },
        {
            title: 'Angel Investing 101',
            about: 'Learn the basics of angel investing, from deal sourcing to making your first investment',
            image: ''
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
                    {trainings.map((training, index) => (
                        <Training
                            title={training.title}
                            image={training.image}
                            about={training.about}
                            style={{
                                marginBottom: index === trainings.length - 1 ? 0 : 8
                            }}
                            onPress={() => {
                                navigation.navigate('Training', {
                                    id: training.title
                                });
                            }}
                        />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};