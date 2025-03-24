// screens/MembershipForm.tsx
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  Button,
  Text,
  TextInput as PaperTextInput,
  RadioButton,
  useTheme,
  MD3Theme,
} from 'react-native-paper';
import { Formik } from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import DatePicker from 'react-native-date-picker';
import * as Yup from 'yup';
import { UserModel } from '../../models/users/User';
import { Select, SelectItem } from '../common/Select';
import { Industry, MotivationModel, ProfileModel, Sector } from '../../models/general/models';
import CustomCheckbox from './CustomCheckbox';
import { API } from '../../plugins/axios';

// Step 1 Form Values
interface Step1FormValues {
  full_name: string;
  email: string;
  phone: string;
  linkedin_url: string;
  date_of_birth: string;
  address: string;
}

// Step 2 Form Values
interface Step2FormValues {
  carrier: {
    is_company_owner: boolean;
    company_name?: string;
    title: string;
    area_of_expertise: string;
  };
  industry?: { label: string; value: string };
  sector?: { label: string; value: string };
}

// Step 3 Form Values
interface Step3FormValues {
  membership_paragraph: string;
  motivation?: { label: string; value: string };
  profile?: { label: string; value: number };
  termsAccepted: boolean;
  isInternational: boolean;
}

// Combined Form Values for final submission
export interface MemberFormValues extends UserModel {
  isInternational?: boolean;
  motivation?: string;
  profileType?: string;
  termsAccepted?: boolean;
  membership_paragraph?: string;
}

export interface MemberFormProps {
  initialValues: MemberFormValues;
  onSubmit: (values: MemberFormValues) => void;
}

// Validation Schemas
const step1ValidationSchema = Yup.object().shape({
  full_name: Yup.string().required('*'),
  email: Yup.string().email('Invalid email').required('*'),
  phone: Yup.string().required('*'),
  linkedin_url: Yup.string().url('Invalid URL').required('*'),
  date_of_birth: Yup.string()
    .required('*')
    .test('is-valid-date', 'Invalid date', (value) => {
      if (!value) return false;
      const date = new Date(value);
      return !isNaN(date.getTime()) && date < new Date();
    }),
  address: Yup.string().required('*'),
});

const step2ValidationSchema = Yup.object().shape({
  carrier: Yup.object().shape({
    is_company_owner: Yup.boolean().required('This field is required'),
    company_name: Yup.string().when('is_company_owner', (isCompanyOwner, schema) =>
      isCompanyOwner ? schema.required('Company name is required') : schema.notRequired()
    ),
    title: Yup.string().required('Title is required'),
    area_of_expertise: Yup.string().required('Area of expertise is required'),
  }),
});

const step3ValidationSchema = Yup.object().shape({
  membership_paragraph: Yup.string().required('Introduction is required'),
  termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms'),
  isInternational: Yup.boolean().oneOf([true], 'You must accept the confidentiality agreement'),
});

export const MembershipForm = ({ initialValues, onSubmit }: MemberFormProps) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<MemberFormValues>(initialValues);
  const { colors } = useTheme();
  const dynamicStyles = createDynamicStyles(colors);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleStepSubmit = async (values: any, actions: any, nextStep?: number) => {
    try {
      console.log(`Submitting Step ${step} values:`, values);
      if(step === 1){
           setIsLoading(true);
              await API.put('/api/user-my-personal-information', {
                full_name: values.full_name,
                email: values.email,
                phone: values.phone,
                linkedin_url: values.linkedin_url,
                date_of_birth: values.date_of_birth,
                address: values.address,
              });

      }
      setFormData((prev) => ({ ...prev, ...values }));
      setCompletedSteps([...completedSteps, step]);
      if (nextStep) {
        setStep(nextStep);
      } else {
        onSubmit({ ...formData, ...values });
      }
      actions.setSubmitting(false);
    } catch (error) {
      console.error('Submission error:', error);
      actions.setSubmitting(false);
    }
  };

  if (isLoading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

  return (
    <KeyboardAvoidingView
      style={styles.flexContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.stepIndicatorContainer}>
            <View style={styles.stepIndicator}>
              <Text
                style={[
                  styles.stepText,
                  (step === 1 || completedSteps.includes(1)) && dynamicStyles.activeStep,
                ]}
              >
                Personal
              </Text>
              <Text
                style={[
                  styles.stepText,
                  (step === 2 || completedSteps.includes(2)) && dynamicStyles.activeStep,
                ]}
              >
                Career
              </Text>
              <Text
                style={[
                  styles.stepText,
                  (step === 3 || completedSteps.includes(3)) && dynamicStyles.activeStep,
                ]}
              >
                Additional
              </Text>
            </View>
          </View>

          {/* Step 1 Form */}
          {step === 1 && (
            <Formik<Step1FormValues>
              initialValues={{
                full_name: initialValues.full_name || '',
                email: initialValues.email || '',
                phone: initialValues.phone || '',
                linkedin_url: initialValues.linkedin_url || '',
                date_of_birth: initialValues.date_of_birth || '',
                address: initialValues.address || '',
              }}
              validationSchema={step1ValidationSchema}
              onSubmit={(values, actions) => handleStepSubmit(values, actions, 2)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
                isSubmitting,
              }) => (
                <View style={styles.formContainer}>
                  <Text variant="titleSmall" style={styles.inputText}>
                    Full Name{' '}
                    {touched.full_name && errors.full_name && (
                      <Text style={styles.validation}>{errors.full_name}</Text>
                    )}
                  </Text>
                  <PaperTextInput
                    placeholder="Name Surname"
                    placeholderTextColor={'grey'}
                    mode="outlined"
                    value={values.full_name}
                    onChangeText={handleChange('full_name')}
                    onBlur={handleBlur('full_name')}
                    style={styles.input}
                    theme={{ roundness: 40 }}
                    outlineStyle={{ borderWidth: 0 }}
                    error={touched.full_name && !!errors.full_name}
                  />
                  <Text variant="titleSmall" style={styles.inputText}>
                    Email{' '}
                    {touched.email && errors.email && (
                      <Text style={styles.validation}>{errors.email}</Text>
                    )}
                  </Text>
                  <PaperTextInput
                    placeholder="example@example.com"
                    placeholderTextColor={'grey'}
                    mode="outlined"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    style={styles.input}
                    theme={{ roundness: 40 }}
                    outlineStyle={{ borderWidth: 0 }}
                    error={touched.email && !!errors.email}
                  />
                  <Text variant="titleSmall" style={styles.inputText}>
                    Phone{' '}
                    {touched.phone && errors.phone && (
                      <Text style={styles.validation}>{errors.phone}</Text>
                    )}
                  </Text>
                  <PhoneInput
                    defaultValue={values.phone}
                    placeholder='### ### ## ##'
                    defaultCode="TR"
                    layout="first"
                    onChangeFormattedText={(text) => setFieldValue('phone', text)}
                    containerStyle={[styles.input, styles.phoneInputContainer]}
                    textContainerStyle={styles.phoneTextContainer}
                    textInputStyle={styles.phoneTextInput}
                    codeTextStyle={styles.phoneCodeText}
                    flagButtonStyle={styles.phoneFlagButton}
                  />
                  
                  <Text variant="titleSmall" style={styles.inputText}>
                    LinkedIn URL{' '}
                    {touched.linkedin_url && errors.linkedin_url && (
                      <Text style={styles.validation}>{errors.linkedin_url}</Text>
                    )}
                  </Text>
                  <PaperTextInput
                    placeholder="linkedin.com/in/..."
                    placeholderTextColor={'grey'}
                    mode="outlined"
                    value={values.linkedin_url}
                    onChangeText={handleChange('linkedin_url')}
                    onBlur={handleBlur('linkedin_url')}
                    style={styles.input}
                    theme={{ roundness: 40 }}
                    outlineStyle={{ borderWidth: 0 }}
                    error={touched.linkedin_url && !!errors.linkedin_url}
                  />
                  <Text variant="titleSmall" style={styles.inputText}>
                    Date of Birth{' '}
                    {touched.date_of_birth && errors.date_of_birth && (
                      <Text style={styles.validation}>{errors.date_of_birth}</Text>
                    )}
                  </Text>
                  <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <PaperTextInput
                      placeholder="YYYY.MM.DD"
                      placeholderTextColor={'grey'}
                      mode="outlined"
                      value={
                        values.date_of_birth
                          ? new Date(values.date_of_birth)
                              .toLocaleDateString('en-GB', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                              })
                              .split('/')
                              .reverse()
                              .join('.')
                          : ''
                      }
                      style={styles.input}
                      theme={{ roundness: 40 }}
                      outlineStyle={{ borderWidth: 0 }}
                      error={touched.date_of_birth && !!errors.date_of_birth}
                      editable={false}
                      right={
                        <PaperTextInput.Icon
                          icon={() => (
                            <Image
                              source={require('../../assets/flat-icons/calendar-outlined.png')}
                              style={styles.iconStyle}
                            />
                          )}
                          onPress={() => setShowDatePicker(true)}
                        />
                      }
                    />
                  </TouchableOpacity>
                  <DatePicker
                    modal
                    open={showDatePicker}
                    date={values.date_of_birth ? new Date(values.date_of_birth) : new Date()}
                    mode="date"
                    maximumDate={new Date()}
                    onConfirm={(date) => {
                      setShowDatePicker(false);
                      setFieldValue('date_of_birth', date.toISOString().split('T')[0]);
                    }}
                    onCancel={() => setShowDatePicker(false)}
                  />
                  <Text variant="titleSmall" style={styles.inputText}>
                    Address{' '}
                    {touched.address && errors.address && (
                      <Text style={styles.validation}>{errors.address}</Text>
                    )}
                  </Text>
                  <PaperTextInput
                    placeholder="Please enter your address"
                    placeholderTextColor={'grey'}
                    mode="outlined"
                    value={values.address}
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    style={[styles.input, styles.textarea]}
                    theme={{ roundness: 20 }}
                    outlineStyle={{ borderWidth: 0 }}
                    error={touched.address && !!errors.address}
                    multiline
                    numberOfLines={4}
                  />
                  <View style={styles.buttonContainer}>
                    <Button
                      mode="contained"
                      style={styles.navButton}
                      onPress={() => handleSubmit()}
                      loading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      Continue
                    </Button>
                  </View>
                </View>
              )}
            </Formik>
          )}

          {/* Step 2 Form */}
          {step === 2 && (
            <Formik<Step2FormValues>
              initialValues={{
                carrier: {
                  is_company_owner: initialValues.carrier?.is_company_owner || false,
                  company_name: initialValues.carrier?.company_name || '',
                  title: initialValues.carrier?.title || '',
                  area_of_expertise: initialValues.carrier?.area_of_expertise || '',
                },
                industry: { label: initialValues.sector?.sector_name || '', value: initialValues.sector?.sector_id || '' },
                sector: { label: initialValues.sector?.sector_name || '', value: initialValues.sector?.sector_id || '' },
              }}
              validationSchema={step2ValidationSchema}
              onSubmit={(values, actions) => handleStepSubmit(values, actions, 3)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
                isSubmitting,
              }) => (
                <View style={styles.formContainer}>
                  <Text variant="titleSmall">Are you a company owner?</Text>
                  <RadioButton.Group
                    onValueChange={(value) =>
                      setFieldValue('carrier.is_company_owner', value === 'yes')
                    }
                    value={values.carrier.is_company_owner ? 'yes' : 'no'}
                  >
                    <View style={styles.radioGroupContainer}>
                      <View style={styles.radioContainer}>
                        <RadioButton value="yes" />
                        <Text>Yes</Text>
                      </View>
                      <View style={styles.radioContainer}>
                        <RadioButton value="no" />
                        <Text>No</Text>
                      </View>
                    </View>
                  </RadioButton.Group>
                  {touched.carrier?.is_company_owner && errors.carrier?.is_company_owner && (
                    <Text style={styles.errorText}>{errors.carrier.is_company_owner}</Text>
                  )}

                  {values.carrier.is_company_owner && (
                    <>
                      <Text variant="titleSmall">Name of your company</Text>
                      <PaperTextInput
                        placeholder="Company Name"
                        mode="outlined"
                        value={values.carrier.company_name}
                        onChangeText={handleChange('carrier.company_name')}
                        onBlur={handleBlur('carrier.company_name')}
                        style={styles.input}
                        theme={{ roundness: 40 }}
                        outlineStyle={{ borderWidth: 0 }}
                        error={touched.carrier?.company_name && !!errors.carrier?.company_name}
                      />
                      {touched.carrier?.company_name && errors.carrier?.company_name && (
                        <Text style={styles.errorText}>{errors.carrier.company_name}</Text>
                      )}
                    </>
                  )}

                  <Select<Industry>
                    apiUrl="/api/industries"
                    fieldName="industry"
                    label="Industry"
                    labelKey="industries_name"
                    valueKey="industries_id"
                    initialValue={values.industry}
                    onValueChange={(item: SelectItem<Industry> | null) => setFieldValue('industry', item)}
                  />

                  <Select<Sector>
                    apiUrl="/api/sectors"
                    fieldName="sector"
                    label="Sector"
                    labelKey="sector_name"
                    valueKey="sector_id"
                    initialValue={values.sector}
                    onValueChange={(item: SelectItem<Sector> | null) => setFieldValue('sector', item)}
                  />

                  <Text variant="titleSmall">Title</Text>
                  <PaperTextInput
                    placeholder="Academician"
                    mode="outlined"
                    value={values.carrier.title}
                    onChangeText={handleChange('carrier.title')}
                    onBlur={handleBlur('carrier.title')}
                    style={styles.input}
                    theme={{ roundness: 40 }}
                    outlineStyle={{ borderWidth: 0 }}
                    error={touched.carrier?.title && !!errors.carrier?.title}
                  />
                  {touched.carrier?.title && errors.carrier?.title && (
                    <Text style={styles.errorText}>{errors.carrier.title}</Text>
                  )}

                  <Text variant="titleSmall">Area of Expertise</Text>
                  <PaperTextInput
                    placeholder="Marketing - HR"
                    mode="outlined"
                    value={values.carrier.area_of_expertise}
                    onChangeText={handleChange('carrier.area_of_expertise')}
                    onBlur={handleBlur('carrier.area_of_expertise')}
                    style={styles.input}
                    theme={{ roundness: 40 }}
                    outlineStyle={{ borderWidth: 0 }}
                    error={touched.carrier?.area_of_expertise && !!errors.carrier?.area_of_expertise}
                  />
                  {touched.carrier?.area_of_expertise && errors.carrier?.area_of_expertise && (
                    <Text style={styles.errorText}>{errors.carrier.area_of_expertise}</Text>
                  )}

                  <View style={styles.buttonContainer}>
                    <Button
                      mode="outlined"
                      style={styles.navButton}
                      onPress={handlePreviousStep}
                    >
                      Previous
                    </Button>
                    <Button
                      mode="contained"
                      style={styles.navButton}
                      onPress={() => handleSubmit()}
                      loading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      Continue
                    </Button>
                  </View>
                </View>
              )}
            </Formik>
          )}

          {/* Step 3 Form */}
          {step === 3 && (
            <Formik<Step3FormValues>
              initialValues={{
                membership_paragraph: initialValues.membership_paragraph || '',
                motivation: { label: initialValues.sector?.sector_name || '', value: initialValues.sector?.sector_id || '' },
                profile: { label: '', value: 0 },
                termsAccepted: initialValues.termsAccepted || false,
                isInternational: initialValues.isInternational || false,
              }}
              validationSchema={step3ValidationSchema}
              onSubmit={(values, actions) => handleStepSubmit(values, actions)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
                isSubmitting,
              }) => (
                <View style={styles.formContainer}>
                  <Text variant="titleSmall" style={styles.inputText}>
                    Membership introduction paragraph
                  </Text>
                  <PaperTextInput
                    placeholder="Introduce yourself"
                    mode="outlined"
                    value={values.membership_paragraph}
                    onChangeText={handleChange('membership_paragraph')}
                    onBlur={handleBlur('membership_paragraph')}
                    style={[styles.input, styles.textarea]}
                    theme={{ roundness: 20 }}
                    outlineStyle={{ borderWidth: 0 }}
                    error={touched.membership_paragraph && !!errors.membership_paragraph}
                    multiline
                    numberOfLines={6}
                  />
                  {touched.membership_paragraph && errors.membership_paragraph && (
                    <Text style={styles.errorText}>{errors.membership_paragraph}</Text>
                  )}

                  <Select<MotivationModel>
                    apiUrl="/api/motivations"
                    fieldName="motivation"
                    label="Your motivation to be a member of AYS?"
                    labelKey="name"
                    valueKey="id"
                    initialValue={values.motivation}
                    onValueChange={(item: SelectItem<MotivationModel> | null) =>
                      setFieldValue('motivation', item)
                    }
                  />

                  <Select<ProfileModel>
                    apiUrl="/local/profiles"
                    fieldName="profile"
                    label="Your profile type"
                    labelKey="name"
                    valueKey="id"
                    initialValue={values.profile}
                    onValueChange={(item: SelectItem<ProfileModel> | null) =>
                      setFieldValue('profile', item)
                    }
                  />

                  <View style={styles.termsContainer}>
                    <CustomCheckbox
                      checked={values.termsAccepted}
                      onToggle={() => setFieldValue('termsAccepted', !values.termsAccepted)}
                    />
                    <Text variant="titleMedium" style={styles.termsText}>
                      I have read and accept the{' '}
                      <Text
                        variant="titleMedium"
                        style={styles.termsLink}
                        // Assuming navigation is available; adjust as needed
                        onPress={() => console.log('Navigate to DisclosureText')}
                      >
                        Membership Agreement
                      </Text>{' '}
                      clarification text.
                    </Text>
                  </View>
                  {touched.termsAccepted && errors.termsAccepted && (
                    <Text style={styles.errorText}>{errors.termsAccepted}</Text>
                  )}

                  <View style={styles.termsContainer}>
                    <CustomCheckbox
                      checked={values.isInternational}
                      onToggle={() => setFieldValue('isInternational', !values.isInternational)}
                    />
                    <Text variant="titleMedium" style={styles.termsText}>
                      I have read and understood the{' '}
                      <Text
                        variant="titleMedium"
                        style={styles.termsLink}
                        onPress={() => console.log('Navigate to DisclosureText')}
                      >
                        Arya Challenge Club Confidentiality Agreement
                      </Text>
                      . I declare that I accept the terms and conditions of the Privacy Agreement.
                    </Text>
                  </View>
                  {touched.isInternational && errors.isInternational && (
                    <Text style={styles.errorText}>{errors.isInternational}</Text>
                  )}

                  <View style={styles.buttonContainer}>
                    <Button
                      mode="outlined"
                      style={styles.navButton}
                      onPress={handlePreviousStep}
                    >
                      Previous
                    </Button>
                    <Button
                      mode="contained"
                      style={styles.navButton}
                      onPress={() => handleSubmit()}
                      loading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </View>
                </View>
              )}
            </Formik>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const createDynamicStyles = (colors: MD3Theme['colors']) =>
  StyleSheet.create({
    appbarHeader: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
    },
    appbarActionRight: {
      backgroundColor: colors.onPrimary,
      marginRight: 5,
      position: 'absolute',
      left: 5,
      top: '50%',
      transform: [{ translateY: -25 }],
    },
    appbarTitleContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeStep: {
      color: colors.primary,
      fontWeight: 'bold',
      borderBottomWidth: 4,
      borderBottomColor: colors.primary,
    },
  });

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  container: {},
  stepIndicatorContainer: {
    marginVertical: 16,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  formContainer: {
    marginTop: 15,
  },
  input: {
    backgroundColor: '#fff',
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 10,
    height: 42,
    fontSize: 14,
  },
  inputText: {
    marginTop: 5,
    marginHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  radioGroupContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  textarea: {
    height: 150,
    textAlignVertical: 'top',
  },
  description: {
    marginTop: 8,
    marginBottom: 16,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  phoneInputContainer: {
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 12,
    marginBottom: 8,
    height: 42,
    borderRadius: 40,
  },
  phoneTextContainer: {
    backgroundColor: '#fff',
    borderRadius: 40,
    paddingVertical: 0,
  },
  phoneTextInput: {
    fontSize: 14,
  },
  phoneCodeText: {
    fontSize: 14,
  },
  phoneFlagButton: {},
  iconStyle: {
    width: 24,
    height: 24,
    tintColor: '#666',
  },
  termsText: {
    marginLeft: 8,
    flexShrink: 1,
    fontWeight: '500',
    fontSize: 14,
  },
  termsLink: {
    color: '#00AEEF',
    fontWeight: '500',
    fontSize: 14,
  },
  validation: {
    color: 'red',
    fontSize: 12,
  },
});

export default MembershipForm;