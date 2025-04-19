import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Avatar, IconButton, Switch } from 'react-native-paper';
import { Asset, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { API } from '../../plugins/axios';
import { Sector } from '../../models/general/models';
import { Select, SelectItem } from '../common/Select';

export interface ProfileEditFormValues {
  user_id?: number;
  role?: string;
  photo?: string;
  full_name?: string;
  company?: string;
  sector?: Sector;
  address?: string;
  title?: string;
  is_mentor?: boolean;
  portrait_photo?: string;
}
export interface ProfileEditProps {
  initialValues: ProfileEditFormValues;
  onSubmit: (values: ProfileEditFormValues) => void;
}

const profileValidationSchema = Yup.object().shape({
  role: Yup.string().required('Role is required'),
  full_name: Yup.string().required('Full Name is required'),
  company: Yup.string().required('Company is required'),
  sector: Yup.object()
    .shape({
      sector_id: Yup.number().required(),
      sector_name: Yup.string().required(),
    })
    .required('Sector is required'),
  title: Yup.string().required('Title is required'),
});

export const ProfileEditForm = ({ initialValues, onSubmit }: ProfileEditProps) => {
  const [avatarUri, setAvatarUri] = useState(initialValues.photo);
  const [portraitUri, setPortraitUri] = useState(initialValues.portrait_photo);
  const [isUploading, setIsUploading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [isUploading1, setIsUploading1] = useState(false);
  const [isPortraitLoading, setIsPortraitLoading] = useState(false);

  console.log(initialValues.portrait_photo);
  const handleEditPhoto = (type:number) => {
    Alert.alert(
      'Select Photo',
      'Choose the source:',
      [
        { text: 'Camera', onPress: () => openCamera(type) },
        { text: 'Gallery', onPress: () => openGallery(type) },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const openCamera = (type: number) => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.errorCode) {
        console.log('Camera error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const photo = response.assets[0];
        if(type === 1){
          uploadPhoto(photo);
        }
        else{
          uploadPort(photo);
        }
      }
    });
  };

  const openGallery = (type: number) => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled gallery picker');
      } else if (response.errorCode) {
        console.log('Gallery error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const photo = response.assets[0];
        if(type === 1){
          uploadPhoto(photo);
        }
        else{
          uploadPort(photo);
        }
      }
    });
  };

  const uploadPhoto = async (photo: Asset) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('photo', {
      uri: photo.uri,
      type: photo.type,
      name: photo.fileName || 'photo.jpg',
    });

    try {
      const apiUrl = '/api/current-user-profile-photo';
      const response = await API.put(
        apiUrl,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        }
      );
      if (response?.data.photo_url != null) {
        setAvatarUri(response.data.photo_url);
      }
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadPort = async (photo: Asset) => {
    setIsUploading1(true);
    const formData = new FormData();
    formData.append('photo', {
      uri: photo.uri,
      type: photo.type,
      name: photo.fileName || 'photo.jpg',
    });

    try {
      const apiUrl = '/api/current-user-portrait-photo';
      const response = await API.put(
        apiUrl,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        }
      );
      if (response?.data.photo_url != null) {
        setPortraitUri(response.data.photo_url);
      }
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setIsUploading1(false);
    }
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
            <View style={styles.avatarsContainer}>
              <View style={styles.avatarContainer}>
                <Avatar.Image
                  size={120}
                  source={
                    avatarUri
                      ? { uri: avatarUri }
                      : require('../../assets/default-portrait.jpg')
                  }
                  onLoadStart={() => setIsImageLoading(true)}
                  onLoadEnd={() => setIsImageLoading(false)}
                />
                {(isUploading || isImageLoading) && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator animating={true} size="large" color="#fff" />
                  </View>
                )}
                <TouchableOpacity
                  style={styles.editIconContainer}
                  onPress={() => handleEditPhoto(1)}
                >
                  <IconButton
                    icon={require('../../assets/flat-icons/edit.png')}
                    size={15}
                    mode="contained"
                    containerColor="#9C27B0"
                    iconColor="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Formik
              initialValues={initialValues}
              validationSchema={profileValidationSchema}
              onSubmit={(values) => {
                console.log('Form submitted with values:', values);
                onSubmit(values);
              }}
            >
              {({
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                isSubmitting,
                setFieldValue,
              }) => (
                <View style={styles.formContainer}>
                  <Text variant="titleSmall" style={styles.title}>
                    Full Name
                  </Text>
                  <TextInput
                    autoCapitalize="words"
                    placeholder="Name Surname"
                    value={values.full_name}
                    onChangeText={handleChange('full_name')}
                    onBlur={handleBlur('full_name')}
                    style={styles.input}
                  />
                  {touched.full_name && errors.full_name && (
                    <Text style={styles.errorText}>{errors.full_name}</Text>
                  )}

                  <Text variant="titleSmall" style={styles.title}>
                    Company
                  </Text>
                  <TextInput
                    autoCapitalize="words"
                    placeholder="Company"
                    value={values.company}
                    onChangeText={handleChange('company')}
                    onBlur={handleBlur('company')}
                    style={styles.input}
                  />
                  {touched.company && errors.company && (
                    <Text style={styles.errorText}>{errors.company}</Text>
                  )}
                  <Select<Sector>
                    apiUrl="/api/sectors"
                    fieldName="sector"
                    label="Sector"
                    labelKey="name"
                    valueKey="id"
                    initialValue={{ label: values.sector?.name || '', value: Number(values.sector?.id) || 0 }}
                    onValueChange={(item: SelectItem<Sector> | null) => {
                      if (item) {
                        console.log('Selected:', item.value);
                      }
                    }}
                  />
                  <Text variant="titleSmall" style={styles.title}>
                    Title
                  </Text>
                  <TextInput
                    autoCapitalize="words"
                    placeholder="Title"
                    value={values.title}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    style={styles.input}
                  />
                  {touched.title && errors.title && (
                    <Text style={styles.errorText}>{errors.title}</Text>
                  )}

                  <View style={styles.switch}>
+                   <Text variant="bodyMedium">Mentorship</Text>
                    <Switch
                      value={values.is_mentor}
                      onValueChange={(val) => {
                        setFieldValue('is_mentor', val).catch((error) =>
                          console.error('Error setting field value:', error)
                        );
                      }}
                    />
                  </View>
                  <Text variant="titleSmall" style={styles.title}>
                    Portrait photo
                  </Text>
                  <Text variant="titleSmall" style={styles.input1}>
                    This phot is displayed in Member Discovery. It must be portrait. It is not mandatory.
                  </Text>
                  <View style={[styles.avatarContainer, {marginBottom: 40}]}>
                    <Image
                      source={
                        portraitUri
                          ? { uri: portraitUri }
                          : require('../../assets/default-portrait.jpg')
                      }
                      onLoadStart={() => setIsPortraitLoading(true)}
                      onLoadEnd={() => setIsPortraitLoading(false)}
                      style={styles.avatarImage}
                    />
                    {(isUploading1) && (
                      <View style={styles.loadingOverlay}>
                        <ActivityIndicator animating={true} size="large" color="#fff" />
                      </View>
                    )}
                    <TouchableOpacity
                      style={styles.editIconContainer1}
                      onPress={() => handleEditPhoto(2)}
                    >
                      <IconButton
                        icon={require('../../assets/flat-icons/edit.png')}
                        size={15}
                        mode="contained"
                        containerColor="#9C27B0"
                        iconColor="#fff"
                      />
                    </TouchableOpacity>
                  </View>
                  <Button
                    mode="contained"
                    style={styles.saveButton}
                    onPress={() => onSubmit(values)}
                    loading={isSubmitting}
                  >
                    Save
                  </Button>
                </View>
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
  },
  avatarContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarsContainer: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    top: 90,
  },
  editIconContainer1: {
    position: 'absolute',
    bottom: 0,
    right: 90,
    top: 140,
  },
  formContainer: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  input: {
    marginTop: 12,
    marginBottom: 8,
    borderWidth: 1,
    padding: 12,
    borderRadius: 20,
    borderColor: '#f5f5f5',
    backgroundColor: '#ffffff',
  },
  input1: {
    marginTop: 12,
    marginBottom: 8,
    borderWidth: 1,
    padding: 12,
    fontSize:12,
    fontStyle:'italic',
    borderRadius: 20,
    borderColor: '#f5f5f5',
    backgroundColor: '#f5f5f5',
  },
  switch: {
    flex:1,
    flexDirection:'row',
    marginTop: 12,
    marginBottom: 8,
    borderWidth: 1,
    paddingHorizontal:10,
    paddingVertical:8,
    justifyContent: 'space-between', alignItems: 'center',
    borderRadius: 20,
    borderColor: '#f5f5f5',
    backgroundColor: '#ffffff',
  },
  picker: {
    marginTop: 12,
    marginBottom: 8,
    borderWidth: 1,
    padding: 12,
    borderRadius: 40,
    borderColor: '#f5f5f5',
    backgroundColor: '#ffffff',
  },
  pickerContainer: {
    borderRadius: 8,
    maxHeight: 200, // Match maxHeight prop
  },
  placeholder: {
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 4,
  },
  saveButton: {
    marginTop: 24,
  },
  title: {
    fontWeight: 'bold',
  },
  avatarImage: {
    width: 95,
    height: 160,
    borderRadius: 5,
  },
});

export default ProfileEditForm;
