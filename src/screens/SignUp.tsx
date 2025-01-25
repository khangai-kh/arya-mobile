import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button, Checkbox, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Box } from '../components/common/Box';
import { TextInput } from '../components/common/TextInput';
import { TextInputSecure } from '../components/common/TextInputSecure';
import { View } from '../components/common/View';
import { MainStackParams } from '../models/navigation';
import { RootState } from '../redux/configureStore';

type SignUpProps = StackScreenProps<MainStackParams, 'SignUp'>;

export const SignUp = ({ navigation, route }: SignUpProps) => {

  const { colors } = useTheme();
  const { errorMessage, status: signInStatus } = useSelector(
    (state: RootState) => state.auth,
  );
  const [
    checked,
    setChecked
  ] = useState(false);
  const [
    fullName,
    setFullName
  ] = useState('');
  const [
    email,
    setEmail
  ] = useState('');
  const [
    password,
    setPassword
  ] = useState('');

  const handleSignUp = () => {
    navigation.navigate('SignUpSuccess');
  };

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={['top']}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View
            style={{
              flex: 1,
              marginTop: 40
            }}
          >
            <Text
              variant="titleLarge"
              style={{ textAlign: 'center' }}
            >
              Create Account
            </Text>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 4,
                paddingHorizontal: 80
              }}
            >
              Fill your information below or register with your social account
            </Text>
            <Box
              mt={32}
              px={16}
            >
              <Text variant="titleSmall">Full Name</Text>
              <TextInput
                autoCapitalize="none"
                keyboardType="default"
                placeholder="Name Surname"
                mode="outlined"
                value={fullName}
                onChangeText={setFullName}
                style={{
                  marginTop: 12,
                  marginBottom: 16
                }}
              />
              <Text
                variant="titleSmall"
              >
                Email
              </Text>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="example@example.com"
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                style={{
                  marginTop: 12,
                  marginBottom: 16
                }}
              />
              <Text variant="titleSmall">Password</Text>
              <TextInputSecure
                placeholder="********"
                mode="outlined"
                value={password}
                onChangeText={setPassword}
                // onSubmitEditing={handleSignUp}
                style={{
                  marginTop: 12,
                  marginBottom: 16
                }}
              />
              {errorMessage ? (
                <Text
                  style={{
                    color: 'red',
                    textAlign: 'center',
                    marginTop: 16
                  }}
                >
                  {errorMessage}
                </Text>
              ) : null}
              <View
                style={{
                  marginTop: 16,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Checkbox.Android
                  status={checked ? 'checked' : 'unchecked'}
                  color={colors.primary}
                  uncheckedColor={colors.onSurface}
                  onPress={() => setChecked(!checked)}
                />
                <Text
                  variant='titleMedium'
                  style={{
                    marginLeft: 8,
                    flexShrink: 1,
                    fontWeight: '500'
                  }}
                >
                  Agree with{' '}
                  <Text
                    variant='titleMedium'
                    style={{
                      color: '#00AEEF',
                      fontWeight: '500'
                    }}
                    onPress={() => navigation.navigate('DisclosureText')}
                  >
                    Terms & Conditions
                  </Text>
                </Text>
              </View>
              <Button
                mode="contained"
                style={{
                  marginTop: 24
                }}
                loading={signInStatus === 'pending'}
                onPress={handleSignUp}
              >
                Register
              </Button>
            </Box>
            {/* <View
              style={{
                marginTop: 32,
                flex: 1,
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  color: '#A09FA0',
                }}
              >
                or register with
              </Text>
            </View> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
