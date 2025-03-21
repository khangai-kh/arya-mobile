// screens/MemberShip.tsx
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { MainStackParams } from '../models/navigation';
import  {MembershipForm, MemberFormValues } from '../components/forms/MembershipForm';
import { Appbar,MD3Theme,Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type MemberShipProps = StackScreenProps<MainStackParams, 'MemberShip'>;

export const MemberShip = (props: MemberShipProps) => {
  // Define initial values with empty/default values
  const initialValues: MemberFormValues = {
    id: 0, // Default value for required field
    full_name: '',
    email: '',
    linkedin_url: '',
    date_of_birth: '',
    address: '',
    phone: '',
    roles: [], // Empty array for required field
    photo: '', // Empty string for required field
    interests: [], // Empty array for required field
    describes: [], // Empty array for required field
    received_references: [], // Empty array for required field
    given_references: [], // Empty array for required field
    startups: [], // Empty array for required field
    carrier: {
      id: 0, // Default value for required field
      is_company_owner: false,
      company_name: '',
      industry: { id: 0, name: '' }, // Default values for required nested object
      sector: { id: 0, name: '' }, // Default values for required nested object
      title: '',
      area_of_expertise: '',
    },
    isInternational: false,
    motivation: '',
    profileType: '',
    termsAccepted: false,
  };

  const { colors } = useTheme();
  const dynamicStyles = createDynamicStyles(colors);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  // Define an empty onSubmit handler
  const handleSubmit = (values: MemberFormValues) => {
    console.log(values);
    // Leave empty for now
  };

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
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </SafeAreaView>
  );
};

const createDynamicStyles = (colors: MD3Theme['colors']) =>
  StyleSheet.create({
    safeArea: {
     flex:1,
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

