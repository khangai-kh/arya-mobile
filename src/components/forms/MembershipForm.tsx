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
} from 'react-native';
import {
  Button,
  Text,
  TextInput as PaperTextInput,
  RadioButton,
  Checkbox,
  useTheme,
  MD3Theme,
} from 'react-native-paper';
import { Formik } from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import DatePicker from 'react-native-date-picker';
import { memberValidationSchema } from '../../utils/validation-schemas';
import { UserModel } from '../../models/users/User';
import { Select, SelectItem } from '../common/Select';
import { Industry, MotivationModel, ProfileModel, Sector } from '../../models/general/models';
import CustomCheckbox from './CustomCheckbox';

export interface MemberFormValues extends UserModel {
    isInternational?: boolean;
    motivation?: string;
    profileType?: string;
    termsAccepted?: boolean;
    membership_paragraph?: string,
  }

export interface MemberFormProps {
  initialValues: MemberFormValues;
  onSubmit: (values: MemberFormValues) => void;
}

export const MembershipForm = ({ initialValues, onSubmit }: MemberFormProps) => {
  const [step, setStep] = useState(2);
  const { colors } = useTheme();
  const dynamicStyles = createDynamicStyles(colors);

  // State for date picker
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleNextStep = (values: MemberFormValues, validateForm: () => Promise<any>) => {
    setStep(3);
    // validateForm().then((errors) => {
    //   console.log(`Validation errors for Step ${step}:`, errors);
    //   if (step === 1) {
    //     const step1Fields = ['full_name', 'email', 'phone', 'linkedin_url', 'date_of_birth', 'address'];
    //     const hasErrors = step1Fields.some((field) => errors[field]);
    //     if (!hasErrors) {
    //       console.log('Step 1 validated successfully, moving to Step 2');
    //       setStep(2);
    //     } else {
    //       console.log('Step 1 validation failed:', errors);
    //     }
    //   } else if (step === 2) {
    //     const step2Fields = [
    //       'carrier.is_company_owner',
    //       'carrier.company_name',
    //       'carrier.industry.name',
    //       'carrier.sector.name',
    //       'carrier.title',
    //       'carrier.area_of_expertise',
    //     ];
    //     const hasErrors = step2Fields.some((field) => {
    //       const [parent, child, grandChild] = field.split('.');
    //       if (grandChild) {
    //         return errors[parent]?.[child]?.[grandChild];
    //       }
    //       return errors[parent]?.[child];
    //     });
    //     if (!hasErrors) {
    //       console.log('Step 2 validated successfully, moving to Step 3');
    //       setStep(3);
    //     } else {
    //       console.log('Step 2 validation failed:', errors);
    //     }
    //   }
    // });
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.container}>
            {/* Step Indicator (removed flex: 1 here to avoid stretching) */}
            <View style={styles.stepIndicatorContainer}>
              <View style={styles.stepIndicator}>
                <Text style={[styles.stepText, step === 1 && dynamicStyles.activeStep]}>
                  Personal
                </Text>
                <Text style={[styles.stepText, step === 2 && dynamicStyles.activeStep]}>
                  Career
                </Text>
                <Text style={[styles.stepText, step === 3 && dynamicStyles.activeStep]}>
                  Additional
                </Text>
              </View>
            </View>

            <Formik<MemberFormValues>
              initialValues={initialValues}
              validationSchema={memberValidationSchema}
              validateOnMount={true}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={(values) => {
                console.log('Form submitted with values:', values);
                onSubmit(values);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
                validateForm,
                isSubmitting,
              }) => (
                <View style={styles.formContainer}>
                  {/* Step 1: Personal */}
                  {step === 1 && (
                    <>
                      <Text variant="titleSmall" style={styles.inputText}>
                        Full Name {touched.full_name && errors.full_name && (
                        <Text style={{ color: 'red' }}> *</Text>
                      )}
                      </Text>
                      <PaperTextInput
                        placeholder="Name Surname"
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
                        Email {touched.email && errors.email && <Text style={{ color: 'red' }}> *</Text>}
                      </Text>
                      <PaperTextInput
                        placeholder="example@example.com"
                        mode="outlined"
                        value={values.email || ''}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        style={styles.input}
                        theme={{ roundness: 40 }}
                        outlineStyle={{ borderWidth: 0 }}
                        error={touched.email && !!errors.email}
                      />

                      {/* Phone Input */}
                      <Text variant="titleSmall" style={styles.inputText}>
                        Phone
                      </Text>
                      <PhoneInput
                        defaultValue={values.phone || ''}
                        defaultCode="TR"
                        layout="first"
                        onChangeFormattedText={(text) => {
                          setFieldValue('phone', text);
                        }}
                        containerStyle={[styles.input, styles.phoneInputContainer]}
                        textContainerStyle={styles.phoneTextContainer}
                        textInputStyle={styles.phoneTextInput}
                        codeTextStyle={styles.phoneCodeText}
                        flagButtonStyle={styles.phoneFlagButton}
                      />
                      {touched.phone && errors.phone && (
                        <Text style={styles.errorText}>{errors.phone}</Text>
                      )}

                      <Text variant="titleSmall" style={styles.inputText}>
                        LinkedIn URL
                      </Text>
                      <PaperTextInput
                        placeholder="linkedin.com/in/..."
                        mode="outlined"
                        value={values.linkedin_url}
                        onChangeText={handleChange('linkedin_url')}
                        onBlur={handleBlur('linkedin_url')}
                        style={styles.input}
                        theme={{ roundness: 40 }}
                        outlineStyle={{ borderWidth: 0 }}
                        error={touched.linkedin_url && !!errors.linkedin_url}
                      />
                      {touched.linkedin_url && errors.linkedin_url && (
                        <Text style={styles.errorText}>{errors.linkedin_url}</Text>
                      )}

                      {/* Date of Birth */}
                      <Text variant="titleSmall" style={styles.inputText}>
                        Date of Birth
                      </Text>
                      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <PaperTextInput
                          placeholder="2000.01.01"
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
                          setFieldValue('date_of_birth', date.toISOString());
                        }}
                        onCancel={() => setShowDatePicker(false)}
                      />
                      {touched.date_of_birth && errors.date_of_birth && (
                        <Text style={styles.errorText}>{errors.date_of_birth}</Text>
                      )}

                      <Text variant="titleSmall" style={styles.inputText}>
                        Address
                      </Text>
                      <PaperTextInput
                        placeholder="Address"
                        mode="outlined"
                        value={values.address || ''}
                        onChangeText={handleChange('address')}
                        onBlur={handleBlur('address')}
                        style={[styles.input, styles.textarea]}
                        theme={{ roundness: 20 }}
                        outlineStyle={{ borderWidth: 0 }}
                        error={touched.address && !!errors.address}
                        multiline
                        numberOfLines={4}
                      />
                      {touched.address && errors.address && (
                        <Text style={styles.errorText}>{errors.address}</Text>
                      )}
                    </>
                  )}

                  {/* Step 2: Career */}
                  {step === 2 && (
                    <>
                      <Text variant="titleSmall">Are you a company owner?</Text>
                      <RadioButton.Group
                        onValueChange={(value) =>
                          setFieldValue('carrier.is_company_owner', value === 'yes')
                        }
                        value={values.carrier?.is_company_owner ? 'yes' : 'no'}
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

                      {values.carrier?.is_company_owner && (
                        <>
                          <Text variant="titleSmall">Name of your company</Text>
                          <PaperTextInput
                            placeholder="Company Name"
                            mode="outlined"
                            value={values.carrier?.company_name || ''}
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
                        initialValue={{ label: values.sector?.sector_name || '', value: values.sector?.sector_id ?? '' }}
                        onValueChange={(item: SelectItem<Industry> | null) => {
                          if (item) {
                            console.log('Selected:', item.value);
                          }
                        }}
                      />

                      <Select<Sector>
                        apiUrl="/api/sectors"
                        fieldName="sector"
                        label="Sector"
                        labelKey="sector_name"
                        valueKey="sector_id"
                        initialValue={{ label: values.sector?.sector_name || '', value: values.sector?.sector_id ?? '' }}
                        onValueChange={(item: SelectItem<Sector> | null) => {
                          if (item) {
                            console.log('Selected:', item.value);
                          }
                        }}
                      />

                      <Text variant="titleSmall">Title</Text>
                      <PaperTextInput
                        placeholder="Academician"
                        mode="outlined"
                        value={values.carrier?.title || ''}
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
                        value={values.carrier?.area_of_expertise || ''}
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
                    </>
                  )}

                  {/* Step 3: Additional */}
                  {step === 3 && (
                    <>
                      <Text variant="titleSmall" style={styles.inputText}>
                        Membership introduction paragraph
                      </Text>
                      <PaperTextInput
                        placeholder="Introduce yourself"
                        mode="outlined"
                        value={values.membership_paragraph || ''}
                        onChangeText={handleChange('membership_paragraph')}
                        onBlur={handleBlur('membership_paragraph')}
                        style={[styles.input, styles.textarea]}
                        theme={{ roundness: 20 }}
                        outlineStyle={{ borderWidth: 0 }}
                        error={touched.address && !!errors.address}
                        multiline
                        numberOfLines={6}
                      />
                      {touched.membership_paragraph && errors.membership_paragraph && (
                        <Text style={styles.errorText}>{errors.membership_paragraph}</Text>
                      )}

                      <Select<MotivationModel>
                        apiUrl="/api/motivations"
                        fieldName="motivation"
                        label=" Your motivation to be a member of AYS?"
                        labelKey="name"
                        valueKey="id"
                        initialValue={{ label: values.sector?.sector_name || '', value: values.sector?.sector_id ?? '' }}
                        onValueChange={(item: SelectItem<MotivationModel> | null) => {
                          if (item) {
                            console.log('Selected:', item.value);
                          }
                        }}
                      />
                      <Select<ProfileModel>
                          apiUrl="/local/profiles"
                          fieldName="profile"
                          label="Your profile type"
                          labelKey="name"
                          valueKey="id"
                          initialValue={{ label: '', value: 0 }}
                          onValueChange={(item: SelectItem<ProfileModel> | null) => {
                            if (item) {
                              console.log('Selected:', item.value);
                            }
                          }}
                        />

                    <View style={styles.termsContainer}>
                        <CustomCheckbox
                          checked={values.termsAccepted ?? false}
                          onToggle={() => setFieldValue('termsAccepted', !values.termsAccepted)}
                        />
                        <Text variant="titleMedium" style={styles.termsText}>
                        I have read and accept the <Text
                            variant="titleMedium"
                            style={styles.termsLink}
                            onPress={() => navigation.navigate('DisclosureText')}
                          >
                           Membership Agreement
                          </Text> clarification text.
                        </Text>
                    </View>
                    {touched.termsAccepted && errors.termsAccepted && (
                      <Text style={styles.errorText}>{errors.termsAccepted}</Text>
                    )}
                    <View style={styles.termsContainer}>
                        <CustomCheckbox
                          checked={values.isInternational ?? false}
                          onToggle={() => setFieldValue('isInternational', !values.isInternational)}
                        />
                        <Text variant="titleMedium" style={styles.termsText}>
                          I have read and understood the <Text
                            variant="titleMedium"
                            style={styles.termsLink}
                            onPress={() => navigation.navigate('DisclosureText')}
                          >
                             Arya Challenge Club Confidentiality Agreement
                          </Text>. I declare that I accept the terms and conditions of the Privacy Agreement.
                        </Text>
                    </View>
                    {touched.isInternational && errors.isInternational && (
                      <Text style={styles.errorText}>{errors.isInternational}</Text>
                    )}
                    </>
                  )}

                  {/* Navigation Buttons */}
                  <View style={styles.buttonContainer}>
                    {step > 1 && (
                      <Button
                        mode="outlined"
                        style={styles.navButton}
                        onPress={handlePreviousStep}
                      >
                        Previous
                      </Button>
                    )}
                    {step < 3 ? (
                      <Button
                        mode="contained"
                        style={styles.navButton}
                        onPress={() => handleNextStep(values, validateForm)}
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button
                        mode="contained"
                        style={styles.navButton}
                        onPress={() => handleSubmit()}
                        loading={isSubmitting}
                      >
                        Submit
                      </Button>
                    )}
                  </View>
                </View>
              )}
            </Formik>
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
  flexContainer: {
    flex:1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  container: {
    // Removed flex: 1 here so the container wraps its content
  },
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
    fontSize:14,
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
    justifyContent: 'flex-start', // Optional: adjusts spacing
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Assumed existing style
    marginHorizontal:10,
    marginVertical:10,
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
    fontSize:14,
  },
});

export default MembershipForm;
