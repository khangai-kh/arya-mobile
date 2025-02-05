import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
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
import { userValidationSchema } from '../../utils/validation-schemas';
import { API } from '../../plugins/axios';

type SignUpProps = StackScreenProps<MainStackParams, 'SignUp'>;

const generateRandomString = (length: number) => {
  return Math.random().toString(36).substring(2, 2 + length);
};

const generateRandomEmail = () => {
  return `user_${generateRandomString(6)}@example.com`;
};

const generateRandomPassword = () => {
  return generateRandomString(10);
};

const generateRandomFullName = () => {
  return `User ${generateRandomString(5)}`;
};

export const UserRegister = ({ navigation }: SignUpProps) => {
  const { errorMessage, status: signInStatus } = useSelector(
    (state: RootState) => state.auth,
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.container}>
            <Text variant="titleLarge" style={styles.title}>Create Account</Text>
            <Text style={styles.description}>
              Fill your information below or register with your social account
            </Text>
            <Formik
              initialValues={{
                fullName: generateRandomFullName(),
                email: generateRandomEmail(),
                password: generateRandomPassword(),
                termsAccepted: false,
                general: ''
              }}
              validationSchema={userValidationSchema}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                let response;
                try {
                    const payload = JSON.stringify({
                        email: values.email,
                        password: values.password,
                        full_name: values.fullName,
                      });
                      console.log('User ', payload);
                       response = await API.post(
                        'api/users',
                        payload,
                      );
                      console.log('User created successfully:', response.data);
                      navigation.navigate('SignUpSuccess', { userId: response.data });
                } catch (error: any) {
                  const registrationErrorMessage = error.response.data.detail.message || 'Registration failed. Please try again.';
                  console.log('Error registering user:', registrationErrorMessage);
                  setErrors({ general: registrationErrorMessage });
                  setSubmitting(false);
                }
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
                isSubmitting,
              }) => (
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
                    style={styles.input}
                  />
                  {touched.fullName && errors.fullName && (
                    <Text style={styles.errorText}>{errors.fullName}</Text>
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
                    style={styles.input}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}

                  <Text variant="titleSmall">Password</Text>
                  <TextInputSecure
                    placeholder="********"
                    mode="outlined"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    style={styles.input}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}

                  {errors.general && (
                    <Text style={styles.generalError}>{errors.general}</Text>
                  )}

                  {errorMessage ? (
                    <Text style={styles.generalError}>{errorMessage}</Text>
                  ) : null}

                  <View style={styles.termsContainer}>
                    <CustomCheckbox
                      checked={values.termsAccepted}
                      onToggle={() => setFieldValue('termsAccepted', !values.termsAccepted)}
                    />
                    <Text variant="titleMedium" style={styles.termsText}>
                      Agree with{' '}
                      <Text
                        variant="titleMedium"
                        style={styles.termsLink}
                        onPress={() => navigation.navigate('DisclosureText')}
                      >
                        Terms & Conditions
                      </Text>
                    </Text>
                  </View>
                  {touched.termsAccepted && errors.termsAccepted && (
                    <Text style={styles.errorText}>{errors.termsAccepted}</Text>
                  )}

                  <Button
                    mode="contained"
                    style={styles.submitButton}
                    loading={isSubmitting || signInStatus === 'pending'}
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

export default UserRegister;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flexContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    marginTop: 40,
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 80,
  },
  input: {
    marginTop: 12,
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
  },
  generalError: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
  termsContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsText: {
    marginLeft: 8,
    flexShrink: 1,
    fontWeight: '500',
  },
  termsLink: {
    color: '#00AEEF',
    fontWeight: '500',
  },
  submitButton: {
    marginTop: 24,
  },
});
