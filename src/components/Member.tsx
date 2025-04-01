import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Avatar, Chip, IconButton, Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { InterestModel } from '../models/general/models';

type MemberProps = Omit<TouchableOpacityProps, 'activeOpacity'> & {
    name: string;
    image: string;
    memberRole: string;
    status: string;
    following: boolean;
    interests: InterestModel[];
};

export const Member = (props: MemberProps) => {
    const { navigate } = useNavigation();
    const { colors } = useTheme();
    const componentStyles = styles(colors);
    const {
        style,
        name,
        image,
        memberRole,
        status,
        interests,
        following,
        ...otherProps
    } = props;


    const checkRole = (role: string) => {
        if (role === 'Investor') {
            return (
                <Image
                    resizeMode="contain"
                    source={require('../assets/flat-icons/diamond.png')}
                    style={[componentStyles.roleIcon, { tintColor: '#00AEEF' }]}
                />
            );
        } else if (role === 'Premium Entrepreneur' || role === 'Premium Investor') {
            return (
                <Image
                    resizeMode="contain"
                    source={require('../assets/flat-icons/crown.png')}
                    style={[componentStyles.roleIcon, { tintColor: '#B61D8D' }]}
                />
            );
        } else if (role === 'Entrepreneur') {
            return (
                <Image
                    resizeMode="contain"
                    source={require('../assets/flat-icons/rocket.png')}
                    style={[componentStyles.roleIcon, { tintColor: '#F99F1C' }]}
                />
            );
        }
        else {
            return (
                <Image
                    resizeMode="contain"
                    source={require('../assets/flat-icons/check-circle.png')}
                    style={[componentStyles.roleIcon, { tintColor: '#F99F1C' }]}
                />
            );
        }
    };

    return (
        <TouchableOpacity
            {...otherProps}
            style={[componentStyles.container, style]}
        >
            <View style={componentStyles.mainRow}>
                <Avatar.Image
                    size={54}
                    source={image ? { uri: image } : require('../assets/Image-54.png')}
                    style={componentStyles.avatar}
                />
                <View style={componentStyles.contentRow}>
                    <View style={componentStyles.infoContainer}>
                        <Chip style={componentStyles.roleChip}>
                            <View style={componentStyles.roleContent}>
                                {checkRole(memberRole)}
                                <Text
                                    variant="bodySmall"
                                    numberOfLines={1}
                                    style={componentStyles.roleText}
                                >
                                    {memberRole || 'Fremium'}
                                </Text>
                            </View>
                        </Chip>
                        <Text
                            variant="titleMedium"
                            numberOfLines={1}
                            style={componentStyles.nameText}
                        >
                            {name}
                        </Text>
                        <Text
                            variant="bodyMedium"
                            numberOfLines={1}
                            style={componentStyles.statusText}
                        >
                            {status}
                        </Text>
                    </View>
                    <IconButton
                        icon={following
                            ? require('../assets/flat-icons/following.png')
                            : require('../assets/flat-icons/user-add.png')
                        }
                        size={18}
                        iconColor={following ? '#B61D8D' : '#ffffff'}
                        style={[
                            following
                                ? componentStyles.followButtonActive
                                : componentStyles.followButton,
                        ]}
                        onPress={() => { }}
                    />
                </View>
            </View>
            <View style={componentStyles.interestsRow}>
                {interests.map((interest, index) => (
                    <Chip
                        key={interest.interest_id}
                        style={[
                            componentStyles.interestChip,
                            index !== interests.length - 1 && componentStyles.interestChipWithMargin,
                        ]}
                    >
                        <Text>{interest.interest_name}</Text>
                    </Chip>
                ))}
            </View>
        </TouchableOpacity>
    );
};

const styles = (colors: MD3Colors) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.outlineVariant,
        backgroundColor: '#fff',
    },
    mainRow: {
        flex: 1,
        flexDirection: 'row',
    },
    avatar: {
        backgroundColor: '#f2f4f7',
        marginRight: 4,
    },
    contentRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft:10,
    },
    infoContainer: {
        flex: 1,
    },
    roleChip: {
        backgroundColor: '#f2f2f2',
        alignSelf: 'flex-start',
    },
    roleContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    roleIcon: {
        width: 14,
        height: 14,
        marginRight: 4,
    },
    roleText: {
        fontSize: 12,
    },
    nameText: {
        fontSize: 16,
    },
    statusText: {
        fontSize: 13, // bodyMedium approximate size
        fontWeight: '300',
    },
    followButton: {
        backgroundColor: colors.primary,
    },
    followButtonActive: {
        backgroundColor: colors.onPrimary,
    },
    interestsRow: {
        flexDirection: 'row',
        marginTop: 4,
    },
    interestChip: {
        backgroundColor: '#f2f2f2',
    },
    interestChipWithMargin: {
        marginRight: 4,
    },
});
