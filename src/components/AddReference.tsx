import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import  Dropdown  from 'react-native-dropdown-picker';
import { Button, Chip } from 'react-native-paper';
import { Box } from './common/Box';

const referenceOptions = [
  { label: 'John Doe', value: 1},
  { label: 'Jane Smith', value: 2 },
  { label: 'Alice Johnson', value: 3 },
  { label: 'Bob Williams', value: 4 },
];

type Addreference1Props = {
  selectedReferences: number[];
  onSelect: (value: number[]) => void;
  onNextButton: () => void;
};

export const  AddReference = ({
  selectedReferences,
  onSelect,
  onNextButton,
}: Addreference1Props) => {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleSelect = (value: number) => {
    if (selectedReferences.length < 3 && !selectedReferences.includes(value)) {
      onSelect([...selectedReferences, value]);
    }
  };

  const handleRemove = (value: number) => {
    onSelect(selectedReferences.filter(ref => ref !== value));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Reference</Text>
      <Text style={styles.subtitle}>Adding a reference is optional!</Text>

      <Dropdown
        open={open}
        value={selectedValue}
        items={referenceOptions}
        searchable={true}
        searchPlaceholder="Search references..."
        setOpen={setOpen}
        setValue={setSelectedValue}
        placeholder="Select a reference"
        onSelectItem={(item) => item.value && handleSelect(item.value)}
        containerStyle={styles.dropdown}
      />

      <View style={styles.selectedContainer}>
        {selectedReferences.map((reference, index) => (
          <Chip
            key={index}
            closeIcon={require('../assets/flat-icons/cross-circle.png')}
            onClose={() => handleRemove(reference)}
            style={styles.chip}>
            Reference {index + 1}: {referenceOptions.find((opt) => opt.value === reference)?.label}
          </Chip>
        ))}
      </View>

      <Box px={16} py={16}>
        <Button
          mode="contained"
          onPress={onNextButton}
        >
          <Text style={styles.buttonContent}>Continue</Text>
        </Button>
      </Box>

      <TouchableOpacity>
        <Text
          style={styles.link} 
          onPress={onNextButton}>
            Continue without reference
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  dropdown: {
    marginBottom: 15,
  },
  referenceText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E0A9C2',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#D3D3D3',
  },
  link: {
    textAlign: 'center',
    color: '#009EFF',
    marginTop: 10,
  },
  chip: {
    margin: 4,
  },
  selectedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonContent: {
    color: '#fff',
  },
});

