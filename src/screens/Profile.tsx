import React, { useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet } from 'react-native';
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
import { SelectInterest } from '../components/SelectInterest';
import { InteresteModel } from '../models/general/models';
import { ProfileEditForm, ProfileEditFormValues } from '../components/forms/ProfileEditForm';

type ProfileProps = StackScreenProps<MainStackParams, 'Profile'> & {
  setAuthToken: (accessToken: string | null) => void;
};

const mapDispatchToProps = {
  setAuthToken,
};

const ProfileComponent = ({ navigation, setAuthToken: setAuthTokenProp }: ProfileProps) => {

  const { token } = useSelector((state: RootState) => state.auth);
  const user_id = useSelector((state: RootState) => state.auth.user_id);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const dynamicStyles = createDynamicStyles(colors);
  const [stage, setStage] = useState<'interest' | 'startup' | 'profile' | 'edit_profile'>('profile');

  const [interests, setInterests] = useState<InteresteModel[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);

  const [profile, setProfile] = useState<UserModel | null>(null);

  const { isFetching: isFetchingProfile, refetch } = useQuery(
    ['profile', token],
    () => API.get('/api/user/my-all-infos'),
    {
      onSuccess: ({ data }) => {
        setProfile(data);
        if (data.interests && Array.isArray(data.interests)) {
          const interestIds = data.interests.map((item: { id: number }) => item.id);
          setSelectedInterests(interestIds);
        }
      },
      onError: (error) => {
        console.error('Error fetching profile:', error);
      },
    }
  );

  const { isFetching: isFetchingInterests } = useQuery(
    ['interests', token],
    async () => {
      const { data } = await API.get('/api/interests');
      setInterests(data || []);
    }
  );

  const isFetching = isFetchingProfile || isFetchingInterests || loading;

  const getYearsAgo = (dateString: string): number => {
    let inputDate = new Date(dateString);
    if (isNaN(inputDate.getTime())) {
      return 0;
    }
    let now = new Date();
    let msInYear = 1000 * 60 * 60 * 24 * 365.25;
    let yearsAgo = Math.floor((now.getTime() - inputDate.getTime()) / msInYear);
    return yearsAgo;
  };

  const handleLogout = () => {
    setAuthTokenProp(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'SplashScreen' }],
    });
  };

   const handleUserInterests = async () => {
    console.log(user_id);

    if (loading) {
      return;
    }

    if (!user_id ) {
      console.error('Error: User ID or role selection is missing.');
      return;
    }
    try {

        await API.post('/api/user-interests', {
            user_id: user_id ?? undefined,
            interest_ids: selectedInterests,
        });
        console.log('All user data saved successfully.');
      //  setSuccessModalVisible(true);
        setStage('profile');
    } catch (error) {
        console.error('Error saving user info:', error);
    } finally {
        setLoading(false);
    }
  };

  const handleSelectInterest = (interest: InteresteModel) => {
    setSelectedInterests((prev) =>
        prev.includes(interest.interest_id)
            ? prev.filter((id) => id !== interest.interest_id)
            : [...prev, interest.interest_id]
    );
  };

  if (isFetching) {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
  }
  return (
    <SafeAreaView style={dynamicStyles.safeAreaView} edges={['top']}>
        <Appbar.Header style={dynamicStyles.appbarHeader}>
        {stage !== 'profile' && (
          <Appbar.Action
              icon={require('../assets/flat-icons/angle-small-left.png')}
              color="#414042"
              size={20}
              style={dynamicStyles.appbarActionRight}
              onPress={() => setStage('profile')}
            />)}
             {stage === 'profile' && (
              <Appbar.Content
                title={
                  <View style={dynamicStyles.titleContainer}>
                    <Text variant="titleMedium" style={dynamicStyles.titleText}>
                      Profile
                    </Text>
                  </View>
                }
              />)}
              {stage === 'interest' && (
                <Appbar.Content
                  title={
                    <View style={dynamicStyles.titleContainer}>
                      <Text variant="titleMedium" style={dynamicStyles.interestText}>
                        Edit interests
                      </Text>
                    </View>
                  }
              />)}
              {stage === 'edit_profile' && (
                <Appbar.Content
                  title={
                    <View style={dynamicStyles.titleContainer}>
                      <Text variant="titleMedium" style={dynamicStyles.interestText}>
                        Edit profile
                      </Text>
                    </View>
                  }
              />)}
            {stage === 'profile' && (
              <>
                <Appbar.Action
                  icon={require('../assets/flat-icons/edit.png')}
                  color="#414042"
                  size={20}
                  style={dynamicStyles.appbarActionRight}
                  onPress={() => setStage('edit_profile')}
                />
                <Appbar.Action
                  icon={require('../assets/flat-icons/settings.png')}
                  color="#414042"
                  size={20}
                  style={[dynamicStyles.appbarActionRight]}
                  onPress={() => handleLogout()}
                />
              </>
              )}
          </Appbar.Header>
        <ScrollView showsVerticalScrollIndicator={true}  contentContainerStyle={dynamicStyles.scrollView}>
        {stage === 'profile' && (
          <>
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
                      <Text variant="bodySmall">
                        {getYearsAgo(profile?.created_at ?? '1') === 0 
                          ? 'Joined this year' 
                          : `${getYearsAgo(profile?.created_at ?? '1')} years ago`}
                      </Text>
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
                  onPress={() => setStage('interest')}
                />
              </View>
              <View style={dynamicStyles.interestsContainer}>
                {profile?.interests.map((interest, index) => (
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
              {profile?.startups?.map((startup, index) => (
                <Pressable
                  key={startup.id || `startup-${index}`}
                  style={dynamicStyles.startupItem}
                  onPress={() => navigation.navigate('Startup', { startup })}
                >
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
                </Pressable>
              ))}
            </View>

            <Button mode="contained" onPress={() => {}} style={dynamicStyles.logoutButton}>
              Add start up
            </Button>
          </>
        )}
        {stage === 'interest' && (
          <SelectInterest
            interests={interests}
            selectedInterests={selectedInterests}
            onSelect={handleSelectInterest}
            onNextButton={() => handleUserInterests()}
          />
        )}
        {stage === 'edit_profile' && (
          console.log('Profile data:', profile?.carrier.sector?.name),
          <ProfileEditForm
            initialValues={{
              user_id: user_id ?? 1,
              role: profile?.roles[0].role_name,
              photo : profile?.photo,
              full_name: profile?.full_name,
              company: profile?.carrier.company_name,
              sector: profile?.carrier.sector ? { sector_id: profile.carrier.sector.id, sector_name: profile.carrier.sector.name } : undefined,
              title: profile?.carrier.title,
            }}
            onSubmit={(values: ProfileEditFormValues) => {

              if(values.full_name !== profile?.full_name)
              {
                console.log('Full Name:', values.full_name);
                console.log('Full Name:', profile?.full_name);
                setLoading(true);
                try {
                   API.put('/api/users/current-user-full_name', {
                      full_name: values.full_name,
                  });
                } catch (error) {
                    console.error('Error saving user info:', error);
                } finally {
                    setProfile(prevProfile =>
                      prevProfile ? { ...prevProfile, full_name: values.full_name ?? prevProfile.full_name } : prevProfile
                    );
                }
                console.log('Full Name:', values.full_name);
              }
              if(values.company !== profile?.carrier.company_name)
              {
                setProfile(prevProfile =>
                  prevProfile ? { ...prevProfile, carrier: { ...prevProfile.carrier, company_name: values.company ?? prevProfile.carrier.company_name } } : prevProfile
                );
                console.log('Company:', values.company);
              }
              if(values.sector?.sector_id !== profile?.carrier.sector?.id)
              {
                setProfile(prevProfile =>
                  prevProfile ? { ...prevProfile, carrier: { ...prevProfile.carrier, sector: { ...prevProfile.carrier.sector, id: values.sector?.sector_id ?? prevProfile.carrier.sector.id } } } : prevProfile
                );
                console.log('Sector:', values.sector?.sector_id);
              }
              if(values.title !== profile?.carrier.title)
              {
                setProfile(prevProfile =>
                  prevProfile ? { ...prevProfile, carrier: { ...prevProfile.carrier, title: values.title ?? prevProfile.carrier.title } } : prevProfile 
                );
                console.log('Title:', values.title);
              }
              try {
                console.log('User ID:', profile?.carrier.sector.id);
                API.post('/api/user-carrier', {
                  user_id: user_id,
                  company_name: profile?.carrier.company_name,
                  sector_id: profile?.carrier.sector.id,
                  title: profile?.carrier.title,
               });
               console.log('All user data saved successfully.');
              } catch (error) {
                  console.error('Error saving user info:', error);
              } finally {
                  setLoading(false);
                  setStage('profile');
              }
            }}
          />
        )}
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
    scrollView: {
      paddingBottom: 150,
    },
    appbarHeader: {
      width: '100%',
      backgroundColor: 'transparent',
      alignContent: 'center',
      justifyContent: 'space-between',
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
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft:-40,
    },
    titleText: {
      fontWeight: 'bold',
      paddingLeft: 50,
    },
    interestText: {
      fontWeight: 'bold',
      paddingLeft: 0,
      marginLeft: 0,
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
      paddingTop: 4,
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
      width: '90%',
    },
    interestsContainer: {
      marginTop: 12,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
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
      width: '90%',
      margin: 'auto',
    },
    startupItem: {
      marginTop: 12,
      paddingHorizontal: 8,
      flexDirection: 'row',
      width: '90%',
    },
    startupItemText: {
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
    champterText: {
      color: colors.primary,
      fontWeight: 'bold',
    },
    mentorshipText: {
      color: '#66b54b',
      fontWeight: 'bold',
      marginLeft: 4,
    },
    badgeText: {
      paddingLeft: 4,
    },
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
