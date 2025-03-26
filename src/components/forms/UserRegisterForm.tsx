import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react'; // Added useEffect
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput as PaperTextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../../components/common/Box';
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

export const UserRegister = ({ navigation, route }: SignUpProps) => {
  const agreed = route.params?.agreed as boolean; // Get agreed from route params
  const { errorMessage, status: signInStatus } = useSelector(
    (state: RootState) => state.auth,
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
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
                termsAccepted: agreed || false, // Initialize with agreed value
                general: '',
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
                  response = await API.post('api/users', payload);
                  console.log('User created successfully:', response.data);
                  navigation.navigate('SignUpSuccess', { userId: response.data });
                } catch (error: any) {
                  const registrationErrorMessage = error.response?.data?.detail?.message ||
                    'Registration failed. Please try again.';
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
              }) => {

                // Sync termsAccepted with agreed whenever it changes
                // eslint-disable-next-line react-hooks/rules-of-hooks
                useEffect(() => {
                  if (agreed !== undefined) {
                    setFieldValue('termsAccepted', agreed);
                  }
                }, [setFieldValue]);

                return (
                  <Box mt={32} px={16}>
                    <Text variant="titleSmall">Full Name</Text>
                    <PaperTextInput
                      autoCapitalize="none"
                      keyboardType="default"
                      placeholder="Name Surname"
                      mode="outlined"
                      value={values.fullName}
                      onChangeText={handleChange('fullName')}
                      onBlur={handleBlur('fullName')}
                      style={styles.input}
                      theme={{ roundness: 40 }}
                      outlineStyle={{ borderWidth: 0 }}
                      error={touched.fullName && !!errors.fullName}
                    />
                    {touched.fullName && errors.fullName && (
                      <Text style={styles.errorText}>{errors.fullName}</Text>
                    )}

                    <Text variant="titleSmall">Email</Text>
                    <PaperTextInput
                      autoCapitalize="none"
                      keyboardType="email-address"
                      placeholder="example@example.com"
                      mode="outlined"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      style={styles.input}
                      theme={{ roundness: 40 }}
                      outlineStyle={{ borderWidth: 0 }}
                      error={touched.email && !!errors.email}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}

                    <Text variant="titleSmall">Password</Text>
                    <PaperTextInput
                      placeholder="********"
                      mode="outlined"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      style={styles.input}
                      theme={{ roundness: 40 }}
                      outlineStyle={{ borderWidth: 0 }}
                      secureTextEntry={!showPassword}
                      right={
                        <PaperTextInput.Icon
                          icon={() => (
                            <Image
                              source={
                                showPassword
                                  ? require('../../assets/flat-icons/eye_off.png')
                                  : require('../../assets/flat-icons/eye.png')
                              }
                              style={styles.iconStyle}
                            />
                          )}
                          onPress={() => setShowPassword(!showPassword)}
                        />
                      }
                      error={touched.password && !!errors.password}
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
                          onPress={() => navigation.navigate('DisclosureText', { id: 1 })}
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
                );
              }}
            </Formik>
          </View>
          <View style={styles.socialContainer}>
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or register with</Text>
              <View style={styles.dividerLine} />
            </View>
            <View style={styles.socialIcons}>
              <TouchableOpacity style={styles.socialButton}>
                <Image source={require('../../assets/fb_logo.png')} style={styles.logoStyle} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Image source={require('../../assets/lkdn_logo.png')} style={styles.logoStyle} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Image source={require('../../assets/ggl_logo.png')} style={styles.logoStyle} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signInText}>
                Already have an account?{' '}
                <Text style={styles.signInLink}>Sign In</Text>
              </Text>
            </TouchableOpacity>
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
    borderColor: 'transparent',
    borderWidth: 0,
    backgroundColor: '#fff',
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 20,
    paddingTop: 2,
    padding: 0,
    height: 42,
  },
  iconStyle: {
    width: 24,
    height: 24,
    tintColor: '#666',
  },
  logoStyle: {
    width: 40,
    height: 40,
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
  socialContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 30,
    marginHorizontal: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 8,
    color: '#666',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    elevation: 2, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  signInText: {
    color: '#666',
    textAlign: 'center',
  },
  signInLink: {
    color: '#00AEEF',
    fontWeight: '500',
  },
});
