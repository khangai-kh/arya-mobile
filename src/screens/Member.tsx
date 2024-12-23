import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Chip, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParams } from '../navigation/App';

type MemberProps = StackScreenProps<AppStackParams, 'Member'>;

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
        role: "Investor",
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
                                        source={require('../assets/flat-icons/badge.png')}
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
                            <Chip style={{
                                backgroundColor: '#fff'
                            }}>
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
                            flex: 1,
                            flexDirection: 'row'
                        }}
                    >
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
                        <Button
                            mode='contained'
                            buttonColor={colors.secondary}
                            icon={require('../assets/flat-icons/comment-alt.png')}

                            onPress={() => {

                            }}
                        >
                            Message
                        </Button>
                    </View>
                </View>
                <View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};