import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, ActivityIndicator, Pressable, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Avatar, Button, Chip, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainStackParams } from '../models/navigation';
import { UserModel } from '../models/users/User';
import { API } from '../plugins/axios';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

type MemberProps = StackScreenProps<MainStackParams, 'Member'>;

export const Member = (props: MemberProps) => {
    const { navigation, route } = props;
    const memberId = route.params?.id;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { colors } = useTheme();
    const dynamicStyles = styles(colors);
    const [member, setMember] = useState<UserModel | null>(null);
    const [followLoading, setFollowLoading] = useState(false);

    const getYearsAgo = (dateString: string): string => {
        if (!dateString) {
          return 'Joined recently';
        }
        const inputDate = new Date(dateString);
        if (isNaN(inputDate.getTime())) {
          return 'Joined this year';
        }
        const now = new Date();
        const msInYear = 1000 * 60 * 60 * 24 * 365.25;
        return 'Joined' + Math.floor((now.getTime() - inputDate.getTime()) / msInYear);
    };

    useEffect(() => {
        const fetchContent = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await API.get(`/api/user/member-all-infos/${memberId}`);
                console.log('API Response:', response.data); // Debug log
                setMember(response.data);
            } catch (err) {
                console.error('Error fetching content:', err);
                setError('Failed to load content');
            } finally {
                setLoading(false);
            }
        };
        if (memberId) {
            fetchContent();
        }
    }, [memberId]);

    const checkRole = (role: string) => {
        if (role === 'Investor') {
            return (
                <Image
                    resizeMode="contain"
                    source={require('../assets/flat-icons/diamond.png')}
                    style={dynamicStyles.roleIconInvestor}
                />
            );
        } else if (role === 'Premium' || role === 'Other' || role === 'Premium Investor') {
            return (
                <Image
                    resizeMode="contain"
                    source={require('../assets/flat-icons/crown.png')}
                    style={dynamicStyles.roleIconPremium}
                />
            );
        } else if (role === 'Entrepreneur') {
            return (
                <Image
                    resizeMode="contain"
                    source={require('../assets/flat-icons/rocket.png')}
                    style={dynamicStyles.roleIconEntrepreneur}
                />
            );
        } else if (role === 'Fremium') {
            return (
                <Image
                    resizeMode="contain"
                    source={require('../assets/flat-icons/crown-lined.png')}
                    style={dynamicStyles.roleIconEntrepreneur}
                />
            );
        }

    };

    // const handleGoBack = () => {
    //     // You can also emit an event that the parent screen can listen to
    //     navigation.navigate('Members', { refresh: true });
    // };

    const handleFollowToggle = async () => {
        console.log(member);
        if (!member) {
            return;
        }

        try {
            setFollowLoading(true);
            if (member.is_favorited) {
                console.log('unfollow');
                await API.post('/api/users/unfollow', { user_id: member.id });
                setMember(prev => prev ? { ...prev, is_favorited: false } : null);
            } else {
                console.log('follow');
                await API.post('/api/users/follow', { user_id: member.id });
                setMember(prev => prev ? { ...prev, is_favorited: true } : null);
            }
        } catch (err) {
            console.error('Error toggling follow:', err);
            setError('Failed to update follow status');
        } finally {
            setFollowLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={dynamicStyles.loaderContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (error || !member) {
        return (
            <View style={dynamicStyles.loaderContainer}>
                <Text>{error || 'No content available'}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={dynamicStyles.container} edges={['bottom']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Appbar.Header style={dynamicStyles.appbar}>
                    <Appbar.Action
                        icon={require('../assets/flat-icons/angle-small-left.png')}
                        color="#414042"
                        style={[dynamicStyles.appbarAction, { backgroundColor: colors.onPrimary }]}
                        onPress={() => navigation.goBack()}
                    />
                    <Appbar.Content
                        title={
                            <View style={dynamicStyles.titleContainer}>
                                <Text variant="titleMedium" style={dynamicStyles.titleText}>
                                    {member.role.name || 'N/A'}
                                </Text>
                                {checkRole(member.role.name)}
                            </View>
                        }
                    />
                    <Appbar.Action
                        icon={require('../assets/flat-icons/menu.png')}
                        color="#414042"
                        size={18}
                        style={[dynamicStyles.appbarAction, { backgroundColor: colors.onPrimary }]}
                        onPress={() => {}}
                    />
                </Appbar.Header>

                <View style={dynamicStyles.profileContainer}>
                    <View style={dynamicStyles.profileHeader}>
                        <Avatar.Image
                            size={112}
                            source={member.photo ? { uri: member.photo } : require('../assets/flat-icons/user.png')}
                            style={dynamicStyles.avatar}
                        />
                        <View>
                            <Text variant="titleSmall" style={dynamicStyles.nameText}>{member.full_name}</Text>
                            <View style={dynamicStyles.locationContainer}>
                                <View style={dynamicStyles.locationItem}>
                                    <Image
                                        source={require('../assets/flat-icons/marker-outlined.png')}
                                        style={dynamicStyles.icon}
                                    />
                                    <Text variant="bodySmall">{member.address}</Text>
                                </View>
                                <View style={dynamicStyles.locationItem}>
                                    <Image
                                        source={require('../assets/flat-icons/badge-outlined.png')}
                                        style={dynamicStyles.icon}
                                    />
                                    <Text variant="bodySmall">
                                        {getYearsAgo(member?.created_at ?? '')}
                                    </Text>
                                </View>
                            </View>
                            <View style={dynamicStyles.roleBadge}>
                                {member?.describes?.map((describe, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={dynamicStyles.interestBox}
                                        onPress={() => {}}
                                    >
                                    <Text style={dynamicStyles.interestText}>{describe.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                    <Text>
                        {member.carrier?.title || 'No title available'}
                    </Text>
                    <View style={dynamicStyles.buttonContainer}>
                        <Button
                            mode="contained"
                            buttonColor={
                                member.is_favorited
                                  ? colors.secondary
                                  : colors.primary
                            }
                            icon={
                                member.is_favorited
                                  ? require('../assets/flat-icons/following.png')
                                  : require('../assets/flat-icons/user-add.png')
                            }
                            style={dynamicStyles.connectButton}
                            textColor={
                                member.is_favorited
                                ? colors.primary
                                : colors.secondary
                            }
                            onPress={handleFollowToggle}
                            loading={followLoading}
                            disabled={followLoading}
                        >
                             {member.is_favorited ?  'Connected' : 'Connect'}
                        </Button>
                        <Button
                            mode="contained"
                            buttonColor={colors.secondary}
                            textColor={colors.primary}
                            icon={require('../assets/flat-icons/comment-alt-outlined.png')}
                            style={dynamicStyles.messageButton}
                            onPress={() => {}}
                        >
                            Message
                        </Button>
                    </View>
                </View>

                <View style={dynamicStyles.interestsContainer}>
                    <Text variant="titleSmall" style={dynamicStyles.sectionTitle} >Interests</Text>
                    <View style={dynamicStyles.interestsChips}>
                        {member.interests.map((interest) => (
                            <Chip key={interest.id} style={dynamicStyles.interestChip}>
                                <Text>{interest.name}</Text>
                            </Chip>
                        ))}
                    </View>
                </View>

                <View style={dynamicStyles.startupsContainer}>
                    <Text variant="titleSmall" style={dynamicStyles.sectionTitle}>Startups</Text>
                    {member?.startups?.map((startup, index) => (
                        <Pressable
                            key={startup.id || `startup-${index}`}
                            style={dynamicStyles.startupItem}
                            onPress={() => navigation.navigate('Startup', { id: startup?.id.toString() })}
                            >
                            <View style={dynamicStyles.startupItem}>
                                <Image
                                    source={startup.startup_logo ? { uri: startup.startup_logo } : require('../assets/wave.png')}
                                    style={dynamicStyles.startupImage}
                                    resizeMode="contain"
                                />
                                <View>
                                <Text variant="titleSmall">{startup?.name}</Text>
                                <Text variant="bodyMedium" style={dynamicStyles.startupDescription}>
                                    {startup?.description}
                                </Text>
                                </View>
                            </View>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = (colors: MD3Colors)=> StyleSheet.create({

    container: { flex: 1 },
    appbar: {
        backgroundColor: 'transparent',
    },
    appbarAction: {},
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        marginRight: 8,
        fontSize: 14,
    },
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
    profileContainer: {
        padding: 16,
    },
    profileHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        backgroundColor: colors.secondary,
        marginRight: 12,
    },
    locationContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap:5,
        marginVertical: 8,
        width:'75%',
    },
    locationItem: {
        flexDirection: 'row',
    },
    icon: {
        width: 14,
        height: 14,
        tintColor: '#414042',
        marginRight: 4,
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
    connectedButton: {
        marginRight: 8,
        flex: 1,
    },
    messageButton: {
        flex: 1,
    },
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
    interestBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 15,
        backgroundColor: '#f5f5f5',
        marginBottom: 4,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    interestText: {
        fontSize: 11,
        lineHeight: 12,
        paddingHorizontal: 5,
    },
    roleBadge: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        width: 200,

    },
});
