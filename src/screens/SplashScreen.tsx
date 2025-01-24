import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  View,
  StyleSheet,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

type NavigationType = {
  navigate: (screen: string) => void;
};

export const SplashScreen = (): JSX.Element => {
  const navigation = useNavigation<NavigationType>();
  const { width, height } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/aryaUP.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Image
              source={require('../assets/aryaekibi1.png')}
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
            Discover Arya
          </Button>
          <Button mode="contained" style={styles.joinButton}>
            Ready to join Arya
          </Button>
          <View style={styles.signInContainer}>
            <Text>Already have an account?</Text>
            <Button
              mode="text"
              onPress={() => navigation.navigate('SignIn')}
            >
              Sign in
            </Button>
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
    padding: 16,
  },
  imageContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  logo: {
    width: 98,
    height: 40,
  },
  heroImage: {
    borderRadius: 32,
    marginTop: 32,
  },
  quote: {
    marginTop: 52,
    fontFamily: 'PlayfairDisplay',
    textAlign: 'center',
  },
  discoverButton: {
    marginTop: 52,
  },
  joinButton: {
    marginTop: 12,
    backgroundColor: '#fff',
  },
  signInContainer: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

