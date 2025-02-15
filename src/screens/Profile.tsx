/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Appbar, Avatar, Button, Chip, Text, useTheme, ThemeColors } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { MainStackParams } from '../models/navigation';
import { setAuthToken } from '../redux/auth/reducer';
import { View } from '../components/common/View';

type ProfileProps = StackScreenProps<MainStackParams, 'Profile'> & {
  setAuthToken: (accessToken: string | null) => void;
};

const mapDispatchToProps = {
  setAuthToken,
};

const ProfileComponent = ({ navigation, setAuthToken: setAuthTokenProp }: ProfileProps) => {
  const { colors } = useTheme();

  const handleLogout = () => {
    setAuthTokenProp(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'SplashScreen' }],
    });
  };

  const [member, setMember] = useState({
    name: 'Merve Kaya',
    image: '',
    role: 'Entrepreneur',
    status: 'CTO at Nexa Innovations',
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
      },
    ],
  });

  const checkRole = (role: string) => {
    if (role === 'Investor') {
      return (
        <Image
          resizeMode="contain"
          source={require('../assets/flat-icons/diamond.png')}
          style={styles.roleInvestor}
        />
      );
    }
    if (role === 'Premium') {
      return (
        <Image
          resizeMode="contain"
          source={require('../assets/flat-icons/crown.png')}
          style={styles.rolePremium}
        />
      );
    }
    if (role === 'Entrepreneur') {
      return (
        <Image
          resizeMode="contain"
          source={require('../assets/flat-icons/rocket.png')}
          style={styles.roleEntrepreneur}
        />
      );
    }
    return null;
  };

  // Dynamically create theme-aware styles
  const dynamicStyles = createDynamicStyles(colors);

  return (
    <SafeAreaView style={dynamicStyles.safeAreaView} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Appbar.Header style={dynamicStyles.appbarHeader}>
          <Appbar.Action
            icon={require('../assets/flat-icons/angle-small-left.png')}
            color="#414042"
            style={dynamicStyles.appbarActionLeft}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Appbar.Content
            title={
              <View style={dynamicStyles.titleContainer}>
                <Text variant="titleMedium" style={dynamicStyles.titleText}>
                  Profile
                </Text>
              </View>
            }
          />
          <Appbar.Action
            icon={require('../assets/flat-icons/edit.png')}
            color="#414042"
            size={20}
            style={dynamicStyles.appbarActionRight}
            onPress={() => {}}
          />
          <Appbar.Action
            icon={require('../assets/flat-icons/settings.png')}
            color="#414042"
            size={20}
            style={[dynamicStyles.appbarActionRight, { marginRight: 30 }]}
            onPress={() => {}}
          />
        </Appbar.Header>

        <View style={dynamicStyles.contentContainer}>
          <View style={dynamicStyles.profileHeader}>
            <Avatar.Image
              size={112}
              source={require('../assets/Image-54.png')}
              style={dynamicStyles.avatar}
            />
            <View>
              <Text variant="titleSmall">{member.name}</Text>
              <View style={dynamicStyles.locationContainer}>
                <View style={dynamicStyles.locationItem}>
                  <Image
                    source={require('../assets/flat-icons/marker-outlined.png')}
                    style={dynamicStyles.iconLocation}
                  />
                  <Text variant="bodySmall">Ankara</Text>
                </View>
                <View style={dynamicStyles.locationItem}>
                  <Image
                    source={require('../assets/flat-icons/badge-outlined.png')}
                    style={dynamicStyles.iconLocation}
                  />
                  <Text variant="bodySmall">1 Years Member</Text>
                </View>
              </View>
              <Chip style={dynamicStyles.chipBackground}>
                <Text variant="bodySmall">Family business</Text>
              </Chip>
            </View>
          </View>

          <Text style={dynamicStyles.descriptionText}>
            Operations Specialist at Anatolia Logistics | Logistics and Transportation
          </Text>
          <View style={dynamicStyles.buttonRow}>
            <View style={styles.flexOne}>
              <Button
                mode="contained"
                buttonColor={colors.secondary}
                textColor={colors.primary}
                icon={require('../assets/flat-icons/user-add.png')}
                style={dynamicStyles.buttonMargin}
                onPress={() => {}}
              >
                10+ connections
              </Button>
            </View>
            <View style={styles.flexOne}>
              <Button
                mode="contained"
                buttonColor={colors.secondary}
                textColor={colors.primary}
                icon={require('../assets/flat-icons/comment-alt-outlined.png')}
                onPress={() => {}}
              >
                Followed startups
              </Button>
            </View>
          </View>
        </View>

        <View style={dynamicStyles.sectionContainer}>
          <Text variant="titleSmall">Interests</Text>
          <View style={dynamicStyles.interestsContainer}>
            {member.interests.map((interest) => (
              <Chip key={interest.id} style={dynamicStyles.chipInterests}>
                <Text>{interest.title}</Text>
              </Chip>
            ))}
          </View>
        </View>

        <View style={dynamicStyles.startupsContainer}>
          <Text variant="titleSmall">Startups</Text>
          <View style={dynamicStyles.startupItem}>
            <Image
              source={require('../assets/wave.png')}
              style={dynamicStyles.startupImage}
              resizeMode="contain"
            />
            <View>
              <Text variant="titleSmall">Green Wave Technologies</Text>
              <Text variant="bodyMedium" style={dynamicStyles.startupText}>
                Empowering Sustainability Through Innovation
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Button mode="contained" onPress={handleLogout} style={dynamicStyles.logoutButton}>
        Log Out
      </Button>
    </SafeAreaView>
  );
};

export const Profile = connect(null, mapDispatchToProps)(ProfileComponent);

const createDynamicStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    safeAreaView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    appbarHeader: {
      backgroundColor: 'transparent',
    },
    appbarActionLeft: {
      backgroundColor: colors.onPrimary,
    },
    appbarActionRight: {
      backgroundColor: colors.onPrimary,
      marginRight: 5,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleText: {
      marginRight: 8,
    },
    contentContainer: {
      padding: 16,
    },
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
      marginVertical: 8,
    },
    locationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 8,
    },
    iconLocation: {
      width: 14,
      height: 14,
      marginRight: 8,
      tintColor: '#414042',
    },
    chipBackground: {
      backgroundColor: '#fff',
      alignSelf: 'flex-start',
    },
    descriptionText: {
      paddingRight: 4,
    },
    buttonRow: {
      flexDirection: 'row',
      marginTop: 12,
      paddingRight: 5,
    },
    buttonMargin: {
      marginRight: 8,
    },
    sectionContainer: {
      borderRadius: 16,
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    interestsContainer: {
      marginTop: 12,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 4,
    },
    chipInterests: {
      backgroundColor: '#f2f2f2',
    },
    startupsContainer: {
      marginTop: 8,
      borderRadius: 16,
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
    startupText: {
      marginTop: 2,
    },
    logoutButton: {
      marginTop: 20,
      marginHorizontal: 16,
    },
  });

const styles = StyleSheet.create({
  roleInvestor: {
    width: 14,
    height: 14,
    tintColor: '#00AEEF',
    marginRight: 4,
  },
  rolePremium: {
    width: 14,
    height: 14,
    tintColor: '#B61D8D',
    marginRight: 4,
  },
  roleEntrepreneur: {
    width: 14,
    height: 14,
    tintColor: '#F99F1C',
    marginRight: 4,
  },
  flexOne: {
    flex: 1,
  },
});
