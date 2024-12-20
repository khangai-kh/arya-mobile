import { CompositeNavigationProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { Member } from '../components/Member';
import { AppStackParams } from '../navigation/App';
import { BottomTabStackParams } from '../navigation/BottomTab';

type UseNavigationProps = CompositeNavigationProp<NavigationProp<BottomTabStackParams, 'Home'>, NavigationProp<AppStackParams>>;

export const Members = () => {

    const { navigate } = useNavigation<UseNavigationProps>();
    const { colors } = useTheme();

    const [
        members,
        setMembers
    ] = useState([
        {
            name: "Merve Kaya",
            image: "",
            role: "Investor",
            status: "CTO at Nexa Innovations",
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
        },
        {
            name: "Elif Cetin",
            image: "",
            role: "Premium",
            status: "Investment Director at Peak Growth Ventures",
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
        }
    ]);

    return (
        <View
            style={{
                flex: 1,
                marginHorizontal: 16
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 8
                }}
            >
                <Text>
                    200 members
                </Text>
                <IconButton
                    icon={require('../assets/flat-icons/filter.png')}
                    size={18}
                    onPress={() => { }}
                />
            </View>
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
            >
                {members.map((member, index) => (
                    <Member
                        name={member.name}
                        image={member.image}
                        memberRole={member.role}
                        status={member.status}
                        interests={member.interests}
                        style={{
                            marginBottom: index === members.length - 1 ? 0 : 8
                        }}
                        onPress={() => {
                            navigate('Member', {
                                id: member.name
                            });
                        }}
                    />
                ))}
            </ScrollView>
        </View>
    );
};
