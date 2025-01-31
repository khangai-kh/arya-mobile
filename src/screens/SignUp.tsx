import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainStackParams } from '../models/navigation';
import { UserRegister } from '../components/forms/UserRegisterForm';

type SignUpProps = StackScreenProps<MainStackParams, 'SignUp'>;

export const SignUp = ({ navigation, route }: SignUpProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <UserRegister navigation={navigation} route={route} />
    </SafeAreaView>
  );
};
