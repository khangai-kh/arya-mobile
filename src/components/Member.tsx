import React from 'react';
import { Image, StyleSheet, TouchableOpacity, TouchableOpacityProps, View, ActivityIndicator } from 'react-native';
import { Avatar, Chip, IconButton, Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { InterestModel } from '../models/general/models';

type MemberProps = Omit<TouchableOpacityProps, 'activeOpacity'> & {
  name: string;
  image: string;
  memberRole: string;
  title: string;
  company: string;
  following: boolean;
  interests: InterestModel[];
  isLoading?: boolean;
  onFollowPress?: () => void;
};

export const Member = (props: MemberProps) => {
  const { colors } = useTheme();
  const componentStyles = styles(colors);
  const {
    style,
    name,
    image,
    memberRole,
    interests,
    following,
    title,
    company,
    isLoading = false,
    onFollowPress,
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
    } else if (role === 'Premium' || role === 'Other') {
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
    } else {
      return (
        <Image
          resizeMode="contain"
          source={require('../assets/flat-icons/crown-lined.png')}
          style={[componentStyles.roleIcon]}
        />
      );
    }
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const FollowButton = () => {
    if (isLoading) {
      return (
        <TouchableOpacity
          style={componentStyles.followButtonLoading}
          onPress={onFollowPress}
          disabled={isLoading}
        >
          <ActivityIndicator size={20} color={colors.primary} />
        </TouchableOpacity>
      );
    }

    return (
      <IconButton
        icon={
          following
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
        onPress={onFollowPress}
        disabled={isLoading}
      />
    );
  };

  return (
    <TouchableOpacity {...otherProps} style={[componentStyles.container, style]}>
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
                  {(memberRole && memberRole === 'Other') ? 'Premium' : memberRole}
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
              {title || 'Works'} at {company}
            </Text>
          </View>
          <FollowButton />
        </View>
      </View>
        <View style={componentStyles.interestsRow}>
          {interests.map((interest, index) => (
            <View
              key={interest.id}
              style={[
                componentStyles.interestChip,
                index !== interests.length - 1 && componentStyles.interestChipWithMargin,
              ]}
            >
              <Text variant='labelSmall'>{interest.name}</Text>
            </View>
          ))}
        </View>

    </TouchableOpacity>
  );
};

const styles = (colors: MD3Colors) =>
  StyleSheet.create({
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
      marginLeft: 10,
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
      fontSize: 13,
      fontWeight: '300',
    },
    followButton: {
      backgroundColor: colors.primary,
    },
    followButtonActive: {
      backgroundColor: colors.onPrimary,
    },
    followButtonLoading: {
      backgroundColor: colors.surfaceVariant,
      width: 35,
      height: 35,
      borderRadius: 20,
      justifyContent: 'center',
      marginRight: 5,
      marginTop:5,
      alignItems: 'center',
    },
    interestsRow: {
      flex:1,
      flexDirection: 'row',
      marginTop: 4,
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    interestChip: {
      backgroundColor: '#f2f2f2',
      paddingHorizontal:8,
      borderColor:'#f2f2f2',
      borderWidth:1,
      borderRadius:10,
      marginVertical:2,
    },
    interestChipWithMargin: {
      marginRight: 4,
    },
  });
