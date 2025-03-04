import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Avatar, IconButton } from 'react-native-paper';
import { Asset, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { API } from '../../plugins/axios';
import { RootState } from '../../redux/configureStore';
import { useSelector } from 'react-redux';
import { Sector } from '../../models/general/models';

export interface ProfileEditFormValues {
  user_id?: number;
  role?: string;
  photo?: string;
  full_name?: string;
  company?: string;
  sector?: Sector;
  address?: string;
  title?: string;
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

const SectorSelect = ({ styles, selectedSector }: { styles: any; selectedSector: Sector }) => {
  const { values, setFieldValue, errors, touched } = useFormikContext<ProfileEditFormValues>();
  const [sectors, setSectors] = useState<Sector[]>([]);
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await API.get('/api/sectors', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setSectors(data || []);

        // Set initial sector value if none exists
        if (!values.sector && data?.length > 0) {
          setFieldValue('sector', data[0]); // Set the full Sector object
        }

        // If selectedSector is provided, set it
        if (selectedSector?.sector_id) {
          const matchingSector = data.find((s: Sector) => s.sector_id === selectedSector.sector_id);
          if (matchingSector) {
            setFieldValue('sector', matchingSector); // Set the full Sector object
          }
        }
      } catch (error) {
        console.error('Error fetching sectors:', error);
      }
    };

    fetchSectors();
  }, []); // Added setFieldValue to dependencies

  const sectorItems = sectors.map((sector) => ({
    label: sector.sector_name,
    value: sector.sector_id,
  }));

  return (
    <>
      <Text variant="titleSmall" style={styles.title}>
        Sector
      </Text>
      <Dropdown
        labelField="label"
        valueField="value"
        data={sectorItems}
        value={values.sector?.sector_id} // Use sector_id for the Dropdown
        onChange={(item) => {
          const selected = sectors.find((sector) => sector.sector_id === item.value);
          if (selected) {
            setFieldValue('sector', selected);
            values.sector = selected; // Set the full Sector object
          }
        }}
        style={styles.picker}
        containerStyle={styles.picker}
        selectedTextStyle={styles.placeholder}
        placeholder="Select Sector"
        placeholderStyle={styles.placeholder}
      />
      {touched.sector && errors.sector && (
        <Text style={styles.errorText}>{errors.sector}</Text>
      )}
    </>
  );
};

export const ProfileEditForm = ({ initialValues, onSubmit }: ProfileEditProps) => {
  const [avatarUri, setAvatarUri] = useState(initialValues.photo);
  const [isUploading, setIsUploading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleEditPhoto = () => {
    Alert.alert(
      'Select Photo',
      'Choose the source:',
      [
        { text: 'Camera', onPress: openCamera },
        { text: 'Gallery', onPress: openGallery },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const openCamera = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.errorCode) {
        console.log('Camera error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const photo = response.assets[0];
        uploadPhoto(photo);
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled gallery picker');
      } else if (response.errorCode) {
        console.log('Gallery error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const photo = response.assets[0];
        uploadPhoto(photo);
      }
    });
  };

  const uploadPhoto = async (photo: Asset) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('user_id', initialValues?.user_id?.toString() || '');
    formData.append('photo', {
      uri: photo.uri,
      type: photo.type,
      name: photo.fileName || 'photo.jpg',
    });

    try {
      const response = await API.put(
        `/api/update-user-profile-photo?user_id=${initialValues?.user_id}`,
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
            <View style={styles.avatarContainer}>
              <Avatar.Image
                size={120}
                source={
                  avatarUri
                    ? { uri: avatarUri }
                    : { uri: 'https://via.placeholder.com/80?text=Profile' }
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
                onPress={handleEditPhoto}
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
              }) => (
                <View style={styles.formContainer}>
                  {/* Role field commented out */}
                  {/* <Text variant="titleSmall" style={styles.title}>Role</Text>
                  <TextInput
                    autoCapitalize="none"
                    placeholder="Role"
                    value={values.role}
                    onChangeText={handleChange('role')}
                    onBlur={handleBlur('role')}
                    style={styles.input}
                  />
                  {touched.role && errors.role && (
                    <Text style={styles.errorText}>{errors.role}</Text>
                  )} */}

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

                  {/* Render the select box for Sector */}
                  <SectorSelect
                    styles={styles}
                    selectedSector={values.sector || { sector_id: 0, sector_name: '' }}
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
    right: 100,
    top: 80,
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
  picker: {
    marginTop: 12,
    marginBottom: 8,
    borderWidth: 1,
    padding: 12,
    borderRadius: 40,
    borderColor: '#f5f5f5',
    backgroundColor: '#ffffff',
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
});

export default ProfileEditForm;