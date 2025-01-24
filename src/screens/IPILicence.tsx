import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Checkbox, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { Box } from '../components/common/Box';
import { MainStackParams } from '../models/navigation';

type IPILicenseProps = StackScreenProps<MainStackParams, 'IPILicense'>;

export const IPILicense = ({ navigation, route }: IPILicenseProps) => {
  const { colors } = useTheme();

  const [checked, setChecked] = useState<boolean | undefined>(route.params.agreed);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Full Name Input */}
          <View style={styles.inputGroup}>
            <Text variant="titleMedium" style={styles.label}>
              Full name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              mode="outlined"
              placeholder="Name Surname"
              value={fullname}
              outlineStyle={styles.inputOutline}
              onChangeText={setFullname}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text variant="titleMedium" style={styles.label}>
              Email <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              mode="outlined"
              placeholder="example@example.com"
              value={email}
              outlineStyle={styles.inputOutline}
              onChangeText={setEmail}
            />
          </View>

          {/* Phone Input */}
          <View style={styles.inputGroup}>
            <Text variant="titleMedium" style={styles.label}>
              Phone <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.phoneContainer}>
              <TextInput
                mode="outlined"
                value={country}
                outlineStyle={styles.inputOutline}
                placeholder="Country Code"
                onChangeText={setCountry}
              />
              <TextInput
                mode="outlined"
                placeholder="5555555555"
                value={phone}
                outlineStyle={styles.inputOutline}
                style={styles.phoneInput}
                onChangeText={setPhone}
              />
            </View>
          </View>

          {/* Checkbox */}
          <View style={styles.checkboxContainer}>
            <Checkbox.Android
              status={checked ? 'checked' : 'unchecked'}
              color={colors.primary}
              uncheckedColor={colors.onSurface}
              onPress={() => setChecked(!checked)}
            />
            <Text style={styles.checkboxText}>
              I have read the{' '}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('DisclosureText')}
              >
                IPI License Disclosure Text
              </Text>{' '}
              and give my explicit consent to the processing of the relevant data.
              <Text style={styles.required}>*</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
      {/* Submit Button */}
      <Box px={16} py={16}>
        <Button
          mode="contained"
          disabled={!checked}
          onPress={() => navigation.navigate('Success')}
        >
          Submit
        </Button>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginTop: 16,
  },
  label: {
    marginBottom: 12,
  },
  required: {
    color: '#D71920',
  },
  inputOutline: {
    borderRadius: 16,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  phoneContainer: {
    flexDirection: 'row',
  },
  phoneInput: {
    flex: 1,
    marginLeft: 8,
  },
  checkboxContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
  checkboxText: {
    marginLeft: 8,
    flexShrink: 1,
  },
  link: {
    color: '#00AEEF',
  },
});
