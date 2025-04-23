import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput as PaperTextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { View } from '../components/common/View';
import { MainStackParams } from '../models/navigation';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/configureStore';
import { signIn as signInAction } from '../redux/auth/actions';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ForgotPasswordModal } from '../components/ForgotPasswordModal';

// Define validation schema
const signInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

type SignInProps = StackScreenProps<MainStackParams, 'SignIn'>;

export const SignIn = ({ navigation }: SignInProps) => {
  const dispatch = useAppDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const { errorMessage, status: signInStatus } = useSelector(
    (state: RootState) => state.auth,
  );

  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >
          <View style={styles.innerContainer}>
            <Text variant="titleLarge" style={styles.title}>
              Sign In
            </Text>
            <Text style={styles.subtitle}>
              Hi! Welcome back, you've been missed
            </Text>
            <Formik
              initialValues={{
                email: 'duygu.aydin@gmail.com',
                password: '123123',
              }}
              validationSchema={signInValidationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await dispatch(
                    signInAction({
                      email: values.email.trim().toLowerCase(),
                      password: values.password,
                    }),
                  ).unwrap();
                } catch (error) {
                  console.error(error);
                } finally {
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
                isSubmitting,
              }) => (
                <Box mt={32} px={16}>
                  <Text variant="titleSmall">Email</Text>
                  <PaperTextInput
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="example@example.com"
                    placeholderTextColor='#A09FA0'
                    mode="outlined"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    style={styles.input}
                    theme={{ roundness: 40 }}
                    outlineColor="transparent"
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
                    placeholderTextColor='#A09FA0'
                    style={styles.input}
                    theme={{ roundness: 40 }}
                    outlineColor="transparent"
                    secureTextEntry={!showPassword}
                    right={
                      <PaperTextInput.Icon
                        // eslint-disable-next-line react/no-unstable-nested-components
                        icon={() => (
                          <Image
                            source={
                              showPassword
                                ? require('../assets/flat-icons/eye_off.png')
                                : require('../assets/flat-icons/eye.png')
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

                  {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                  ) : null}

                  <View style={styles.forgotPasswordContainer}>
                    <Text
                      variant="titleMedium"
                      style={styles.forgotPasswordText}
                      onPress={() => setModalVisible(true)}
                    >
                      Forgot password?
                    </Text>
                  </View>

                  <Button
                    mode="contained"
                    style={styles.signInButton}
                    loading={isSubmitting || signInStatus === 'pending'}
                    onPress={() => handleSubmit()}
                  >
                    Sign In
                  </Button>

                  {/* Social Login Section */}
                  <View style={styles.socialContainer}>
                    <View style={styles.dividerContainer}>
                      <View style={styles.dividerLine} />
                      <Text style={styles.dividerText}>or sign in with</Text>
                      <View style={styles.dividerLine} />
                    </View>
                    <View style={styles.socialIcons}>
                      <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../assets/fb_logo.png')} style={styles.logoStyle} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../assets/lkdn_logo.png')} style={styles.logoStyle} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../assets/ggl_logo.png')} style={styles.logoStyle} />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp', {
                        agreed: false,
                      })}>
                      <Text style={styles.signInText}>
                        Don't have an account?{' '}
                        <Text style={styles.signInLink}>Register</Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <ForgotPasswordModal
                    visible={isModalVisible}
                    onClose={() => setModalVisible(false)}
                  />
                </Box>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    marginTop:50,
  },
  scrollView: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    marginTop: 40,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
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
    height: 40,
  },
  iconStyle: {
    width: 24,
    height: 24,
    tintColor: '#666',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 8,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    color: '#00AEEF',
    fontWeight: '500',
  },
  signInButton: {
    marginTop: 24,
  },
  socialContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  logoStyle: {
    width: 40,
    height: 40,
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

export default SignIn;
