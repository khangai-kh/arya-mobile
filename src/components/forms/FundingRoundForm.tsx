import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Image,
 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, IconButton, TextInput as PaperTextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-native-date-picker';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { AlertNotificationRoot } from 'react-native-alert-notification';

export interface FundingRoundFormValues {
  targetAmount: string;
  minimumInvestmentAmount: string;
  fundingDeadline: string;
  useOfFunds: string;
  pitchDeck: DocumentPickerResponse[];
  investmentTerms: string;
  currentValuation: string;
}

export interface FundingRoundFormProps {
  initialValues?: Partial<FundingRoundFormValues>;
  onSubmit: (values: FundingRoundFormValues) => void;
  onCancel?: () => void;
}

const validationSchema = Yup.object().shape({
  targetAmount: Yup.string().required('Required'),
  minimumInvestmentAmount: Yup.string().required('Required'),
  fundingDeadline: Yup.date().required('Required'),
  useOfFunds: Yup.string().required('Required'),
  pitchDeck: Yup.array()
    .min(1, 'Please upload at least one file')
    .required('Required'),
  investmentTerms: Yup.string().required('Required'),
  currentValuation: Yup.string().required('Required'),
});

export const FundingRoundForm: React.FC<FundingRoundFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const pickDocuments = async (
    values: FundingRoundFormValues,
    setFieldValue: (field: string, value: any) => void
  ) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        allowMultiSelection: true,
      });
      setFieldValue('pitchDeck', [...(values.pitchDeck || []), ...res]);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.warn(err);
      }
    }
  };

  return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
              {/* Form */}
              <Formik<FundingRoundFormValues>
                initialValues={{
                  targetAmount: '100',
                  minimumInvestmentAmount: '100',
                  fundingDeadline: '',
                  useOfFunds: '100',
                  pitchDeck: [],
                  investmentTerms: '100',
                  currentValuation: '100',
                  ...initialValues,
                }}
                validateOnMount
                validationSchema={validationSchema}
                onSubmit={(vals) => onSubmit(vals)}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  isSubmitting,
                  isValid,
                  setFieldValue,
                }) => (
                  <View style={styles.form}>
                    {/* Target amount */}
                    <Text style={styles.label}>Target amount</Text>
                    <PaperTextInput
                      placeholder="e.g. 500,000 $"
                      placeholderTextColor={'grey'}
                      mode="outlined"
                      keyboardType="numeric"
                      value={values.targetAmount}
                      onChangeText={handleChange('targetAmount')}
                      onBlur={handleBlur('targetAmount')}
                      style={styles.input}
                      theme={{ roundness: 40 }}
                      outlineStyle={styles.paperTextInput}
                      error={touched.targetAmount && !!errors.targetAmount}
                    />
                    {touched.targetAmount && errors.targetAmount && (
                      <Text style={styles.error}>{errors.targetAmount}</Text>
                    )}

                    {/* Minimum investment */}
                    <Text style={styles.label}>Minimum investment amount</Text>
                    <PaperTextInput
                      style={styles.input}
                      mode="outlined"
                      placeholder="e.g. 10,000 $"
                      keyboardType="numeric"
                      value={values.minimumInvestmentAmount}
                      onChangeText={handleChange('minimumInvestmentAmount')}
                      onBlur={handleBlur('minimumInvestmentAmount')}
                      theme={{ roundness: 40 }}
                      outlineStyle={styles.paperTextInput}
                      error={touched.targetAmount && !!errors.targetAmount}
                    />
                    {touched.minimumInvestmentAmount && errors.minimumInvestmentAmount && (
                      <Text style={styles.error}>{errors.minimumInvestmentAmount}</Text>
                    )}

                    {/* Funding deadline */}
                    <Text style={styles.label}>Funding deadline</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                          <PaperTextInput
                              placeholder="YYYY.MM.DD"
                              placeholderTextColor={'grey'}
                              mode="outlined"
                              value={
                                  values.fundingDeadline
                                  ? new Date(values.fundingDeadline)
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
                              outlineStyle={styles.paperTextInput}
                              error={touched.fundingDeadline && !!errors.fundingDeadline}
                              editable={false}
                              right={
                                  <PaperTextInput.Icon
                                  // eslint-disable-next-line react/no-unstable-nested-components
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
                        date={values.fundingDeadline ? new Date(values.fundingDeadline) : new Date()}
                        mode="date"
                        maximumDate={new Date()}
                        onConfirm={(date) => {
                        setShowDatePicker(false);
                        setFieldValue('fundingDeadline', date.toISOString().split('T')[0]);
                        }}
                        onCancel={() => setShowDatePicker(false)}
                    />
                    {touched.fundingDeadline && errors.fundingDeadline && (
                      <Text style={styles.error}>{(errors.fundingDeadline as any)}</Text>
                    )}

                    {/* Use of funds */}
                    <Text style={styles.label}>Use of funds</Text>
                    <PaperTextInput
                      placeholder="Breakdown (e.g. 40% product dev…)"
                      multiline
                      mode="outlined"
                      numberOfLines={4}
                      value={values.useOfFunds}
                      style={[styles.input, styles.textarea]}
                      theme={{ roundness: 20 }}
                      outlineStyle={styles.paperTextInput}
                      error={touched.useOfFunds && !!errors.useOfFunds}
                      onChangeText={handleChange('useOfFunds')}
                      onBlur={handleBlur('useOfFunds')}
                    />
                    {touched.useOfFunds && errors.useOfFunds && (
                      <Text style={styles.error}>{errors.useOfFunds}</Text>
                    )}

                    {/* Pitch deck upload */}
                    <Text style={styles.label}>Pitch deck</Text>
                    <TouchableOpacity
                      style={styles.uploadBox}
                      onPress={() => pickDocuments(values, setFieldValue)}
                    >
                      <IconButton icon={require('../../assets/flat-icons/upload.png')} size={24} />
                      <Text style={styles.uploadText}>
                        Click here to upload your pdf document
                      </Text>
                    </TouchableOpacity>
                    {touched.pitchDeck && errors.pitchDeck && (
                      <Text style={styles.error}>{(errors.pitchDeck as any)}</Text>
                    )}
                    {values.pitchDeck.map((file, i) => (
                      <View key={i} style={styles.fileRow}>
                        <IconButton
                          style ={styles.iconStyleDocument}
                          icon={require('../../assets/flat-icons/document.png')}
                          size={20} />
                        <Text numberOfLines={1} style={styles.fileName}>
                          {file.name}
                        </Text>
                        <IconButton
                          icon={require('../../assets/flat-icons/trash_can.png')}
                          style ={styles.iconStyle}
                          size={20}
                          onPress={() =>
                            setFieldValue(
                              'pitchDeck',
                              values.pitchDeck.filter((_, idx) => idx !== i)
                            )
                          }
                        />
                      </View>
                    ))}

                    {/* Investment terms */}
                    <Text style={styles.label}>Investment terms</Text>
                    <PaperTextInput
                      style={[styles.input, styles.textarea]}
                      theme={{ roundness: 20 }}
                      outlineStyle={styles.paperTextInput}
                      error={touched.useOfFunds && !!errors.useOfFunds}
                      placeholder="Equity offered, discounts, maturity, etc."
                      multiline
                      mode="outlined"
                      numberOfLines={3}
                      value={values.investmentTerms}
                      onChangeText={handleChange('investmentTerms')}
                      onBlur={handleBlur('investmentTerms')}
                    />
                    {touched.investmentTerms && errors.investmentTerms && (
                      <Text style={styles.error}>{errors.investmentTerms}</Text>
                    )}

                    {/* Current valuation */}
                    <Text style={styles.label}>Current valuation</Text>
                    <PaperTextInput
                      style={styles.input}
                      mode="outlined"
                      placeholder="e.g. 3,000,000 $"
                      keyboardType="numeric"
                      theme={{ roundness: 40 }}
                      outlineStyle={styles.paperTextInput}
                      error={touched.targetAmount && !!errors.targetAmount}
                      value={values.currentValuation}
                      onChangeText={handleChange('currentValuation')}
                      onBlur={handleBlur('currentValuation')}
                    />
                    {touched.currentValuation && errors.currentValuation && (
                      <Text style={styles.error}>{errors.currentValuation}</Text>
                    )}

                    {/* Submit */}
                    <Button
                      mode="contained"
                      onPress={() => handleSubmit()}
                      loading={isSubmitting}
                      disabled={isSubmitting || !isValid}
                    >
                      Start
                    </Button>
                  </View>
                )}
              </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f0f0' },
  iconStyle: {
    width: 24,
    height: 24,
    tintColor: '#666',
  },
  iconStyleDocument: {
    width: 24,
    height: 24,
    color: 'green',
  },
  paperTextInput:{
    borderWidth: 0,
  },
  flex: { flex: 1, paddingHorizontal: 16 },
  scrollContent: { paddingVertical: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  closeButton: { margin: 0 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '600' },
  form: { marginTop: 4 },
  label: { fontSize: 14, fontWeight: 'bold', marginTop: 12 },
  input: {
    backgroundColor: '#fff',
    marginTop: 12,
    marginBottom: 8,
    height: 42,
    fontSize: 14,
  },
  textarea: {
    height: 150,
    textAlignVertical: 'top',
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  dateText: { flex: 1, paddingVertical: 8 },
  uploadBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 16,
    marginTop: 4,
  },
  uploadText: { flex: 1, fontSize: 14 },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  fileName: { flex: 1, fontSize: 14, marginHorizontal: 8 },
  startButton: {
    marginTop: 24,
    borderRadius: 20,
    backgroundColor: '#9c27b0',
  },
  error: { color: '#d32f2f', fontSize: 12, marginTop: 4 },
});
