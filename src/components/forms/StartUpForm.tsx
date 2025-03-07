import React, { useEffect, useRef, useState } from 'react';
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
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, IconButton } from 'react-native-paper';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Asset, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Select, SelectItem } from '../common/Select';
import { CurrencyModel, FundingRoundType, InvestmentStage, StartupType } from '../../models/general/models';
import { useNavigation } from '@react-navigation/native';

export interface StartUpFormValues {
  logo?: Asset;
  name: string;
  slogan: string;
  description: string;
  startupType: { label: string; value: number };
  fundingRoundType: { label: string; value: number };
  stage: { label: string; value: number };
  investmentStage: { label: string; value: number };
  totalInvestment: number;
  currency: { label: string; value: number };
}

export interface StartUpFormProps {
  initialValues: StartUpFormValues;
  onSubmit: (values: StartUpFormValues) => void;
}

const startupValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  slogan: Yup.string().required('Slogan is required'),
  description: Yup.string().required('Description is required'),
  stage: Yup.object()
  .shape({
    value: Yup.number().min(1, 'Stage is required').required('Stage is required'),
    label: Yup.string().required(),
  })
  .required('Stage is required'),
  totalInvestment: Yup.string().required('Total investment is required'),
  startupType: Yup.object()
  .shape({
    value: Yup.number().min(1, 'Type is required').required('Type is required'),
    label: Yup.string().required(),
  })
  .required('Type is required'),
  fundingRoundType: Yup.object()
  .shape({
    value: Yup.number().min(1, 'Funding round is required').required('Funding round is required'),
    label: Yup.string().required(),
  })
  .required('Funding round is required'),
  logo: Yup.string().optional(),
  currency:Yup.object()
  .shape({
    value: Yup.number().min(1, 'Currency is required').required('Currency is required'),
    label: Yup.string().required(),
  })
  .required('Currency is required'),
});

export const StartUpForm = ({ initialValues, onSubmit }: StartUpFormProps) => {
  const navigation = useNavigation();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  const sloganRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);
  const totalInvestmentRef = useRef<TextInput>(null);

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarVisible: false });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      // Handle keyboard dismissal if needed
    });

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [navigation]);

  const handleEditPhoto = (setFieldValue: (field: string, value: any) => void) => {
    Alert.alert(
      'Select Photo',
      'Choose the source:',
      [
        { text: 'Camera', onPress: () => openCamera(setFieldValue) },
        { text: 'Gallery', onPress: () => openGallery(setFieldValue) },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const openCamera = (setFieldValue: (field: string, value: any) => void) => {
    launchCamera({ mediaType: 'photo', quality: 0.7 }, (response) => {
      handleImagePickerResponse(response, setFieldValue);
    });
  };

  const openGallery = (setFieldValue: (field: string, value: any) => void) => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, (response) => {
      handleImagePickerResponse(response, setFieldValue);
    });
  };

  const handleImagePickerResponse = (
    response: any,
    setFieldValue: (field: string, value: any) => void
  ) => {
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
        console.log('Selected photo URI:', photo.uri);
        setIsUploading(true);
        setFieldValue('logo', photo.uri);
        setIsUploading(false);
      }
    }
  };

  const handleFormSubmit = async (
    values: StartUpFormValues,
    { setSubmitting }: FormikHelpers<StartUpFormValues>
  ) => {
    try {
      onSubmit(values);
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
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
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
                <>
                  <View style={styles.avatarContainer}>
                    <Image
                      style={styles.avatarImage}
                      source={
                        values.logo
                          ? { uri: values.logo }
                          : require('../../assets/flat-icons/startup_rocket.png')
                      }
                      resizeMode={values.logo ? 'cover' : 'contain'}
                      onLoadStart={() => setIsImageLoading(true)}
                      onLoadEnd={() => setIsImageLoading(false)}
                      onError={(e) => console.log('Image load error:', e.nativeEvent)}
                      tintColor={values.logo ? undefined : '#FFFFFF'}
                    />
                    {(isUploading || isImageLoading) && (
                      <View style={styles.loadingOverlay}>
                        <ActivityIndicator animating={true} size="large" color="#fff" />
                      </View>
                    )}
                  </View>
                  <TouchableOpacity
                      style={styles.editIconContainer}
                      onPress={() => handleEditPhoto(setFieldValue)}
                      disabled={isUploading}
                    >
                      <IconButton
                        icon={require('../../assets/flat-icons/edit.png')}
                        size={20} // Increased size for better visibility
                        mode="contained"
                        containerColor="#9C27B0"
                        iconColor="#fff"
                      />
                    </TouchableOpacity>
                  <View style={styles.formContainer}>
                    <Text variant="titleSmall" style={styles.title}>
                      Name
                    </Text>
                    <TextInput
                      ref={(ref) => ref}
                      autoCapitalize="words"
                      placeholder="Startup Name"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      style={styles.input}
                      editable={!isSubmitting}
                      returnKeyType="next"
                      onSubmitEditing={() => sloganRef.current?.focus()}
                    />
                    {touched.name && errors.name && (
                      <Text style={styles.errorText}>{errors.name}</Text>
                    )}

                    <Text variant="titleSmall" style={styles.title}>
                      Slogan
                    </Text>
                    <TextInput
                      ref={sloganRef}
                      autoCapitalize="sentences"
                      placeholder="Your Startup Slogan"
                      value={values.slogan}
                      onChangeText={handleChange('slogan')}
                      onBlur={handleBlur('slogan')}
                      style={styles.input}
                      editable={!isSubmitting}
                      returnKeyType="next"
                      onSubmitEditing={() => descriptionRef.current?.focus()}
                    />
                    {touched.slogan && errors.slogan && (
                      <Text style={styles.errorText}>{errors.slogan}</Text>
                    )}

                    <Text variant="titleSmall" style={styles.title}>
                      Description
                    </Text>
                    <TextInput
                      ref={descriptionRef}
                      autoCapitalize="sentences"
                      placeholder="Describe your startup"
                      value={values.description}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      style={styles.textarea}
                      multiline
                      numberOfLines={6}
                      editable={!isSubmitting}
                      returnKeyType="next"
                      onSubmitEditing={() => totalInvestmentRef.current?.focus()}
                    />
                    {touched.description && errors.description && (
                      <Text style={styles.errorText}>{errors.description}</Text>
                    )}

                    <Select<StartupType>
                      apiUrl="/api/startup_types"
                      fieldName="startupType"
                      label="Startup type"
                      labelKey="name"
                      valueKey="id"
                      initialValue={{ label: '', value: 0 }}
                      onValueChange={(item: SelectItem<StartupType> | null) => {
                        if (item) {
                          console.log('Selected:', item.value);
                        }
                      }}
                    />
                    <Select<InvestmentStage>
                      apiUrl="/api/startup_statuses"
                      fieldName="stage"
                      label="Stage"
                      labelKey="name"
                      valueKey="id"
                      initialValue={{ label: '', value: 0 }}
                      onValueChange={(item: SelectItem<InvestmentStage> | null) => {
                        if (item) {
                          console.log('Selected:', item.value);
                        }
                      }}
                    />
                    <Select<FundingRoundType>
                      apiUrl="/api/funding_round_types"
                      fieldName="fundingRoundType"
                      label="Funding type"
                      labelKey="name"
                      valueKey="id"
                      initialValue={{ label: '', value: 0 }}
                      onValueChange={(item: SelectItem<FundingRoundType> | null) => {
                        if (item) {
                          console.log('Selected:', item.value);
                        }
                      }}
                    />

                    <Text variant="titleSmall" style={styles.title}>
                      Total Investment
                    </Text>
                    <TextInput
                      ref={totalInvestmentRef}
                      autoCapitalize="none"
                      placeholder="e.g., $500,000"
                      value={values.totalInvestment.toString()}
                      onChangeText={handleChange('totalInvestment')}
                      onBlur={handleBlur('totalInvestment')}
                      style={styles.input}
                      keyboardType="numeric"
                      editable={!isSubmitting}
                      returnKeyType="done"
                      onSubmitEditing={() => handleSubmit()}
                    />
                    {touched.totalInvestment && errors.totalInvestment && (
                      <Text style={styles.errorText}>{errors.totalInvestment}</Text>
                    )}

                    <Select<CurrencyModel>
                      apiUrl="/local/currencies"
                      fieldName="currency"
                      label="Currency"
                      labelKey="name"
                      valueKey="id"
                      initialValue={{ label: '', value: 0 }}
                      onValueChange={(item: SelectItem<CurrencyModel> | null) => {
                        if (item) {
                          console.log('Selected:', item.value);
                        }
                      }}
                    />

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
                </>
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
    marginHorizontal: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100,
    minHeight: '100%',
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
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  editIconContainer: {
    position: 'absolute',
    top: 100,
    right: 120,
    zIndex: 2,
  },
  formContainer: {
    marginTop: 10,
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
    borderRadius: 12,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    fontSize: 15,
    height: 140,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 8,
    fontSize: 12,
  },
  saveButton: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 8,
  },
});