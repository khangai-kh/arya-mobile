import { StackScreenProps } from '@react-navigation/stack';
import { Dimensions, Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleGrid } from 'react-native-super-grid';
import { Box } from '../components/common/Box';
import { Special } from '../components/Special';
import { AppStackParams } from '../navigation/App';

type AboutUsProps = StackScreenProps<AppStackParams, 'AboutUs'>;

export const AboutUs = (props: AboutUsProps) => {

    const { width } = Dimensions.get('window');
    const { colors } = useTheme();

    const specials = [
        {
            id: 0,
            icon: 'graduation-cap',
            value: 'Entrepreneur and investor development trainings'
        },
        {
            id: 1,
            icon: 'confetti',
            value: 'Corporate collaborations '
        },
        {
            id: 2,
            icon: 'diamond',
            value: 'Special trainings for our members'
        },
        {
            id: 3,
            icon: 'comment-user',
            value: 'Mentoring matches'
        },
        {
            id: 4,
            icon: 'chat-arrow-grow',
            value: 'Investment readiness acceleration programs'
        },
        {
            id: 5,
            icon: 'calendar',
            value: 'Inspiring events and club meetings '
        }
    ];
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
                        position: 'relative',
                        padding: 16
                    }}
                >
                    <Image
                        resizeMode="cover"
                        source={require('../assets/star.png')}
                        style={{
                            position: 'absolute',
                            left: 286,
                            width: 54,
                            height: 54,
                        }}
                    />
                    <Text
                        variant='displaySmall'
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        Arya Women Investment Platform
                    </Text>
                    <Text
                        style={{
                            marginTop: 16,
                            textAlign: 'center'
                        }}
                    >
                        Our vision is to transform the world, led by women.
                    </Text>
                </View>
                <Image
                    resizeMode="cover"
                    source={require('../assets/arya-image.png')}
                    style={{
                        marginTop: 24,
                        borderRadius: 32,
                        width: '100%',
                        height: 192,
                    }}
                />
                <View
                    style={{
                        marginHorizontal: 16
                    }}
                >
                    <View
                        style={{
                            marginTop: 24
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center'
                            }}
                        >
                            LOGOS ///
                        </Text>
                    </View>
                    <View
                        style={{
                            marginTop: 24,
                            borderRadius: 24,
                            padding: 12,
                            backgroundColor: colors.primary
                        }}
                    >
                        <Text
                            variant='bodySmall'
                            style={{
                                color: '#fff'
                            }}
                        >
                            Arya Women Investment Platform was born as a social initiative in 2013 with the goal of achieving gender balance in investment, creating social and economic value and transforming the world under women's leadership. Today, Arya is Turkey's largest gender-balanced investment platform with more than 450 senior executive women members.
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            marginTop: 24,
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                padding: 8,
                                backgroundColor: '#fff',
                                borderRadius: 50
                            }}
                        >
                            <Avatar.Image
                                size={96}
                                source={require('../assets/dummy-founder-1.png')}
                            />
                        </View>
                        <Text
                            variant='labelMedium'
                            style={{
                                marginTop: 8,
                                color: colors.primary
                            }}
                        >
                            Founder
                        </Text>
                        <Text variant='titleMedium'>
                            Ahu Serter
                        </Text>
                        <Text
                            variant='bodySmall'
                            style={{
                                textAlign: 'center'
                            }}
                        >
                            As one of Turkey's most innovative entrepreneurs and investors with 20+ years of experience, she has invested $12M in mobility, sustainability and technology that improves people's lives.
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            marginTop: 24,
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                padding: 8,
                                backgroundColor: '#fff',
                                borderRadius: 50
                            }}
                        >
                            <Avatar.Image
                                size={96}
                                source={require('../assets/dummy-founder-2.png')}
                            />
                        </View>
                        <Text
                            variant='labelMedium'
                            style={{
                                marginTop: 8,
                                color: colors.primary
                            }}
                        >
                            Co-Founder
                        </Text>
                        <Text variant='titleMedium'>
                            Münteha Adalı
                        </Text>
                        <Text
                            variant='bodySmall'
                            style={{
                                textAlign: 'center'
                            }}
                        >
                            While carrying out projects focused on culture-based inequalities and social impact, she has assumed the role of strategist and impact advocate within the entrepreneurship, investment and civil society ecosystem.
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            marginTop: 24,
                            alignItems: 'center'
                        }}
                    >
                        <SimpleGrid
                            listKey={'specials'}
                            itemDimension={(width - 100) / 3}
                            data={specials}
                            spacing={16}
                            renderItem={({ item }) => (
                                <Special
                                    icon={item.icon}
                                    value={item.value}
                                />
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
            <Box
                px={16}
                py={16}
            >
                <Button
                    mode="contained"
                    onPress={() => {

                    }}
                >
                    Ready to join Arya
                </Button>
            </Box>
        </SafeAreaView>
    );
};
