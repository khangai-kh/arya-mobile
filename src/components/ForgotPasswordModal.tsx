// ForgotPasswordModal.tsx
import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput as PaperTextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { API } from '../plugins/axios';

// Validation schema for forgot password
const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
});

type ForgotPasswordModalProps = {
  visible: boolean;
  onClose: () => void;
};

export const ForgotPasswordModal = ({ visible, onClose }: ForgotPasswordModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text variant="titleLarge" style={styles.modalTitle}>
            Forgot Password
          </Text>
          <Text style={styles.modalSubtitle}>
            Enter your email to reset your password
          </Text>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={forgotPasswordValidationSchema}
            onSubmit={async (values, { resetForm }) => {
              await API.post('/api/forgot-password', {
                email: values.email,
              });
              // Leave empty for later implementation
              console.log('Forgot Password Email:', values.email);
              resetForm();
              onClose();
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <PaperTextInput
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="Enter valid email"
                  mode="outlined"
                  value={values.email}
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

                <View style={styles.modalButtonContainer}>
                  <Button
                    mode="outlined"
                    style={styles.modalButton}
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    mode="contained"
                    style={styles.modalButton}
                    onPress={() => handleSubmit()}
                  >
                    Submit
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#666',
  },
  input: {
    borderColor: 'grey',
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#fff',
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 20,
    padding: 0,
    height: 40,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 8,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});
