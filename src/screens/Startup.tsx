import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { Image, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Button, Chip, Divider, IconButton, Modal, Portal, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { Founder } from '../components/Founder';
import { MainStackParams } from '../models/navigation';

type StartupProps = StackScreenProps<MainStackParams, 'Startup'>;

export const Startup = (props: StartupProps) => {

    const { navigation } = props;
    const { colors } = useTheme();

    const startup = {
        image: '',
        title: 'Foodsy',
        bio: 'Quick, Fresh, and Local',
        body: 'Foodsy is a revolutionary platform that connects you with fresh, locally-sourced meals delivered straight to your doorstep. Whether you’re craving a quick lunch, a hearty dinner, or healthy snacks, Foodsy partners with local chefs, farmers, and restaurants to ensure every bite is fresh and sustainable. Our mission is to support local businesses while providing you with high-quality, delicious meals—quickly and conveniently. With Foodsy, you’re not just enjoying great food; you’re making a positive impact on your community and the planet.',
        types: [
            {
                id: 0,
                value: 'Funding round'
            },
            {
                id: 1,
                value: 'Graduate'
            }
        ],
        data: [
            { label: 'Status', value: 'Prototype ready' },
            { label: 'Investment status', value: 'Pre-seed' },
            { label: 'Total investment', value: '$400K' },
            { label: 'Valuation', value: '$3M' },
            { label: 'Target amount', value: '$500K' },
            { label: 'Amount collected', value: '$350K' },
        ]
    };

    const [
        founders,
        setFounders
    ] = useState([
        {
            id: 0,
            image: '',
            name: 'Elif Yılmaz',
            status: 'CEO at Foodsy',
            role: 'Entrepreneur',
            following: false
        },
        {
            id: 1,
            image: '',
            name: 'Ayşe Demir',
            status: 'Co-Founder at Foodsy',
            role: 'Entrepreneur',
            following: false
        }
    ]);
    const [
        visible,
        setVisible
    ] = useState(false);

    const checkColor = (value: string) => {
        if (value === 'Funding round') {
            return '#00AEEF';
        } else if (value === 'Academy') {
            return '#F99F1C';
        } else if (value === 'Closed deals') {
            return '#A09FA0';
        } else if (value === 'Graduate') {
            return '#4CB748';
        }
    };

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
                        backgroundColor: '#fff',
                        borderRadius: 24,
                        padding: 16
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Avatar.Image
                            size={80}
                            source={require('../assets/dummy-product-4.jpeg')}
                            style={{
                                backgroundColor: '#f2f4f7',
                                marginRight: 8
                            }}
                        />
                        <Box
                            style={{
                                flex: 1
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row'
                                }}
                            >
                                {startup.types !== undefined && (
                                    startup.types.map((type, index) => (
                                        <Chip
                                            key={type.id}
                                            style={{
                                                backgroundColor: checkColor(type.value),
                                                marginRight: index === startup.types.length ? 0 : 4,
                                                alignSelf: 'flex-start',
                                            }}
                                        >
                                            <Text
                                                variant='labelMedium'
                                                style={{ color: '#fff' }}
                                            >
                                                {type.value}
                                            </Text>
                                        </Chip>
                                    ))
                                )}
                            </View>
                            <Text
                                variant="titleMedium"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{
                                    marginVertical: 4
                                }}
                            >
                                {startup.title}
                            </Text>
                            <Text
                                variant="bodyMedium"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{
                                    flex: 1
                                }}
                            >
                                {startup.bio}
                                {/* //TODO: add read more button */}
                            </Text>
                        </Box>
                    </View>
                    <View
                        style={{
                            marginVertical: 12
                        }}
                    >
                        <Text
                            numberOfLines={4}
                        >
                            {startup.body}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: '#e0e0e0',
                            backgroundColor: '#fff',
                        }}
                    >
                        {startup.data.map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    width: '50%',
                                    borderRightWidth: index % 2 === 0 ? 1 : 0,
                                    borderRightColor: '#e0e0e0',
                                    borderBottomWidth: index < startup.data.length - 2 ? 1 : 0,
                                    borderBottomColor: '#e0e0e0',
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                }}
                            >
                                <Text
                                    variant='bodySmall'
                                    style={{
                                        color: '#A09FA0'
                                    }}
                                >
                                    {item.label}:
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        color: '#414042'
                                    }}
                                >
                                    {item.value}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View
                    style={{
                        paddingHorizontal: 16,
                        marginTop: 12
                    }}
                >
                    <Text
                        variant='titleMedium'
                    >
                        Funding round
                    </Text>
                    <View
                        style={{
                            flex: 1,
                            marginTop: 8,
                            backgroundColor: '#fff',
                            borderRadius: 24,
                            padding: 16
                        }}
                    >
                        <View>
                            <Text
                                variant='titleSmall'
                                style={{
                                    marginBottom: 2
                                }}
                            >
                                Funding deadline
                            </Text>
                            <Text>
                                15.01.2025
                            </Text>
                        </View>
                        <Divider style={{ marginVertical: 8 }} />
                        <View>
                            <Text
                                variant='titleSmall'
                                style={{
                                    marginBottom: 2
                                }}
                            >
                                Use of funds
                            </Text>
                            <Text>
                                40% for product development and improvements
                                30% for marketing and customer acquisition
                                20% for hiring key personnel (software developers, marketing specialists)
                                10% for operational costs and overheads
                            </Text>
                        </View>
                        <Divider style={{ marginVertical: 8 }} />
                        <View>
                            <Text
                                variant='titleSmall'
                                style={{
                                    marginBottom: 2
                                }}
                            >
                                Investment terms
                            </Text>
                            <Text>
                                Equity offered: 15%
                                Investment type: Convertible note
                                Discount on future rounds: 20%
                                Maturity date: 2 years from the funding round close date
                            </Text>
                        </View>
                        <Divider style={{ marginVertical: 8 }} />
                        <View>
                            <Text
                                variant='titleSmall'
                                style={{
                                    marginBottom: 2
                                }}
                            >
                                Pitch deck
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginVertical: 6
                                }}
                            >
                                <Image
                                    source={require('../assets/flat-icons/download.png')}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        marginRight: 4
                                    }}
                                />
                                <Text>
                                    Foodsy Pitch Deck.pdf
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        paddingHorizontal: 16,
                        marginTop: 12
                    }}
                >
                    <Text
                        variant='titleMedium'
                    >
                        Founders
                    </Text>
                    <View
                        style={{
                            marginTop: 8
                        }}
                    >
                        {founders.map((founder, index) => (
                            <Founder
                                name={founder.name}
                                image={founder.image}
                                founderRole={founder.role}
                                status={founder.status}
                                following={founder.following}
                                style={{
                                    marginBottom: index === founders.length - 1 ? 0 : 8
                                }}
                                onPress={() => {
                                    navigation.navigate('Member', {
                                        id: founder.name
                                    });
                                }}
                            />
                        ))}
                    </View>
                </View>
                <View
                    style={{
                        paddingHorizontal: 16,
                        marginTop: 12
                    }}
                >
                    <Text
                        variant='titleMedium'
                    >
                        Products
                    </Text>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        style={{
                            marginTop: 8
                        }}
                    >
                        <Image
                            resizeMode="cover"
                            source={require('../assets/dummy-product-1.jpeg')}
                            style={{
                                marginRight: 8,
                                borderRadius: 12,
                                width: 136,
                                height: 136,
                                backgroundColor: '#fff'
                            }}
                        />
                        <Image
                            resizeMode="cover"
                            source={require('../assets/dummy-product-2.jpeg')}
                            style={{
                                marginRight: 8,
                                borderRadius: 12,
                                width: 136,
                                height: 136,
                                backgroundColor: '#fff'
                            }}
                        />
                        <Image
                            resizeMode="cover"
                            source={require('../assets/dummy-product-3.jpeg')}
                            style={{
                                marginRight: 8,
                                borderRadius: 12,
                                width: 136,
                                height: 136,
                                backgroundColor: '#fff'
                            }}
                        />
                    </ScrollView>
                </View>
            </ScrollView>
            <Box
                px={16}
                py={16}
            >
                <Button
                    mode="contained"
                    onPress={() => {
                        setVisible(true);
                    }}
                >
                    Apply for round
                </Button>
            </Box>
            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    contentContainerStyle={{
                        backgroundColor: '#fff',
                        borderRadius: 24,
                        margin: 24,
                        padding: 16
                    }}
                >
                    <IconButton
                        icon={require('../assets/flat-icons/x.png')}
                        size={24}
                        iconColor='#A09FA0'
                        style={{
                            alignSelf: 'flex-end'
                        }}
                        onPress={() => setVisible(false)}
                    />
                    <Image
                        resizeMode="contain"
                        source={require('../assets/flat-icons/check-circle.png')}
                        style={{
                            alignSelf: 'center',
                            width: 56,
                            height: 56,
                            tintColor: '#4CB748',
                            marginBottom: 24
                        }}
                    />
                    <Text
                        variant='headlineSmall'
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        Your application received
                    </Text>
                    <Text
                        variant='bodySmall'
                        style={{
                            textAlign: 'center',
                            marginTop: 8
                        }}
                    >
                        Your application has been forwarded to the relevant persons, thank you.
                    </Text>
                    <View
                        style={{
                            marginTop: 24,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            rowGap: 8
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                paddingVertical: 12.5,
                                // paddingHorizontal: 11.5,
                                borderRadius: 32,
                            }}
                        >
                            <Text
                                variant='titleMedium'
                                style={{
                                    textAlign: 'center'
                                }}
                            >
                                Wait for updates
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                paddingVertical: 12.5,
                                paddingHorizontal: 28.5,
                                backgroundColor: '#4CB748',
                                borderRadius: 32
                            }}
                        >
                            <Text
                                variant='titleMedium'
                                style={{
                                    color: '#FFFFFF'
                                }}
                            >
                                Get in touch
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </Portal>
        </SafeAreaView>
    );
};