/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Appbar, Avatar, Button, Chip, Text, useTheme, MD3Theme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { MainStackParams } from '../models/navigation';
import { setAuthToken } from '../redux/auth/reducer';
import { View } from '../components/common/View';
import { UserModel } from '../models/users/User';
import { RootState } from '../redux/configureStore';
import { useQuery } from 'react-query';
import { API } from '../plugins/axios';

type ProfileProps = StackScreenProps<MainStackParams, 'Profile'> & {
  setAuthToken: (accessToken: string | null) => void;
};

const mapDispatchToProps = {
  setAuthToken,
};

const ProfileComponent = ({ navigation, setAuthToken: setAuthTokenProp }: ProfileProps) => {
  const { colors } = useTheme();
  const { token } = useSelector((state: RootState) => state.auth);
  const dynamicStyles = createDynamicStyles(colors);
  const [profile, setProfile] = useState<UserModel | null>(null);

  const { isFetching, refetch } = useQuery(
      ['profile', token],
      () => {
        return API.get('/api/user/my-all-infos');
      },
      {
        onSuccess: ({ data }) => {
            setProfile(data);
        },
        onError: (error) => {
            console.error('Error fetching profile:', error);
        },
      }
  );

  const handleLogout = () => {
    setAuthTokenProp(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'SplashScreen' }],
    });
  };

  // Dynamically create theme-aware styles
 if (isFetching) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }
  return (
    <SafeAreaView style={dynamicStyles.safeAreaView} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Appbar.Header style={dynamicStyles.appbarHeader}>
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
            style={[dynamicStyles.appbarActionRight]}
            onPress={() => {}}
          />
        </Appbar.Header>

        <View>
          <View style={dynamicStyles.profileHeader}>
            <Avatar.Image
              size={100}
              source={profile?.photo ? { uri: profile?.photo } : require('../assets/flat-icons/user.png')}
              style={dynamicStyles.avatar}
            />
            <View>
              <Text variant="titleSmall" style={dynamicStyles.nameText}>{profile?.full_name}</Text>
              {/* <View style={dynamicStyles.champterContainer}>
                  <Text variant="bodySmall" style={dynamicStyles.champterText}>Istanbul Chapter</Text>
                  <Text variant="bodySmall" style={dynamicStyles.mentorshipText}>• Mentorship</Text>
              </View> */}
              <View style={dynamicStyles.locationContainer}>
                <View style={dynamicStyles.locationItem}>
                  <Image
                    source={require('../assets/flat-icons/marker-outlined.png')}
                    style={dynamicStyles.iconLocation}
                  />
                  <Text variant="bodySmall">{profile?.address}</Text>
                </View>
                <View style={dynamicStyles.locationItem}>
                  <Image
                    source={require('../assets/flat-icons/badge-outlined.png')}
                    style={dynamicStyles.iconLocation}
                  />
                  <Text variant="bodySmall">1 Years Member</Text>
                </View>
              </View>
              <View>
                <Button
                  mode="contained"
                  buttonColor="#F2A93B" // Match extracted color
                  textColor="white" // White text for contrast
                  icon={require('../assets/flat-icons/rocket.png')}
                  contentStyle={dynamicStyles.buttonContent}
                  labelStyle={dynamicStyles.buttonText}
                  style={dynamicStyles.buttonBadge}
                  onPress={() => {}}
                >
                  {profile?.roles[0].role_name}
                </Button>
              </View>
            </View>
          </View>
          <Text style={dynamicStyles.descriptionText}>
            {profile?.carrier?.title} | {profile?.carrier?.area_of_expertise}
          </Text>
          <View style={dynamicStyles.buttonRow}>
            <View>
              <Button
                mode="contained"
                buttonColor={colors.secondary}
                textColor={colors.primary}
                icon={require('../assets/flat-icons/user-add.png')}
                style={dynamicStyles.buttonMargin}
                onPress={() => {}}
              >
                Connections (2)
              </Button>
            </View>
            <View>
              <Button
                mode="contained"
                buttonColor={colors.secondary}
                textColor={colors.primary}
                icon={require('../assets/flat-icons/heart.png')}
                onPress={() => {}}
              >
                Followed (10)
              </Button>
            </View>
          </View>
        </View>

        <View style={dynamicStyles.sectionContainer}>
          <View style={dynamicStyles.interest}>
            <Text variant="titleSmall" style={dynamicStyles.sectionText}>Interests</Text>
            <Appbar.Action
              icon={require('../assets/flat-icons/edit.png')}
              color="#414042"
              size={15}
              style={dynamicStyles.appbarActionRight}
              onPress={() => {}}
            />
          </View>
          <View style={dynamicStyles.interestsContainer}>
            {profile?.interests.map((interest,index) => (
              <Chip key={interest.id || `interest-${index}`} style={dynamicStyles.chipInterests}>
                <Text>{interest.name}</Text>
              </Chip>
            ))}
          </View>
        </View>

        <View style={dynamicStyles.startupsContainer}>
          <View style={dynamicStyles.interest}>
            <Text variant="titleSmall" style={dynamicStyles.sectionText}>Startups</Text>
            <Appbar.Action
              icon={require('../assets/flat-icons/edit.png')}
              color="#414042"
              size={15}
              style={dynamicStyles.appbarActionRight}
              onPress={() => {}}
            />
          </View>
          {profile?.startups?.map((startup,index) => (
            <View key={startup.id || `startup-${index}`} style={dynamicStyles.startupItem}>
              <Image
                source={startup.startup_logo ? { uri: startup.startup_logo } : require('../assets/wave.png')}
                style={dynamicStyles.startupImage}
                resizeMode="contain"
              />
              <View>
                <Text variant="titleSmall">
                  {startup?.name}
                </Text>
                <Text variant="bodyMedium" style={dynamicStyles.startupText}>
                  {startup?.description}
                </Text>
              </View>
          </View>
          ))}
        </View>
        <Button mode="contained" onPress={handleLogout} style={dynamicStyles.logoutButton}>
          Log Out
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export const Profile = connect(null, mapDispatchToProps)(ProfileComponent);

const createDynamicStyles = (colors: MD3Theme['colors']) =>
  StyleSheet.create({
    safeAreaView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    appbarHeader: {
      backgroundColor: 'transparent',
      alignContent: 'center',
      justifyContent:'space-between',
      marginBottom: 10,
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
      fontWeight: 'bold',
      paddingLeft : 50,
    },
    profileHeader: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      marginHorizontal: 16,
    },
    avatar: {
      backgroundColor: '#f2f4f7',
      marginRight: 12,
    },
    interest: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
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
      paddingTop:4,
      marginLeft: 8,
    },
    descriptionText: {
      paddingRight: 4,
      marginHorizontal: 16,
    },
    buttonRow: {
      flexDirection: 'row',
      marginVertical: 12,
      width: '100%',
      marginHorizontal: 16,
      fontSize: 8,
    },
    buttonMargin: {
      marginRight: 1,
      fontSize: 4,
      width: '100%',
    },
    buttonBadge: {
      backgroundColor: '#F2A93B',
      borderRadius: 20,
      height: 25,
      width: '70%',
      elevation: 2,
      textAlignVertical: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    iconStyle: {
      marginRight: 5,
    },
    buttonText: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 8,
      marginTop: 8,
      lineHeight: 15,
    },
    buttonContent: {
      height: 30, // Set internal button height
      alignItems: 'center', // Ensure text and icon align vertically
      justifyContent: 'center',
      flexDirection: 'row', // Keep icon and text aligned horizontally
    },
    sectionContainer: {
      borderRadius: 16,
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 12,
      margin: 'auto',
      width : '90%',
    },
    interestsContainer: {
      marginTop: 12,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 4,
    },
    champterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
      marginHorizontal: 8,
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
      width : '90%',
      margin: 'auto',
    },
    startupItem: {
      marginTop: 12,
      paddingHorizontal: 8,
      flexDirection: 'row',
      width: '90%',
    },
    startupItemText:
    {
      width: '90%',
    },
    startupImage: {
      width: 40,
      height: 40,
      marginRight: 8,
    },
    startupText: {
      marginTop: 2,
      fontSize: 11,
    },
    logoutButton: {
      marginTop: 20,
      marginHorizontal: 16,
    },
    nameText: {
      color: '#414042',
      marginLeft: 8,
      fontSize: 20,
      fontWeight: 'bold',
    },
    sectionText: {
      color: '#414042',
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 8,
      alignItems: 'flex-start',
    },
    champterText:{
      color: colors.primary,
      fontWeight: 'bold'
    },
    mentorshipText:{
      color: '#66b54b',
      fontWeight: 'bold',
      marginLeft:4,
    },
    badgeText: {
      paddingLeft: 4,
    }
  });

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  roleBadge: {
    width: 12,
    height: 12,
    tintColor: '#B61D8D',
    marginTop: 4,
  },
  roleEntrepreneur: {
    width: 14,
    height: 14,
    tintColor: '#F99F1C',
    marginRight: 4,
  },
  
});
