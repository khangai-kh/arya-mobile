import { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, IconButton, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Funding } from '../components/Funding';

export const AcademyStartups = () => {
    const [
        academyStartups,
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

    const [value, setValue] = useState('active');

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
                            justifyContent: 'space-between'
                        }}
                    >
                        <Text>
                            {academyStartups.length} startups
                        </Text>
                        <IconButton
                            icon={require('../assets/flat-icons/filter.png')}
                            size={18}
                            onPress={() => { }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            borderRadius: 32,
                            marginVertical: 16
                        }}
                    >
                        <View
                            style={{
                                flex: 1
                            }}
                        >
                            <Button
                                mode={value === 'active' ? 'contained' : 'text'}
                                onPress={(e) => {
                                    e.preventDefault;
                                    setValue('active');
                                }}
                            >
                                Active (25)
                            </Button>
                        </View>
                        <View
                            style={{
                                flex: 1
                            }}
                        >
                            <Button
                                mode={value === 'graduates' ? 'contained' : 'text'}
                                onPress={(e) => {
                                    e.preventDefault;
                                    setValue('graduates');
                                }}
                            >
                                Graduates (100)
                            </Button>
                        </View>
                    </View>
                    {academyStartups.map((startup, index) => (
                        <Funding
                            renderingScreen="StartUps"
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
                                marginBottom: index === academyStartups.length - 1 ? 0 : 8
                            }}
                            disabled
                        // onPress={() => {
                        //     navigation.navigate('Startup', {
                        //         id: startup.title
                        //     });
                        // }}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};