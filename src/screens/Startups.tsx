import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Funding } from '../components/Funding';
import { MainStackParams } from '../models/navigation';

type StartupsProps = StackScreenProps<MainStackParams, 'Startups'>;

export const Startups = (props: StartupsProps) => {

    const { navigation } = props;
    const { colors } = useTheme();

    const [
        startups,
        setStartups
    ] = useState([
        {
            types: [
                {
                    id: 0,
                    value: 'Funding round'
                }
            ],
            title: 'EcoPulse',
            bio: 'Green Energy, Greener Future',
            following: true,
            status: 'Idea stage',
            investmentStatus: 'Bootstrapped',
            valuation: '$1,2M',
            targetAmount: '$300K',
            amountCollected: '$100K',
            totalInvestment: '$150K'
        },
        {
            types: [
                {
                    id: 0,
                    value: 'Funding round'
                },
                {
                    id: 1,
                    value: 'Academy'
                }
            ],
            title: 'Medi Connect',
            bio: 'Bridging Patients and Healthcare Providers Globally',
            following: false,
            status: 'Prototype ready',
            investmentStatus: 'Pre-seed',
            valuation: '$1,2M',
            targetAmount: '$300K',
            amountCollected: '$100K',
            totalInvestment: '$150K'
        },
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
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 16
                        }}
                    >
                        <Text>
                            {startups.length} startups
                        </Text>
                        <IconButton
                            icon={require('../assets/flat-icons/filter.png')}
                            size={18}
                            onPress={() => { navigation.navigate('StartupsFilter'); }}
                        />
                    </View>
                    {startups.map((startup, index) => (
                        <Funding
                            renderingScreen="Startups"
                            title={startup.title}
                            bio={startup.bio}
                            image='asdasd'//TODO: make image a static
                            following={startup.following}
                            types={startup.types}
                            status={startup.status}
                            investmentStatus={startup.investmentStatus}
                            valuation={startup.valuation}
                            targetAmount={startup.targetAmount}
                            amountCollected={startup.amountCollected}
                            totalInvestment={startup.totalInvestment}
                            style={{
                                marginBottom: index === startups.length - 1 ? 0 : 8
                            }}
                            onPress={() => {
                                navigation.navigate('Startup', {
                                    id: startup.title
                                });
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};