import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Avatar, Button, Chip, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainStackParams } from '../models/navigation';

type MemberProps = StackScreenProps<MainStackParams, 'Member'>;

export const Member = (props: MemberProps) => {
    const { navigation, route } = props;
    const { colors } = useTheme();

    const [member, setMember] = useState({
        name: "Merve Kaya",
        image: "",
        role: "Investor",
        status: "CTO at Nexa Innovations",
        following: true,
        interests: [
            { id: 0, title: 'Financial Planning' },
            { id: 1, title: 'Budgeting' },
            { id: 2, title: 'Saving' },
            { id: 3, title: 'Debt' },
            { id: 4, title: 'Insurance' },
        ]
    });

    const checkRole = (role: string) => {
        if (role === 'Investor') {
            return (
                <Image
                    resizeMode="contain"
                    source={require('../assets/flat-icons/diamond.png')}
                    style={styles.roleIconInvestor}
                />
            );
        } else if (role === 'Premium') {
            return (
                <Image
                    resizeMode="contain"
                    source={require('../assets/flat-icons/crown.png')}
                    style={styles.roleIconPremium}
                />
            );
        } else if (role === 'Entrepreneur') {
            return (
                <Image
                    resizeMode="contain"
                    source={require('../assets/flat-icons/rocket.png')}
                    style={styles.roleIconEntrepreneur}
                />
            );
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Appbar.Header style={styles.appbar}>
                    <Appbar.Action
                        icon={require('../assets/flat-icons/angle-small-left.png')}
                        color="#414042"
                        style={[styles.appbarAction, { backgroundColor: colors.onPrimary }]}
                        onPress={() => navigation.goBack()}
                    />
                    <Appbar.Content
                        title={
                            <View style={styles.titleContainer}>
                                <Text variant='titleMedium' style={styles.titleText}>
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
                        style={[styles.appbarAction, { backgroundColor: colors.onPrimary }]}
                        onPress={() => {}}
                    />
                </Appbar.Header>

                <View style={styles.profileContainer}>
                    <View style={styles.profileHeader}>
                        <Avatar.Image
                            size={112}
                            source={require('../assets/Image-54.png')}
                            style={styles.avatar}
                        />
                        <View>
                            <Text variant='titleSmall' style={styles.nameText}>{member.name}</Text>
                            <View style={styles.locationContainer}>
                                <View style={styles.locationItem}>
                                    <Image
                                        source={require('../assets/flat-icons/marker-outlined.png')}
                                        style={styles.icon}
                                    />
                                    <Text variant="bodySmall">Ankara</Text>
                                </View>
                                <View style={styles.locationItem}>
                                    <Image
                                        source={require('../assets/flat-icons/badge-outlined.png')}
                                        style={styles.icon}
                                    />
                                    <Text variant="bodySmall">1 Years Member</Text>
                                </View>
                            </View>
                            <Chip style={styles.chip}>
                                <Text variant='bodySmall'>Family business</Text>
                            </Chip>
                        </View>
                    </View>
                    <Text>Operations Specialist at Anatolia Logistics | Logistics and Transportation</Text>
                    <View style={styles.buttonContainer}>
                        <Button
                            mode='contained'
                            buttonColor={colors.primary}
                            icon={require('../assets/flat-icons/user-add.png')}
                            style={styles.connectButton}
                            onPress={() => {}}
                        >
                            Connect
                        </Button>
                        <Button
                            mode='contained'
                            buttonColor={colors.secondary}
                            textColor={colors.primary}
                            icon={require('../assets/flat-icons/comment-alt-outlined.png')}
                            style={styles.messageButton}
                            onPress={() => {}}
                        >
                            Message
                        </Button>
                    </View>
                </View>

                <View style={styles.interestsContainer}>
                    <Text variant='titleSmall' style={styles.sectionTitle} >Interests</Text>
                    <View style={styles.interestsChips}>
                        {member.interests.map((interest) => (
                            <Chip key={interest.id} style={styles.interestChip}>
                                <Text>{interest.title}</Text>
                            </Chip>
                        ))}
                    </View>
                </View>

                <View style={styles.startupsContainer}>
                    <Text variant='titleSmall' style={styles.sectionTitle}>Startups</Text>
                    <View style={styles.startupItem}>
                        <Image
                            source={require('../assets/wave.png')}
                            style={styles.startupImage}
                            resizeMode='contain'
                        />
                        <View>
                            <Text variant='titleSmall' style={styles.startupTitle}>Green Wave Technologies</Text>
                            <Text variant='bodyMedium' style={styles.startupDescription}>
                                Empowering Sustainability Through Innovation
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    appbar: { backgroundColor: 'transparent' },
    appbarAction: {},
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: { marginRight: 8 },
    roleIconInvestor: {
        width: 14,
        height: 14,
        tintColor: '#00AEEF',
        marginRight: 4,
    },
    roleIconPremium: {
        width: 14,
        height: 14,
        tintColor: '#B61D8D',
        marginRight: 4,
    },
    roleIconEntrepreneur: {
        width: 14,
        height: 14,
        tintColor: '#F99F1C',
        marginRight: 4,
    },
    profileContainer: { padding: 16 },
    profileHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        backgroundColor: '#f2f4f7',
        marginRight: 12,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:5,
        marginVertical: 8,
    },
    locationItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent :'flex-start',
    },
    icon: {
        width: 14,
        height: 14,
        marginRight: 8,
        tintColor: '#414042',
    },
    chip: {
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 12,
    },
    connectButton: {
        marginRight: 8,
        flex: 1,
    },
    messageButton: { flex: 1 },
    interestsContainer: {
        borderRadius: 16,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        marginHorizontal:10,
        paddingVertical: 12,
    },
    interestsChips: {
        marginTop: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    interestChip: { backgroundColor: '#f2f2f2' },
    sectionTitle :{
        fontWeight:'bold',
    },
    startupsContainer: {
        marginTop: 8,
        borderRadius: 16,
        marginHorizontal:10,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    startupItem: {
        marginTop: 12,
        flexDirection: 'row',
    },
    startupImage: {
        width: 40,
        height: 40,
        marginRight: 8,
    },
    startupDescription: {
        marginTop: 2,
        paddingHorizontal:5,
    },
    startupTitle: {
        marginTop: 2,
        fontSize: 15,
        paddingHorizontal:5,
    },
    nameText: {
        color: '#414042',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
