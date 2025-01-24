import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Avatar, Button, Chip, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainStackParams } from '../models/navigation';

type MemberProps = StackScreenProps<MainStackParams, 'Member'>;

export const Member = (props: MemberProps) => {
    const {
        navigation,
        route
    } = props;
    const { colors } = useTheme();

    const [
        member,
        setMember
    ] = useState({
        name: "Merve Kaya",
        image: "",
        role: "Entrepreneur",
        status: "CTO at Nexa Innovations",
        following: true,
        interests: [
            {
                id: 0,
                title: 'Financial Planning',
            },
            {
                id: 1,
                title: 'Budgeting',
            },
            {
                id: 2,
                title: 'Saving',
            },
            {
                id: 3,
                title: 'Debt',
            },
            {
                id: 4,
                title: 'Insurance',
            }
        ]
    });

    const checkRole = (role: string) => {
        if (role === 'Investor') {
            return (
                <Image
                    resizeMode="contain"
                    source={require('../assets/flat-icons/diamond.png')}
                    style={{
                        width: 14,
                        height: 14,
                        tintColor: '#00AEEF',
                        marginRight: 4
                    }}
                />);
        } else if (role === 'Premium') {
            return (
                <Image
                    resizeMode="contain"
                    source={require('../assets/flat-icons/crown.png')}
                    style={{
                        width: 14,
                        height: 14,
                        tintColor: '#B61D8D',
                        marginRight: 4
                    }}
                />);
        } else if (role === 'Entrepreneur') {
            return (
                <Image
                    resizeMode="contain"
                    source={require('../assets/flat-icons/rocket.png')}
                    style={{
                        width: 14,
                        height: 14,
                        tintColor: '#F99F1C',
                        marginRight: 4
                    }}
                />);
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
                <Appbar.Header style={{
                    backgroundColor: 'transparent'
                }}>
                    <Appbar.Action
                        icon={require('../assets/flat-icons/angle-small-left.png')}
                        color="#414042"
                        style={{
                            backgroundColor: colors.onPrimary
                        }}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />
                    <Appbar.Content
                        title={
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text
                                    variant='titleMedium'
                                    style={{
                                        marginRight: 8
                                    }}
                                >
                                    {member.role}
                                </Text>
                                {checkRole(member.role)}
                            </View>
                        }
                    />
                    <Appbar.Action
                        icon={require('../assets/flat-icons/menu.png')}
                        color="#414042"
                        size={24}
                        style={{
                            backgroundColor: colors.onPrimary
                        }}
                        onPress={() => {

                        }}
                    />
                </Appbar.Header>
                <View
                    style={{
                        padding: 16
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 12
                        }}
                    >
                        <Avatar.Image
                            size={112}
                            source={require('../assets/Image-54.png')}
                            style={{
                                backgroundColor: '#f2f4f7',
                                marginRight: 12
                            }}
                        />
                        <View>
                            <Text
                                variant='titleSmall'>
                                {member.name}
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginVertical: 8
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginLeft: 8
                                    }}
                                >
                                    <Image
                                        source={require('../assets/flat-icons/marker-outlined.png')}
                                        style={{
                                            width: 14,
                                            height: 14,
                                            marginRight: 8,
                                            tintColor: '#414042'
                                        }}
                                    />
                                    <Text variant="bodySmall">
                                        Ankara
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginLeft: 8
                                    }}
                                >
                                    <Image
                                        source={require('../assets/flat-icons/badge-outlined.png')}
                                        style={{
                                            width: 14,
                                            height: 14,
                                            marginRight: 8,
                                            tintColor: '#414042'
                                        }}
                                    />
                                    <Text variant="bodySmall">
                                        1 Years Member
                                    </Text>
                                </View>
                            </View>
                            <Chip
                                style={{
                                    backgroundColor: '#fff',
                                    alignSelf: 'flex-start',
                                }}
                            >
                                <Text variant='bodySmall'>
                                    Family business
                                </Text>
                            </Chip>

                        </View>
                    </View>
                    <Text>
                        Operations Specialist at Anatolia Logistics | Logistics and Transportation
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 12
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <Button
                                mode='contained'
                                buttonColor={colors.primary}
                                icon={require('../assets/flat-icons/user-add.png')}
                                style={{
                                    marginRight: 8
                                }}
                                onPress={() => {

                                }}
                            >
                                Connect
                            </Button>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Button
                                mode='contained'
                                buttonColor={colors.secondary}
                                textColor={colors.primary}
                                icon={require('../assets/flat-icons/comment-alt-outlined.png')}
                                onPress={() => {

                                }}
                            >
                                Message
                            </Button>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        borderRadius: 16,
                        backgroundColor: '#fff',
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                    }}
                >
                    <Text
                        variant='titleSmall'
                    >
                        Interests
                    </Text>
                    <View
                        style={{
                            marginTop: 12,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: 4
                        }}
                    >
                        {member.interests.map((interest, index) => (
                            <Chip
                                key={interest.id}
                                style={{
                                    backgroundColor: '#f2f2f2'
                                }}
                            >
                                <Text>
                                    {interest.title}
                                </Text>
                            </Chip>
                        ))}
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 8,
                        borderRadius: 16,
                        backgroundColor: '#fff',
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                    }}
                >
                    <Text
                        variant='titleSmall'
                    >
                        Startups
                    </Text>
                    <View
                        style={{
                            marginTop: 12,
                            flexDirection: 'row'
                        }}
                    >
                        <Image
                            source={require('../assets/wave.png')}
                            style={{
                                width: 40,
                                height: 40,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />
                        <View>
                            <Text variant='titleSmall'>
                                Green Wave Technologies
                            </Text>
                            <Text
                                variant='bodyMedium'
                                style={{
                                    marginTop: 2
                                }}
                            >
                                Empowering Sustainability Through Innovation
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};