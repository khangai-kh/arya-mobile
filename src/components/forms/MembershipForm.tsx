// screens/MembershipForm.tsx
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View as RNView, View } from 'react-native';
import { Button, Text, TextInput as PaperTextInput, RadioButton, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { UserModel } from '../../models/users/User';
import { memberValidationSchema } from '../../utils/validation-schemas';

export interface MemberFormValues extends UserModel {
    isInternational?: boolean;
    motivation?: string;
    profileType?: string;
    termsAccepted?: boolean;
  }

export interface MemberFormProps {
  initialValues: MemberFormValues;
  onSubmit: (values: MemberFormValues) => void;
}

export const MembershipForm = ({ initialValues, onSubmit }: MemberFormProps) => {

  const [step, setStep] = useState(1);

  const handleNextStep = (values: MemberFormValues, validateForm: () => Promise<any>) => {
    validateForm().then((errors) => {
      console.log(`Validation errors for Step ${step}:`, errors); // Debug log
      if (step === 1) {
        const step1Fields = ['full_name', 'email', 'linkedin_url', 'date_of_birth', 'address'];
        const hasErrors = step1Fields.some((field) => errors[field]);
        if (!hasErrors) {
          console.log('Step 1 validated successfully, moving to Step 2');
          setStep(2);
        } else {
          console.log('Step 1 validation failed:', errors);
        }
      } else if (step === 2) {
        const step2Fields = [
          'carrier.is_company_owner',
          'carrier.company_name',
          'carrier.industry.name',
          'carrier.sector.name',
          'carrier.title',
          'carrier.area_of_expertise',
        ];
        const hasErrors = step2Fields.some((field) => {
          const [parent, child, grandChild] = field.split('.');
          if (grandChild) {
            return errors[parent]?.[child]?.[grandChild];
          }
          return errors[parent]?.[child];
        });
        if (!hasErrors) {
          console.log('Step 2 validated successfully, moving to Step 3');
          setStep(3);
        } else {
          console.log('Step 2 validation failed:', errors);
        }
      }
    });
  };

  const handlePreviousStep = () => {
    if (step > 1){
        setStep(step - 1);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <RNView style={styles.titleContainer}>
              <Text variant="titleLarge" style={styles.title}>
                Membership Form
              </Text>
              <RNView style={styles.stepIndicator}>
                <Text
                  style={[
                    styles.stepText,
                    step === 1 && styles.activeStep,
                  ]}
                >
                  Personal
                </Text>
                <Text
                  style={[
                    styles.stepText,
                    step === 2 && styles.activeStep,
                  ]}
                >
                  Career
                </Text>
                <Text
                  style={[
                    styles.stepText,
                    step === 3 && styles.activeStep,
                  ]}
                >
                  Additional
                </Text>
              </RNView>
              <Text variant="bodyMedium" style={styles.stepCounter}>
                Step {step} of 3
              </Text>
            </RNView>

            <Formik<MemberFormValues>
              initialValues={initialValues}
              validationSchema={memberValidationSchema}
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
                      <Text variant="titleSmall">Full Name</Text>
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
                      {touched.full_name && errors.full_name && (
                        <Text style={styles.errorText}>{errors.full_name}</Text>
                      )}

                      <Text variant="titleSmall">Email</Text>
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
                      {touched.email && errors.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                      )}

                      <Text variant="titleSmall">LinkedIn URL</Text>
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

                      <Text variant="titleSmall">Date of Birth</Text>
                      <PaperTextInput
                        placeholder="01.01.2000"
                        mode="outlined"
                        value={values.date_of_birth || ''}
                        onChangeText={handleChange('date_of_birth')}
                        onBlur={handleBlur('date_of_birth')}
                        style={styles.input}
                        theme={{ roundness: 40 }}
                        outlineStyle={{ borderWidth: 0 }}
                        error={touched.date_of_birth && !!errors.date_of_birth}
                      />
                      {touched.date_of_birth && errors.date_of_birth && (
                        <Text style={styles.errorText}>{errors.date_of_birth}</Text>
                      )}

                      <Text variant="titleSmall">Address</Text>
                      <PaperTextInput
                        placeholder="Address"
                        mode="outlined"
                        value={values.address || ''}
                        onChangeText={handleChange('address')}
                        onBlur={handleBlur('address')}
                        style={styles.input}
                        theme={{ roundness: 40 }}
                        outlineStyle={{ borderWidth: 0 }}
                        error={touched.address && !!errors.address}
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
                        <View style={styles.radioContainer}>
                          <RadioButton value="yes" />
                          <Text>Yes</Text>
                        </View>
                        <View style={styles.radioContainer}>
                          <RadioButton value="no" />
                          <Text>No</Text>
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

                      <Text variant="titleSmall">Industry</Text>
                      <PaperTextInput
                        placeholder="Software"
                        mode="outlined"
                        value={values.carrier?.industry?.name || ''}
                        onChangeText={(text) =>
                          setFieldValue('carrier.industry.name', text)
                        }
                        onBlur={handleBlur('carrier.industry.name')}
                        style={styles.input}
                        theme={{ roundness: 40 }}
                        outlineStyle={{ borderWidth: 0 }}
                        error={
                          touched.carrier?.industry?.name &&
                          !!errors.carrier?.industry?.name
                        }
                      />
                      {touched.carrier?.industry?.name &&
                        errors.carrier?.industry?.name && (
                          <Text style={styles.errorText}>
                            {errors.carrier.industry.name}
                          </Text>
                        )}

                      <Text variant="titleSmall">Sector</Text>
                      <PaperTextInput
                        placeholder="Sector"
                        mode="outlined"
                        value={values.carrier?.sector?.name || ''}
                        onChangeText={(text) =>
                          setFieldValue('carrier.sector.name', text)
                        }
                        onBlur={handleBlur('carrier.sector.name')}
                        style={styles.input}
                        theme={{ roundness: 40 }}
                        outlineStyle={{ borderWidth: 0 }}
                        error={
                          touched.carrier?.sector?.name &&
                          !!errors.carrier?.sector?.name
                        }
                      />
                      {touched.carrier?.sector?.name &&
                        errors.carrier?.sector?.name && (
                          <Text style={styles.errorText}>
                            {errors.carrier.sector.name}
                          </Text>
                        )}

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
                        error={
                          touched.carrier?.area_of_expertise &&
                          !!errors.carrier?.area_of_expertise
                        }
                      />
                      {touched.carrier?.area_of_expertise &&
                        errors.carrier?.area_of_expertise && (
                          <Text style={styles.errorText}>
                            {errors.carrier.area_of_expertise}
                          </Text>
                        )}
                    </>
                  )}

                  {/* Step 3: Additional */}
                  {step === 3 && (
                    <>
                      <Text variant="titleSmall">
                        Membership introduction paragraph
                      </Text>
                      <Text style={styles.description}>
                        Allow us to introduce the international community such as
                        Google, Nike, and Sony. This is the greatest female
                        community in the world.
                      </Text>

                      <Text variant="titleSmall">
                        Your motivation to be a member of AYS?
                      </Text>
                      <PaperTextInput
                        placeholder="Your motivation"
                        mode="outlined"
                        value={values.motivation}
                        onChangeText={handleChange('motivation')}
                        onBlur={handleBlur('motivation')}
                        style={styles.input}
                        theme={{ roundness: 40 }}
                        outlineStyle={{ borderWidth: 0 }}
                        error={touched.motivation && !!errors.motivation}
                      />
                      {touched.motivation && errors.motivation && (
                        <Text style={styles.errorText}>{errors.motivation}</Text>
                      )}

                      <Text variant="titleSmall">Your profile type</Text>
                      <PaperTextInput
                        placeholder="Entrepreneur"
                        mode="outlined"
                        value={values.profileType}
                        onChangeText={handleChange('profileType')}
                        onBlur={handleBlur('profileType')}
                        style={styles.input}
                        theme={{ roundness: 40 }}
                        outlineStyle={{ borderWidth: 0 }}
                        error={touched.profileType && !!errors.profileType}
                      />
                      {touched.profileType && errors.profileType && (
                        <Text style={styles.errorText}>{errors.profileType}</Text>
                      )}

                      <Text variant="titleSmall">
                        Allow us to introduce the international community?
                      </Text>
                      <RadioButton.Group
                        onValueChange={(value) =>
                          setFieldValue('isInternational', value === 'yes')
                        }
                        value={values.isInternational ? 'yes' : 'no'}
                      >
                        <View style={styles.radioContainer}>
                          <RadioButton value="yes" />
                          <Text>Yes</Text>
                        </View>
                        <View style={styles.radioContainer}>
                          <RadioButton value="no" />
                          <Text>No</Text>
                        </View>
                      </RadioButton.Group>
                      {touched.isInternational && errors.isInternational && (
                        <Text style={styles.errorText}>{errors.isInternational}</Text>
                      )}

                      <View style={styles.termsContainer}>
                        <Checkbox
                          status={values.termsAccepted ? 'checked' : 'unchecked'}
                          onPress={() =>
                            setFieldValue('termsAccepted', !values.termsAccepted)
                          }
                        />
                        <Text variant="titleMedium" style={styles.termsText}>
                          I have read and accept the Membership Agreement
                        </Text>
                      </View>
                      {touched.termsAccepted && errors.termsAccepted && (
                        <Text style={styles.errorText}>{errors.termsAccepted}</Text>
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
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 16,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 8,
  },
  stepText: {
    fontSize: 16,
    color: '#666',
  },
  activeStep: {
    color: '#8B5CF6',
    fontWeight: 'bold',
  },
  stepCounter: {
    textAlign: 'center',
    color: '#666',
  },
  formContainer: {
    marginTop: 32,
  },
  input: {
    borderColor: 'transparent',
    borderWidth: 0,
    backgroundColor: '#fff',
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 20,
    paddingTop: 2,
    padding: 0,
    height: 42,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
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
  termsText: {
    marginLeft: 8,
    flexShrink: 1,
    fontWeight: '500',
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
});

export default MembershipForm;
