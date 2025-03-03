import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../../components/common/Box';
import { TextInput } from '../../components/common/TextInput';
import { View } from '../../components/common/View';
import { Text, Button, Avatar, IconButton } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

export interface ProfileEditFormValues {
  role?: string;
  photo?: string;
  full_name?: string;
  company?: string;
  sector?: string;
  address?: string;
  title?: string;
}

// Define the props for the ProfileEditForm component
export interface ProfileEditProps {
  initialValues: ProfileEditFormValues;
  onSubmit: (values: ProfileEditFormValues) => void;
}
// Validation schema for the form
const profileValidationSchema = Yup.object().shape({
  role: Yup.string().required('Role is required'),
  fullName: Yup.string().required('Full Name is required'),
  company: Yup.string().required('Company is required'),
  sector: Yup.string().required('Sector is required'),
  title: Yup.string().required('Title is required'),
});

export const ProfileEditForm: React.FC<ProfileEditProps> = ({
  initialValues,
  onSubmit,
}) => {

  const handleEditPhoto = () => {
    console.log('Edit photo tapped');

  };

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
            <Text variant="titleLarge" style={styles.title}>
              Edit Profile
            </Text>

            <View style={styles.avatarContainer}>
              <Avatar.Image
                size={80}
                source={
                  initialValues.photo
                    ? { uri: initialValues.photo }
                    : { uri: 'https://via.placeholder.com/80?text=Profile' }
                }
              />
              <TouchableOpacity
                style={styles.editIconContainer}
                onPress={handleEditPhoto}
              >
                <IconButton
                  icon="pencil"
                  size={18}
                  mode="contained"
                  containerColor="#9C27B0"
                  iconColor="#fff"
                />
              </TouchableOpacity>
            </View>

            {/* FORM */}
            <Formik
              initialValues={initialValues}
              validationSchema={profileValidationSchema}
              onSubmit={(values) => {
                console.log('Form submitted with values:', values);
              }}
            >
              {({
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <Box mt={32} px={16}>
                  <Text variant="titleSmall">Role</Text>
                  <TextInput
                    autoCapitalize="none"
                    placeholder="Role"
                    mode="outlined"
                    value={values.role}
                    onChangeText={handleChange('role')}
                    onBlur={handleBlur('role')}
                    style={styles.input}
                  />
                  {touched.role && errors.role && (
                    <Text style={styles.errorText}>{errors.role}</Text>
                  )}

                  <Text variant="titleSmall">Full Name</Text>
                  <TextInput
                    autoCapitalize="words"
                    placeholder="Name Surname"
                    mode="outlined"
                    value={values.full_name}
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    style={styles.input}
                  />
                  {touched.full_name && errors.full_name && (
                    <Text style={styles.errorText}>{errors.full_name}</Text>
                  )}

                  <Text variant="titleSmall">Company</Text>
                  <TextInput
                    autoCapitalize="words"
                    placeholder="Company"
                    mode="outlined"
                    value={values.company}
                    onChangeText={handleChange('company')}
                    onBlur={handleBlur('company')}
                    style={styles.input}
                  />
                  {touched.company && errors.company && (
                    <Text style={styles.errorText}>{errors.company}</Text>
                  )}

                  <Text variant="titleSmall">Sector</Text>
                  <TextInput
                    autoCapitalize="words"
                    placeholder="Sector"
                    mode="outlined"
                    value={values.sector}
                    onChangeText={handleChange('sector')}
                    onBlur={handleBlur('sector')}
                    style={styles.input}
                  />
                  {touched.sector && errors.sector && (
                    <Text style={styles.errorText}>{errors.sector}</Text>
                  )}

                  <Text variant="titleSmall">Title</Text>
                  <TextInput
                    autoCapitalize="words"
                    placeholder="Title"
                    mode="outlined"
                    value={values.title}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    style={styles.input}
                  />
                  {touched.title && errors.title && (
                    <Text style={styles.errorText}>{errors.title}</Text>
                  )}

                  <Button
                    mode="contained"
                    style={styles.saveButton}
                    onPress={() => onSubmit(values)}
                    loading={isSubmitting}
                  >
                    Save
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
  avatarContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: -4,
  },
  input: {
    marginTop: 12,
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 4,
  },
  saveButton: {
    marginTop: 24,
  },
});
