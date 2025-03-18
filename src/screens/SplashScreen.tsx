import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationType = {
  navigate: (screen: string) => void;
};

export const SplashScreen = (): JSX.Element => {
  const navigation = useNavigation<NavigationType>();
  const { width, height } = useWindowDimensions();

  // currentStep: 0 -> Step 1, 1 -> Step 2, 2 -> Step 3, 3 -> (existing) Step 4
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // If the user wants to skip directly to the 4th step
  const handleSkip = () => {
    setCurrentStep(3);
  };

  // STEP 1: The Power of Network
  if (currentStep === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        >
          <View style={styles.container}>
            <Text
              style={styles.skipContainer}
              onPress={handleSkip}
              >
              Skip
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/onboarding_1.png')}
                style={[
                  styles.heroImage,
                  { width: width - 32, height: height / 2 },
                ]}
                resizeMode="cover"
              />
            </View>
            <View style={styles.topContainer}>
              <Text style={styles.title}>The Power of Network!</Text>
              <Text style={styles.description}>
                Join Arya Challenge Club to grow stronger with unstoppable synergy. 
                Expand your network by investing in tech and supporting fellow founders.
              </Text>
            </View>
            <View style={styles.bottomButtonContainer}>
              <Button mode="contained" onPress={handleNext} style={styles.nextButton}>
                Next
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // STEP 2: Invest in Yourself
  if (currentStep === 1) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        >
          <View style={styles.container}>
          <Text
              style={styles.skipContainer}
              onPress={handleSkip}
              >
              Skip
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/onboarding_2.png')}
                style={[
                  styles.heroImage,
                  { width: width - 32, height: height / 2 },
                ]}
                resizeMode="cover"
              />
            </View>
            <View style={styles.topContainer}>
              <Text style={styles.title}>Invest in Yourself</Text>
              <Text style={styles.description}>
                Prepare yourself and your company for the future with training, 
                mentorship, and acceleration programs organized by Arya’s investor 
                platform with its business partners.
              </Text>
            </View>
            <View style={styles.bottomButtonContainer}>
              <Button mode="contained" onPress={handleNext} style={styles.nextButton}>
                Next
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // STEP 3: Welcome to Arya
  if (currentStep === 2) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        >
          <View style={styles.container}>
          <Text
              style={styles.skipContainer}
              onPress={handleSkip}
              >
              Skip
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/onboarding_3.png')}
                style={[
                  styles.heroImage,
                  { width: width - 32, height: height / 2 },
                ]}
                resizeMode="cover"
              />
            </View>
            <View style={styles.topContainer}>
              <Text style={styles.title}>Welcome to Arya!</Text>
              <Text style={styles.description}>
                Arya is bridging women capital and empowerment. Arya invests in women-led 
                startups and has facilitated over 25M$ so far. Arya also supports 
                3000+ women entrepreneurs through its accelerator programs.
              </Text>
            </View>
            <View style={styles.bottomButtonContainer}>
              <Button mode="contained" onPress={handleNext} style={styles.nextButton}>
                Next
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // STEP 4: (Existing) SplashScreen content
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/arya_up.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Image
              source={require('../assets/arya_team.png')}
              style={[
                styles.heroImage,
                { width: width - 32, height: height / 3 },
              ]}
              resizeMode="cover"
            />
          </View>
          <Text variant="titleLarge" style={styles.quote}>
            “Shining stars are not afraid of others shining.”
          </Text>
          <Button mode="contained" style={styles.discoverButton}>
            <Text variant="titleMedium" style={{ color: '#fff' }}>
              Discover Arya
            </Text>
          </Button>
          <Button mode="contained" style={styles.joinButton}>
            <Text
              variant="titleMedium"
              style={{ color: '#414042' }}
              onPress={() => navigation.navigate('SignUp')}
            >
              Ready to join Arya
            </Text>
          </Button>
          <View style={styles.signInContainer}>
            <Text
              variant="titleSmall"
              style={{
                fontWeight: '500',
              }}
            >
              Already have an account?
            </Text>
            <Text
              variant="titleSmall"
              style={{
                color: '#B61D8D',
                marginLeft: 4,
              }}
              onPress={() => navigation.navigate('SignIn')}
            >
              Sign in
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5EF99',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  // Reused top container for Steps 1-3
  topContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  // Buttons at bottom for Steps 1-3
  bottomButtonContainer: {
    width:700,
    paddingHorizontal:10,
    marginBottom: 20,
  },
  title: {
    paddingTop:10,
    fontSize: 24,
    fontFamily: 'PlayfairDisplay-SemiBold',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  nextButton: {
    backgroundColor: '#B61D8D',
    width: '45%',
  },
  skipButton: {
    width: '45%',
    borderWidth: 1,
    borderColor: '#B61D8D',
  },
  imageContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 50,
  },
  heroImage: {
    borderRadius: 32,
    marginTop: 32,
  },
  quote: {
    marginTop: 50,
    fontFamily: 'PlayfairDisplay-Italic',
    textAlign: 'center',
  },
  discoverButton: {
    marginTop: 52,
  },
  joinButton: {
    marginTop: 12,
    backgroundColor: '#fff',
    color: '#414042',
  },
  signInContainer: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipContainer: {
    paddingHorizontal:10,
    textAlign: 'right',
    paddingTop: 20,
  },
});
