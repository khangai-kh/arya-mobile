import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
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
import { InterestModel } from '../models/general/models';
import { ProfileEditForm, ProfileEditFormValues } from '../components/forms/ProfileEditForm';
import { StartUpForm, StartUpFormValues } from '../components/forms/StartUpForm';
import { useNavigationContext } from '../contexts/NavigationContext';


type ProfileProps = StackScreenProps<MainStackParams, 'Profile'> & {
  setAuthToken: (accessToken: string | null) => void;
};

const mapDispatchToProps = {
  setAuthToken,
};

const ProfileComponent = ({ navigation, setAuthToken: setAuthTokenProp }: ProfileProps) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const { user_id } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useTheme();
  const dynamicStyles = createDynamicStyles(colors);
  const [stage, setStage] = useState<'interest' | 'startup' | 'profile' | 'edit_profile'>('profile');
  const [interests, setInterests] = useState<InterestModel[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [profile, setProfile] = useState<UserModel | null>(null);
  const { setHideTabBar } = useNavigationContext();

  useEffect(() => {
    setHideTabBar(stage !== 'profile');
  }, [stage, setHideTabBar]);

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

  const isDataLoading = isFetchingProfile || isFetchingInterests || isLoading;

  const getYearsAgo = (dateString: string): number => {
    const inputDate = new Date(dateString);
    if (isNaN(inputDate.getTime())) {
      return 0;
    }
    const now = new Date();
    const msInYear = 1000 * 60 * 60 * 24 * 365.25;
    return Math.floor((now.getTime() - inputDate.getTime()) / msInYear);
  };

  const handleLogout = () => {
    setAuthTokenProp(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'SplashScreen' }],
    });
  };

  const handleUserInterests = async () => {
    if (isLoading || !user_id) {
      console.error('Error: Operation in progress or User ID missing.');
      return;
    }
    try {
      setIsLoading(true);
      await API.post('/api/user-interests', {
        user_id: user_id,
        interest_ids: selectedInterests,
      });
      setStage('profile');
    } catch (error) {
      console.error('Error saving user info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectInterest = (interest: InterestModel) => {
    setSelectedInterests((prev) =>
      prev.includes(interest.interest_id)
        ? prev.filter((id) => id !== interest.interest_id)
        : [...prev, interest.interest_id]
    );
  };

  const handleProfileUpdate = async (values: ProfileEditFormValues) => {
    setIsLoading(true);
    try {
      const updatedProfile = { ...profile } as UserModel;
      if (values.full_name !== profile?.full_name) {
        await API.put('/api/users/current-user-full_name', { full_name: values.full_name });
        updatedProfile.full_name = values.full_name ?? updatedProfile.full_name;
      }
      if (values.company !== profile?.carrier.company_name) {
        updatedProfile.carrier.company_name = values.company ?? updatedProfile.carrier.company_name;
      }
      if (values.sector?.sector_id !== profile?.carrier.sector?.id) {
        updatedProfile.carrier.sector = {
          ...updatedProfile.carrier.sector,
          id: values.sector?.sector_id ?? updatedProfile.carrier.sector.id,
        };
      }
      if (values.title !== profile?.carrier.title) {
        updatedProfile.carrier.title = values.title ?? updatedProfile.carrier.title;
      }
      await API.post('/api/user-carrier', {
        user_id: user_id,
        is_company_owner: profile?.carrier.is_company_owner,
        company_name: updatedProfile.carrier.company_name,
        industry_id: profile?.carrier.industry.id,
        sector_id: updatedProfile.carrier.sector.id,
        title: updatedProfile.carrier.title,
        area_of_expertise: profile?.carrier.area_of_expertise,
      });
      setProfile(updatedProfile);
    } catch (error) {
      console.error('Error saving user info:', error);
    } finally {
      setIsLoading(false);
      setStage('profile');
    }
  };

  const handleNewStartUp = async (values: StartUpFormValues) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', values.name || '');
      console.log(values.name);
      formData.append('description', values.description || '');
      formData.append('funding_round_type_id', values.fundingRoundType.value || 1);
      formData.append('startup_type_id', values.startupType.value || 1);
      formData.append('startup_status_id', values.stage.value || 1);
      formData.append('total_investment', values.totalInvestment || 1);
      formData.append('currency_id', values.currency.value || 1);

    if(values.logo){
      formData.append('logo', {
        uri: values.logo.uri,
        type: values.logo.type,
        name: values.logo.fileName || 'photo.jpg',
      });
    }
    const response = await API.post(
      '/api/startups/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      }
    );
    console.log(response);
    await refetch();
    } catch (error) {
      console.error('Error saving user info:', error);
    } finally {
      setIsLoading(false);
      setStage('profile');
    }
  };

  if (isDataLoading) {
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
          />
        )}
        {stage === 'profile' && (
          <Appbar.Content
            title={
              <View style={dynamicStyles.titleContainer}>
                <Text variant="titleMedium" style={dynamicStyles.titleText}>
                  {profile?.additional.role.name}
                </Text>
              </View>
            }
          />
        )}
        {stage === 'interest' && (
          <Appbar.Content
            title={
              <View style={dynamicStyles.titleContainer}>
                <Text variant="titleMedium" style={dynamicStyles.interestText}>
                  Edit interests
                </Text>
              </View>
            }
          />
        )}
        {stage === 'edit_profile' && (
          <Appbar.Content
            title={
              <View style={dynamicStyles.titleContainer}>
                <Text variant="titleMedium" style={dynamicStyles.interestText}>
                  Edit profile
                </Text>
              </View>
            }
          />
        )}
        {stage === 'startup' && (
        <Appbar.Content
          title={
            <View style={dynamicStyles.titleContainer}>
              <Text variant="titleMedium" style={dynamicStyles.interestText}>
                Add startup
              </Text>
            </View>
          }
        />
        )}
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
              icon={require('../assets/flat-icons/logout.png')}
              color="#414042"
              size={20}
              style={dynamicStyles.appbarActionRight}
              onPress={handleLogout}
            />
            <Appbar.Action
              icon={require('../assets/flat-icons/badge.png')}
              color="#414042"
              size={20}
              style={dynamicStyles.appbarActionRight}
              onPress={() => navigation.navigate('PaymentLocation')}
            />
          </>
        )}
      </Appbar.Header>
      <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={dynamicStyles.scrollView}>
        {stage === 'profile' && (
          <>
            <View>
              <View style={dynamicStyles.profileHeader}>
                <Avatar.Image
                  size={100}
                  source={profile?.photo ? { uri: profile.photo } : require('../assets/flat-icons/user.png')}
                  style={dynamicStyles.avatar}
                />
                <View>
                  <Text variant="titleSmall" style={dynamicStyles.nameText}>
                    {profile?.full_name}
                  </Text>
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
                  <View style={styles.roleBadge}>
                    {profile?.describes?.map((describe, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.interestBox}
                          onPress={() => {}}
                        >
                          <Image
                            source={
                              describe.icon
                                ? { uri: describe.icon }
                                : require('../assets/flat-icons/rocket-outlined.png')
                            }
                            style={styles.interestIcon}
                          />
                          <Text style={styles.interestText}>{describe.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
              <Text style={dynamicStyles.descriptionText}>
              {profile?.carrier?.title} | {profile?.carrier?.area_of_expertise}
              </Text>
              <View style={dynamicStyles.buttonRow}>
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

            <View style={dynamicStyles.sectionContainer}>
              <View style={dynamicStyles.interest}>
                <Text variant="titleSmall" style={dynamicStyles.sectionText}>
                  Interests
                </Text>
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
                <Text variant="titleSmall" style={dynamicStyles.sectionText}>
                  Startups
                </Text>
              </View>
              {profile?.startups?.map((startup, index) => (
                <Pressable
                  key={startup.id || `startup-${index}`}
                  style={dynamicStyles.startupItem}
                  onPress={() => navigation.navigate('Startup', { id: startup?.id.toString() })}
                >
                  <Text>{startup?.id.toString()}</Text>
                  <View style={dynamicStyles.startupItem}>
                    <Image
                      source={startup.startup_logo ? { uri: startup.startup_logo } : require('../assets/wave.png')}
                      style={dynamicStyles.startupImage}
                      resizeMode="contain"
                    />
                    <View>
                      <Text variant="titleSmall">{startup?.name}</Text>
                      <Text variant="bodyMedium" style={dynamicStyles.startupText}>
                        {startup?.description}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>

            <Button mode="contained" onPress={() => setStage('startup')} style={dynamicStyles.logoutButton}>
              Add start up
            </Button>
          </>
        )}
        {stage === 'interest' && (
          <SelectInterest
            interests={interests}
            selectedInterests={selectedInterests}
            onSelect={handleSelectInterest}
            onNextButton={handleUserInterests}
          />
        )}
        {stage === 'edit_profile' && (
          <ProfileEditForm
            initialValues={{
              user_id: user_id ?? 1,
              role: profile?.roles[0].role_name,
              photo: profile?.photo,
              full_name: profile?.full_name ?? undefined,
              company: profile?.carrier.company_name,
              sector: profile?.carrier.sector
                ? { id: profile.carrier.sector.id, name: profile.carrier.sector.name }
                : undefined,
              title: profile?.carrier.title,
            }}
            onSubmit={handleProfileUpdate}
          />
        )}
        {stage === 'startup' && (
          <StartUpForm
            initialValues={{
              logo: undefined,
              name: '121',
              slogan: '1212',
              description: '21212',
              stage: { label: 'Seed', value: 1 },
              investmentStage: { label: 'Seed', value: 1 },
              totalInvestment: 10000,
              startupType: { label: 'Seed', value: 1 },
              fundingRoundType: { label: 'Seed', value: 1 },
              currency: { label: 'Seed', value: 1 },
            }}
            onSubmit={handleNewStartUp}
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
    appbarActionRight: {
      backgroundColor: colors.onPrimary,
      marginRight: 5,
    },
    titleContainer: {
      alignItems: 'center',
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
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginBottom: 12,
      marginHorizontal: 30,
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
    descriptionText: {
     paddingHorizontal: 2,
      marginHorizontal: 30,
      width: 350,
    },
    buttonRow: {
      flexDirection: 'row',
      marginVertical: 12,
      width: 350,
      marginHorizontal: 30,
    },
    buttonMargin: {
      marginRight: 4,
    },
    buttonBadge: {
      marginVertical: 4,
      backgroundColor: '#F2A93B',
      borderRadius: 20,
      height: 25,
      paddingTop: 0,
    },
    buttonText: {
      fontSize: 12,
      fontWeight: 'bold',
      marginVertical: 8,
      lineHeight: 15,
    },
    buttonContent: {
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    sectionContainer: {
      borderRadius: 16,
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 12,
      width: 350,
      marginHorizontal: 30,
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
      width: 350,
      marginHorizontal: 30,
    },
    startupItem: {
      marginTop: 12,
      paddingHorizontal: 8,
      flexDirection: 'row',
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
      marginHorizontal: 30,
      width:350,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5, 
    width: 300,
  },
  roleEntrepreneur: {
    width: 14,
    height: 14,
    tintColor: '#F99F1C',
    marginRight: 4,
  },
  interestBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    marginBottom: 4, // Space between items vertically
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
    paddingLeft: 5,
  },
  interestIcon: {
    width: 20,
    height: 20,
    tintColor: '#A09FA0',
  },
});
