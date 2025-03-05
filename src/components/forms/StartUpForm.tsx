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
import { Text, Button, IconButton } from 'react-native-paper';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Asset, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { API } from '../../plugins/axios';
import { Select, SelectItem } from '../common/Select';
import { InvestmentStage } from '../../models/general/models';

export interface StartUpFormValues {
  user_id: number;
  id: number;
  logo: string;
  name: string;
  slogan: string;
  description: string;
  coFounders: string[];
  productImages: string[];
  phase: string;
  investmentStage: string;
  investors: string[];
  totalInvestment: string;
}

export interface StartUpFormProps {
  initialValues: StartUpFormValues;
  onSubmit: (values: StartUpFormValues) => void;
}

const startupValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  slogan: Yup.string().required('Slogan is required'),
  description: Yup.string().required('Description is required'),
  coFounders: Yup.array().of(Yup.string()).min(1, 'At least one co-founder is required'),
  productImages: Yup.array().of(Yup.string()).optional(),
  phase: Yup.string().required('Phase is required'),
  investmentStage: Yup.string().required('Investment stage is required'),
  investors: Yup.array().of(Yup.string()).optional(),
  totalInvestment: Yup.string().required('Total investment is required'),
});

export const StartUpForm = ({ initialValues, onSubmit }: StartUpFormProps) => {
  const [avatarUri, setAvatarUri] = useState<string>(initialValues.logo);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

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
    launchCamera({ mediaType: 'photo', quality: 0.7 }, (response) => {
      handleImagePickerResponse(response);
    });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, (response) => {
      handleImagePickerResponse(response);
    });
  };

  const handleImagePickerResponse = (response: any) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
      return;
    }
    if (response.errorCode) {
      console.error('Image picker error:', response.errorMessage);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
      return;
    }
    if (response.assets && response.assets.length > 0) {
      const photo = response.assets[0] as Asset;
      if (photo.uri) {
        uploadPhoto(photo);
      }
    }
  };

  const uploadPhoto = async (photo: Asset) => {
    if (!photo.uri) {
      console.error('No photo URI provided');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('user_id', initialValues.user_id.toString());
    formData.append('photo', {
      uri: photo.uri,
      type: photo.type || 'image/jpeg',
      name: photo.fileName || `photo-${Date.now()}.jpg`,
    });

    try {
      const response = await API.put(
        `/api/update-user-profile-photo?user_id=${initialValues.user_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
          timeout: 10000,
        }
      );
      const photoUrl = response?.data?.photo_url;
      if (photoUrl) {
        setAvatarUri(photoUrl);
      } else {
        console.warn('No photo URL returned from server');
      }
    } catch (error) {
      console.error('Photo upload failed:', error);
      Alert.alert('Upload Failed', 'Could not upload photo. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormSubmit = async (
    values: StartUpFormValues,
    { setSubmitting }: FormikHelpers<StartUpFormValues>
  ) => {
    try {
      values.logo = avatarUri;
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission failed:', error);
      Alert.alert('Error', 'Failed to save startup details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Image
                  style={styles.avatarImage}
                  source={
                    avatarUri
                      ? { uri: avatarUri }
                      : require('../../assets/flat-icons/rocket.png')
                  }
                  resizeMode="contain"
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
                disabled={isUploading}
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
              validationSchema={startupValidationSchema}
              onSubmit={handleFormSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isSubmitting,
                setFieldValue,
              }) => (
                <View style={styles.formContainer}>
                  <Text variant="titleSmall" style={styles.title}>
                    Name
                  </Text>
                  <TextInput
                    autoCapitalize="words"
                    placeholder="Startup Name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    style={styles.input}
                    editable={!isSubmitting}
                  />
                  {touched.name && errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}

                  <Text variant="titleSmall" style={styles.title}>
                    Slogan
                  </Text>
                  <TextInput
                    autoCapitalize="sentences"
                    placeholder="Your Startup Slogan"
                    value={values.slogan}
                    onChangeText={handleChange('slogan')}
                    onBlur={handleBlur('slogan')}
                    style={styles.input}
                    editable={!isSubmitting}
                  />
                  {touched.slogan && errors.slogan && (
                    <Text style={styles.errorText}>{errors.slogan}</Text>
                  )}

                  <Text variant="titleSmall" style={styles.title}>
                    Description
                  </Text>
                  <TextInput
                    autoCapitalize="sentences"
                    placeholder="Describe your startup"
                    value={values.description}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    style={styles.textarea}
                    multiline
                    numberOfLines={6} // Set to 6 lines
                    editable={!isSubmitting}
                  />
                  {touched.description && errors.description && (
                    <Text style={styles.errorText}>{errors.description}</Text>
                  )}

                  <Text variant="titleSmall" style={styles.title}>
                    Co-Founders (comma-separated)
                  </Text>
                  <TextInput
                    autoCapitalize="words"
                    placeholder="John Doe, Jane Smith"
                    value={values.coFounders.join(', ')}
                    onChangeText={(text) =>
                      setFieldValue('coFounders', text.split(',').map((item) => item.trim()))
                    }
                    onBlur={handleBlur('coFounders')}
                    style={styles.input}
                    editable={!isSubmitting}
                  />
                  {touched.coFounders && errors.coFounders && (
                    <Text style={styles.errorText}>{errors.coFounders as string}</Text>
                  )}
                  {initialValues.id > 0 && (
                    <>
                      <Text variant="titleSmall" style={styles.title}>
                        Product Images (comma-separated URLs)
                      </Text>
                      <TextInput
                        autoCapitalize="none"
                        placeholder="http://example.com/img1.jpg, http://example.com/img2.jpg"
                        value={values.productImages.join(', ')}
                        onChangeText={(text) =>
                          setFieldValue('productImages', text.split(',').map((item) => item.trim()))
                        }
                        onBlur={handleBlur('productImages')}
                        style={styles.input}
                        editable={!isSubmitting}
                      />
                      {touched.productImages && errors.productImages && (
                        <Text style={styles.errorText}>{errors.productImages as string}</Text>
                      )}
                    </>
                  )}
                  <Select<InvestmentStage>
                      apiUrl="/api/funding_round_types"
                      fieldName="Phase"
                      label="Phase"
                      labelKey="name"
                      valueKey="id"
                      initialValue={{ label: '', value: 0 }}
                      onValueChange={(item: SelectItem<InvestmentStage> | null) => {
                        if (item) {
                          console.log('Selected:', item.value);
                        }
                      }}
                    />
                    <Select<InvestmentStage>
                      apiUrl="/api/funding_round_types"
                      fieldName="Investment Stage"
                      label="Investment Stage"
                      labelKey="name"
                      valueKey="id"
                      initialValue={{ label: '', value: 0 }}
                      onValueChange={(item: SelectItem<InvestmentStage> | null) => {
                        if (item) {
                          console.log('Selected:', item.value);
                        }
                      }}
                    />
                  <Text variant="titleSmall" style={styles.title}>
                    Investors (comma-separated)
                  </Text>
                  <TextInput
                    autoCapitalize="words"
                    placeholder="Investor A, Investor B"
                    value={values.investors.join(', ')}
                    onChangeText={(text) =>
                      setFieldValue('investors', text.split(',').map((item) => item.trim()))
                    }
                    onBlur={handleBlur('investors')}
                    style={styles.input}
                    editable={!isSubmitting}
                  />
                  {touched.investors && errors.investors && (
                    <Text style={styles.errorText}>{errors.investors as string}</Text>
                  )}

                  <Text variant="titleSmall" style={styles.title}>
                    Total Investment
                  </Text>
                  <TextInput
                    autoCapitalize="none"
                    placeholder="e.g., $500,000"
                    value={values.totalInvestment}
                    onChangeText={handleChange('totalInvestment')}
                    onBlur={handleBlur('totalInvestment')}
                    style={styles.input}
                    keyboardType="numeric" // Suggests numeric input
                    editable={!isSubmitting}
                  />
                  {touched.totalInvestment && errors.totalInvestment && (
                    <Text style={styles.errorText}>{errors.totalInvestment}</Text>
                  )}

                  <Button
                    mode="contained"
                    style={styles.saveButton}
                    onPress={() => handleSubmit()}
                    loading={isSubmitting}
                    disabled={isSubmitting || isUploading}
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
    width: '100%',
  },
  flexContainer: {
    flex: 1,
    width: '95%',
    marginHorizontal:10,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: '#808080',
    width: 120,
    height: 120,
    borderRadius: 60,
    padding: 5,
  },
  avatarImage :{
    width: 60,
    height: 60,
    tintColor: '#FFFFFF',
  },
  loadingOverlay: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: -10,
    right: '20%',
    transform: [{ translateX: 10 }],
  },
  formContainer: {
    marginTop: 32,
    paddingHorizontal: 16,
    width: '100%',
  },
  input: {
    marginTop: 12,
    marginBottom: 8,
    borderWidth: 1,
    padding: 12,
    borderRadius: 20,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    fontSize: 15,
  },
  textarea: {
    marginTop: 12,
    marginBottom: 8,
    borderWidth: 1,
    padding: 12,
    borderRadius: 12, // Slightly less rounded for textarea look
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    fontSize: 16,
    height: 140, // Approximate height for 6 lines (adjust as needed)
    textAlignVertical: 'top', // Start text from top
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 8,
    fontSize: 12,
  },
  saveButton: {
    width: '100%',
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 8,
  },
});
