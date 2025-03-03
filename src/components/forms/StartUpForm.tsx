import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Avatar,
  IconButton,
  Menu,
} from 'react-native-paper';
import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';

// 1. Define the shape of the form values
export interface StartUpFormValues {
  name: string;
  slogan: string;
  description: string;
  coFounders: string[];       // We'll store co-founder names in an array
  productImages: string[];
  phase: string;
  investmentStage: string;
  investors: string[];
  totalInvestment: string;
}

// 2. Define the props for the StartUpForm component
export interface StartUpFormProps {
  initialValues: StartUpFormValues;
  onSubmit: (values: StartUpFormValues) => void;
}

// 3. Yup Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  slogan: Yup.string().required('Slogan is required'),
  description: Yup.string().required('Description is required'),
  phase: Yup.string().required('Phase is required'),
  investmentStage: Yup.string().required('Investment stage is required'),
  totalInvestment: Yup.string().required('Total investment is required'),
});

// EXAMPLE: Possible co-founders you might retrieve from an API or store
const possibleCoFounders = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Mark Brown' },
  { id: '4', name: 'Emily Davis' },
];

// 4. The StartUpForm Component
export const StartUpForm: React.FC<StartUpFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  // For controlling the co-founder selection menu
  const [coFounderMenuVisible, setCoFounderMenuVisible] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <ScrollView contentContainerStyle={styles.container}>
          {/* Title */}
          <Text variant="titleLarge" style={styles.title}>
            Add startup
          </Text>

          {/* Startup Icon + Pencil Button */}
          <View style={styles.avatarContainer}>
            <Avatar.Icon size={60} icon="rocket" />
            <TouchableOpacity style={styles.editIconContainer}>
              <IconButton
                icon="pencil"
                size={18}
                mode="contained"
                containerColor="#9C27B0"
                iconColor="#fff"
                onPress={() => {
                  console.log('Add or edit logo tapped');
                  // Implement image picker or similar functionality here
                }}
              />
            </TouchableOpacity>
          </View>

          {/* Name */}
          <TextInput
            label="Name"
            placeholder="Startup name"
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            mode="outlined"
            style={styles.input}
          />
          {touched.name && errors.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}

          {/* Slogan */}
          <TextInput
            label="Slogan"
            placeholder="Tagline"
            value={values.slogan}
            onChangeText={handleChange('slogan')}
            onBlur={handleBlur('slogan')}
            mode="outlined"
            style={styles.input}
          />
          {touched.slogan && errors.slogan && (
            <Text style={styles.errorText}>{errors.slogan}</Text>
          )}

          {/* Description */}
          <TextInput
            label="Description"
            placeholder="Lorem ipsum dolor sit amet..."
            value={values.description}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            mode="outlined"
            multiline
            style={[styles.input, { height: 100 }]}
          />
          {touched.description && errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}

          {/* Co-Founders with selection menu */}
          <FieldArray name="coFounders">
            {({ push, remove }) => (
              <View style={styles.dynamicFieldContainer}>
                <Text variant="titleSmall">Co-Founders</Text>

                {/* The button + menu for selecting new co-founders */}
                <Menu
                  visible={coFounderMenuVisible}
                  onDismiss={() => setCoFounderMenuVisible(false)}
                  anchor={
                    <Button
                      mode="outlined"
                      onPress={() => setCoFounderMenuVisible(true)}
                      style={styles.menuButton}
                    >
                      Select Co-Founder
                    </Button>
                  }
                >
                  {possibleCoFounders.map((coFounder) => (
                    <Menu.Item
                      key={coFounder.id}
                      onPress={() => {
                        // Add the co-founder name to the array
                        push(coFounder.name);
                        setCoFounderMenuVisible(false);
                      }}
                      title={coFounder.name}
                    />
                  ))}
                </Menu>

                {/* Display the coFounders array */}
                {values.coFounders.map((coFounder, index) => (
                  <View key={index} style={styles.dynamicFieldRow}>
                    <TextInput
                      placeholder="Name Surname"
                      value={coFounder}
                      onChangeText={(text) => {
                        const updated = [...values.coFounders];
                        updated[index] = text;
                        setFieldValue('coFounders', updated);
                      }}
                      mode="outlined"
                      style={[styles.input, { flex: 1 }]}
                    />
                    <IconButton
                      icon="close"
                      size={20}
                      onPress={() => remove(index)}
                    />
                  </View>
                ))}
              </View>
            )}
          </FieldArray>

          {/* Product Images (dynamic) - for completeness */}
          <FieldArray name="productImages">
            {({ push, remove }) => (
              <View style={styles.dynamicFieldContainer}>
                <Text variant="titleSmall">Product Images</Text>
                <View style={styles.imageRow}>
                  {values.productImages.map((img, index) => (
                    <View key={index} style={styles.imagePlaceholder}>
                      <IconButton
                        icon="image"
                        size={32}
                        onPress={() => {
                          console.log(`Edit image at index ${index}`);
                          // Implement your image picker logic here
                        }}
                      />
                      <IconButton
                        icon="close"
                        size={18}
                        style={styles.removeImageIcon}
                        onPress={() => remove(index)}
                      />
                    </View>
                  ))}
                  {/* Add a new image */}
                  <TouchableOpacity
                    style={styles.imagePlaceholder}
                    onPress={() => {
                      // e.g., open image picker then push the URI
                      push('');
                    }}
                  >
                    <IconButton icon="plus" size={32} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </FieldArray>

          {/* Phase */}
          <TextInput
            label="Phase"
            placeholder="Idea, prototype..."
            value={values.phase}
            onChangeText={handleChange('phase')}
            onBlur={handleBlur('phase')}
            mode="outlined"
            style={styles.input}
          />
          {touched.phase && errors.phase && (
            <Text style={styles.errorText}>{errors.phase}</Text>
          )}

          {/* Investment Stage */}
          <TextInput
            label="Investment Stage"
            placeholder="Angel, Fund..."
            value={values.investmentStage}
            onChangeText={handleChange('investmentStage')}
            onBlur={handleBlur('investmentStage')}
            mode="outlined"
            style={styles.input}
          />
          {touched.investmentStage && errors.investmentStage && (
            <Text style={styles.errorText}>{errors.investmentStage}</Text>
          )}

          {/* Investors (dynamic) */}
          <FieldArray name="investors">
            {({ push, remove }) => (
              <View style={styles.dynamicFieldContainer}>
                <Text variant="titleSmall">Investors</Text>
                {values.investors.map((investor, index) => (
                  <View key={index} style={styles.dynamicFieldRow}>
                    <TextInput
                      placeholder="Name Surname"
                      value={investor}
                      onChangeText={(text) => {
                        const updated = [...values.investors];
                        updated[index] = text;
                        setFieldValue('investors', updated);
                      }}
                      mode="outlined"
                      style={[styles.input, { flex: 1 }]}
                    />
                    <IconButton
                      icon="close"
                      size={20}
                      onPress={() => remove(index)}
                    />
                  </View>
                ))}
                <TouchableOpacity onPress={() => push('')}>
                  <Text style={styles.addLink}>Add investor</Text>
                </TouchableOpacity>
              </View>
            )}
          </FieldArray>

          {/* Total Investment */}
          <TextInput
            label="Total Investment"
            placeholder="$"
            value={values.totalInvestment}
            onChangeText={handleChange('totalInvestment')}
            onBlur={handleBlur('totalInvestment')}
            mode="outlined"
            style={styles.input}
          />
          {touched.totalInvestment && errors.totalInvestment && (
            <Text style={styles.errorText}>{errors.totalInvestment}</Text>
          )}

          {/* Submit Button */}
          <Button
            mode="contained"
            onPress={() => handleSubmit()}
            style={styles.saveButton}
          >
            Save
          </Button>
        </ScrollView>
      )}
    </Formik>
  );
};

// 5. Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: -4,
  },
  input: {
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  dynamicFieldContainer: {
    marginBottom: 16,
  },
  dynamicFieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addLink: {
    color: '#9C27B0',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
  menuButton: {
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  removeImageIcon: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#fff',
  },
  saveButton: {
    marginTop: 16,
  },
});
