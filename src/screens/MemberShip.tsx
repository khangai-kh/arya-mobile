// screens/MemberShip.tsx
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View } from 'react-native';
import { MainStackParams } from '../models/navigation';
import MembershipForm, { MemberFormValues } from '../components/forms/MembershipForm';

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

  // Define an empty onSubmit handler
  const handleSubmit = (values: MemberFormValues) => {
    // Leave empty for now
  };

  return (
    <View>
      <MembershipForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </View>
  );
};

export default MemberShip;
