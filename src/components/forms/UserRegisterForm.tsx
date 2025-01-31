import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../../components/common/Box';
import { TextInput } from '../../components/common/TextInput';
import { TextInputSecure } from '../../components/common/TextInputSecure';
import { View } from '../../components/common/View';
import { MainStackParams } from '../../models/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import CustomCheckbox from '../../components/forms/CustomCheckbox';
import { Formik } from 'formik';
import { userValidationSchema }  from '../../utils/validation-schemas';

type SignUpProps = StackScreenProps<MainStackParams, 'SignUp'>;

export const UserRegister = ({ navigation }: SignUpProps) => {
    const { errorMessage, status: signInStatus } = useSelector(
    (state: RootState) => state.auth,
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ flex: 1, marginTop: 40 }}>
            <Text variant="titleLarge" style={{ textAlign: 'center' }}>
              Create Account
            </Text>
            <Text style={{ textAlign: 'center', marginTop: 4, paddingHorizontal: 80 }}>
              Fill your information below or register with your social account
            </Text>
            <Formik
              initialValues={{ fullName: '', email: '', password: '', termsAccepted: false }}
              validationSchema={userValidationSchema}
              onSubmit={(values) => {
                navigation.navigate('SignUpSuccess');
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <Box mt={32} px={16}>
                  <Text variant="titleSmall">Full Name</Text>
                  <TextInput
                    autoCapitalize="none"
                    keyboardType="default"
                    placeholder="Name Surname"
                    mode="outlined"
                    value={values.fullName}
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    style={{ marginTop: 12, marginBottom: 8 }}
                  />
                  {touched.fullName && errors.fullName && (
                    <Text style={{ color: 'red' }}>{errors.fullName}</Text>
                  )}

                  <Text variant="titleSmall">Email</Text>
                  <TextInput
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="example@example.com"
                    mode="outlined"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    style={{ marginTop: 12, marginBottom: 8 }}
                  />
                  {touched.email && errors.email && (
                    <Text style={{ color: 'red' }}>{errors.email}</Text>
                  )}

                  <Text variant="titleSmall">Password</Text>
                  <TextInputSecure
                    placeholder="********"
                    mode="outlined"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    style={{ marginTop: 12, marginBottom: 8 }}
                  />
                  {touched.password && errors.password && (
                    <Text style={{ color: 'red' }}>{errors.password}</Text>
                  )}

                  {errorMessage ? (
                    <Text style={{ color: 'red', textAlign: 'center', marginTop: 16 }}>
                      {errorMessage}
                    </Text>
                  ) : null}

                  <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center' }}>
                    <CustomCheckbox
                      checked={values.termsAccepted}
                      onToggle={() => setFieldValue('termsAccepted', !values.termsAccepted)}
                    />
                    <Text
                      variant='titleMedium'
                      style={{ marginLeft: 8, flexShrink: 1, fontWeight: '500' }}
                    >
                      Agree with{' '}
                      <Text
                        variant='titleMedium'
                        style={{ color: '#00AEEF', fontWeight: '500' }}
                        onPress={() => navigation.navigate('DisclosureText')}
                      >
                        Terms & Conditions
                      </Text>
                    </Text>
                  </View>
                  {touched.termsAccepted && errors.termsAccepted && (
                    <Text style={{ color: 'red' }}>{errors.termsAccepted}</Text>
                  )}

                  <Button
                    mode="contained"
                    style={{ marginTop: 24 }}
                    loading={signInStatus === 'pending'}
                    onPress={() => handleSubmit()}
                  >
                    Register
                  </Button>
                </Box>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
