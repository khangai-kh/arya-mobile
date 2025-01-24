import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainStackParams } from '../models/navigation';

type SignUpProps = StackScreenProps<MainStackParams, 'SignUp'> & {
  behavior?: 'height' | 'padding' | 'position'; // Optional prop for KeyboardAvoidingView behavior
  children?: React.ReactNode; // Allows rendering custom content
};

export const SignUp = ({ behavior, children }: SignUpProps) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={behavior || (Platform.OS === 'android' ? 'height' : 'padding')}
      >
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});
