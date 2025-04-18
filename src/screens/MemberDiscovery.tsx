import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  Appbar,
  Text,
  Icon,
  useTheme,
  MD3Theme,
  Button,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParams } from '../models/navigation';
import { UserModel } from '../models/users/User';
import { API } from '../plugins/axios';

type MemberDiscoveryProps = StackScreenProps<MainStackParams, 'MemberDiscovery'>;

export const MemberDiscovery = ({ navigation }: MemberDiscoveryProps) => {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const styles = makeStyles(colors, width);

  const [member, setMember] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getYearsAgo = useCallback((dateString: string): number => {
    const inputDate = new Date(dateString);
    if (isNaN(inputDate.getTime())) {return 0;}
    const now = Date.now();
    const msInYear = 1000 * 60 * 60 * 24 * 365.25;
    return Math.floor((now - inputDate.getTime()) / msInYear);
  }, []);

  const getRoleProps = useCallback((role: string) => {
    switch (role) {
      case 'Investor':
        return { icon: require('../assets/flat-icons/diamond.png'), tint: '#00AEEF' };
      case 'Premium':
        return { icon: require('../assets/flat-icons/crown.png'), tint: '#B61D8D' };
      case 'Entrepreneur':
        return { icon: require('../assets/flat-icons/rocket.png'), tint: '#F99F1C' };
      default:
        return { icon: require('../assets/flat-icons/user-outlined.png'), tint: '#F99F1C' };
    }
  }, []);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.get<UserModel>('/api/user/discovery-user');
      setMember(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !member) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>{error || 'No content available'}</Text>
        <Button mode="contained" onPress={() => {
          setLoading(true);
          setError(null);
          // re-run effect
          API.get<UserModel>('/api/user/discovery-user')
            .then(({ data }) => setMember(data))
            .catch(() => setError('Failed to load content'))
            .finally(() => setLoading(false));
        }}>
          Retry
        </Button>
      </View>
    );
  }

  const { icon: roleIcon, tint: roleTint } = getRoleProps(member.role.name);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.Content
          title={
            <View style={styles.titleContainer}>
              <Text variant="titleMedium" style={styles.titleText}>
                Member Discovery
              </Text>
            </View>
          }
        />
      </Appbar.Header>

      <View style={styles.cardWrapper}>
        <ImageBackground
          source={
            member?.portrait_photo
              ? { uri: member.portrait_photo }
              : require('../assets/portrait.png')
          }
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.badgeContainer}>
            <View style={[styles.badge, { backgroundColor: roleTint }]}>
              <Image source={roleIcon} style={styles.roleIcon} />
              <Text style={styles.badgeText}>{member.role.role_name}</Text>
            </View>
          </View>

          <View style={styles.overlay}>
            <Text variant="headlineSmall" style={styles.nameText}>
              {member.full_name}
            </Text>

            <View style={styles.infoRow}>
              <Icon source={require('../assets/flat-icons/briefcase.png')} size={16} color="#E0E0E0" />
              <Text variant="bodyMedium" style={styles.infoText}>
                {member.carrier?.title || 'Attending'} at {member.carrier?.company_name || 'Arya Women'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon source={require('../assets/flat-icons/badge.png')} size={16} color="#E0E0E0" />
              <Text variant="bodyMedium" style={styles.infoText}>
                {getYearsAgo(member.created_at || '') === 0
                  ? 'Joined this year'
                  : `${getYearsAgo(member.created_at || '')} years ago`}
              </Text>
            </View>

            <View style={styles.interestsRow}>
              {member.interests?.map((tag) => (
                <Text key={tag.id} style={styles.infoText}>
                  #{tag.name}
                </Text>
              ))}
            </View>

            <View style={styles.actionsRow}>
              <Button
                mode="contained"
                style={[styles.actionButton, { width: 40, height: 60, borderRadius: 40 }]}
                onPress={() =>{fetchContent()}}
              >
                <Image source={require('../assets/flat-icons/x.png')} style={styles.actionIcon} />
              </Button>
              <Button
                style={[styles.actionButton, styles.actionSecondary, { width: 40, height: 60 }]}
                onPress={() => {}}
              >
                <Image
                  source={require('../assets/flat-icons/comment-alt-outlined.png')}
                  style={[styles.actionIcon, { tintColor: colors.primary }]}
                  resizeMode="contain"
                />
              </Button>
              <Button
                style={[styles.actionButton, styles.actionPrimary, { width: 40, height: 60 }]}
                onPress={() => {navigation.navigate('Member', { id: member.id })}}
              >
                <Image
                  source={require('../assets/flat-icons/info.png')}
                  style={[styles.actionIcon, { tintColor: 'white' }]}
                  resizeMode="contain"
                />
              </Button>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const makeStyles = (colors: MD3Theme['colors'], width: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardWrapper: {
      alignItems: 'center',
      height: '80%',
      marginTop: 16,
    },
    imageBackground: {
      width: width - 32,
      height: '92%',
      borderRadius: 16,
      overflow: 'hidden',
    },
    imageStyle: {
      borderRadius: 16,
      height: '100%',
    },
    badgeContainer: {
      position: 'absolute',
      top: 12,
      left: 12,
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 12,
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
    badgeText: {
      color: '#fff',
      fontSize: 11,
      fontWeight: 'bold',
      marginLeft: 4,
    },
    roleIcon: {
      width: 14,
      height: 14,
      tintColor: 'white',
    },
    overlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      padding: 16,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    },
    nameText: {
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: 8,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
    },
    infoText: {
      color: '#E0E0E0',
      marginLeft: 8,
      fontSize: 12,
    },
    interestsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: 8,
    },
    actionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 12,
    },
    actionButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 40,
    },
    actionSecondary: {
      backgroundColor: '#F3EE9B',
    },
    actionPrimary: {
      backgroundColor: colors.primary,
    },
    actionIcon: {
      width: 24,
      height: 24,
    },
    appbarHeader: {
      backgroundColor: 'transparent',
      elevation: 4,
    },
    titleContainer: {
      alignItems: 'center',
    },
    titleText: {
      fontWeight: 'bold',
      marginLeft: -20,
    },
    errorText:{
      marginBottom: 12,
    },
});
