// screens/MemberShip.tsx
import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import { MembershipForm } from '../components/forms/MembershipForm';
import { Appbar, MD3Theme, Text, useTheme } from 'react-native-paper';
import { UserModel } from '../models/users/User';
import { RootState } from '../redux/configureStore';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { API } from '../plugins/axios';
import { MainStackParams } from '../models/navigation';
import { StackScreenProps } from '@react-navigation/stack';

type MemberShipProps = StackScreenProps<MainStackParams, 'MemberShip'>;

export const MemberShip = ({ navigation, route }: MemberShipProps) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const { colors } = useTheme();
  const dynamicStyles = createDynamicStyles(colors);

  // Fetch user profile data using useQuery
  const { data: profileData, isFetching: isFetchingProfile } = useQuery<UserModel>(
    ['profile', token],
    () => API.get('/api/user/my-all-infos'),
    {
      enabled: !!token,
      select: (response) => response.data, // Directly select the data portion as UserModel
      onError: (error) => {
        console.error('Error fetching profile:', error);
      },
    }
  );

  const handleSubmit = (values: UserModel) => {
    navigation.navigate('PaymentLocation')
    //navigation.navigate('PremiumSuccess');
  };

  // Show loading state while fetching
  if (isFetchingProfile && !profileData) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={dynamicStyles.safeArea}>
      {/* Appbar at the top */}
      <Appbar.Header style={dynamicStyles.appbarHeader}>
        <Appbar.Action
          icon={require('../assets/flat-icons/angle-small-left.png')}
          color="#414042"
          size={20}
          style={dynamicStyles.appbarActionRight}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          title={
            <View style={dynamicStyles.appbarTitleContainer}>
              <Text variant="titleMedium">Membership form</Text>
            </View>
          }
        />
      </Appbar.Header>
      <MembershipForm
        initialValues={profileData as UserModel} // Type assertion since we know it matches UserModel
        onSubmit={handleSubmit} navigation={navigation} route={route} />
    </SafeAreaView>
  );
};

const createDynamicStyles = (colors: MD3Theme['colors']) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    appbarHeader: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
    },
    appbarActionRight: {
      backgroundColor: colors.onPrimary,
      marginRight: 5,
      position: 'absolute',
      left: 5,
      top: '50%',
      transform: [{ translateY: -25 }],
    },
    appbarTitleContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeStep: {
      color: colors.primary,
      fontWeight: 'bold',
      borderBottomWidth: 4,
      borderBottomColor: colors.primary,
    },
});

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
