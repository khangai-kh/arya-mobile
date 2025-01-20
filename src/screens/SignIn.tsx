import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/configureStore';
import { signIn as signInAction } from '../redux/auth/actions';
import { Box } from '../components/common/Box';
import { TextInput } from '../components/common/TextInput';
import { TextInputSecure } from '../components/common/TextInputSecure';

export const SignIn = (): JSX.Element => {
  const dispatch = useAppDispatch();
  //const { colors } = useTheme();

  const { errorMessage, status: signInStatus } = useSelector(
    (state: RootState) => state.auth,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await dispatch(
        signInAction({
          email: email.trim().toLowerCase(),
          password,
        }),
      ).unwrap();
      // If sign-in succeeds:
      // e.g. await dispatch(fetchProfile());
      // navigation.navigate('Home');
    } catch (error) {
      // Handle error here if needed
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
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
              Hi! Welcome back, you’ve been missed
            </Text>

            <Box mt={32} px={16} py={24}>
              <Text variant="titleSmall">Email</Text>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="example@example.com"
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
              />

              <Text variant="titleSmall">Password</Text>
              <TextInputSecure
                placeholder="********"
                mode="outlined"
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={handleSignIn}
              />

              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}

              {/* Uncomment later : TODO: API+Email /
               <Pressable
                 onPress={() => navigation.navigate('ForgotPassword')}
                 style={styles.forgotButton}
               >
                 <Text style={[styles.forgotText, { color: colors.secondary }]}>
                   Forgot password?
                 </Text>
               </Pressable>
              */}

              <Button
                mode="contained"
                style={styles.signInButton}
                loading={signInStatus === 'pending'}
                onPress={handleSignIn}
              >
                Sign in
              </Button>
            </Box>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// It’s generally cleaner to separate styles into a StyleSheet:
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    marginTop: 64, // Using a numeric value is generally more predictable than a percentage.
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 4,
  },
  input: {
    marginTop: 12,
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
  forgotButton: {
    marginTop: 16,
  },
  forgotText: {
    textAlign: 'right',
  },
  signInButton: {
    marginTop: 24,
  },
});

export default SignIn;
