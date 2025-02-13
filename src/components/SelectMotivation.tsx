import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';
import { Box } from './common/Box';
import { View } from './common/View';
import { MotivationModel } from '../models/general/motivation.model';

type SelectMotivationProps = {
  motivations: MotivationModel[];
  selectedMotivations: number[];
  onSelect: (value: number[]) => void;
  onNextButton: () => void;
};

export const SelectMotivation = ({
  motivations,
  selectedMotivations,
  onSelect,
  onNextButton,
}: SelectMotivationProps) => {
  const handleSelect = (id: number) => {
    if (selectedMotivations.includes(id)) {
      onSelect(selectedMotivations.filter((motivation) => motivation !== id));
    } else {
      onSelect([...selectedMotivations, id]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text variant="titleLarge" style={styles.title}>
            What’s your motivation for joining Arya?
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Let us know what you aim to achieve by being part of our community
          </Text>
          <View style={styles.motivationsContainer}>
            {motivations.map((motivation) => (
              <TouchableOpacity
                key={motivation.interest_id}
                style={[
                  styles.motivationButton,
                  selectedMotivations.includes(motivation.interest_id) && styles.selectedMotivationButton,
                ]}
                onPress={() => handleSelect(motivation.interest_id)}
              >
                <Text variant="titleMedium">{motivation.interest_name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <Box px={16} py={16}>
        <Button
          mode="contained"
          onPress={onNextButton}
          disabled={selectedMotivations.length === 0}
        >
          <Text style={styles.buttonContent}>Next</Text>
        </Button>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  subtitle: {
    marginTop: 12,
    textAlign: 'center',
  },
  motivationsContainer: {
    marginTop: 24,
  },
  motivationButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedMotivationButton: {
    backgroundColor: '#F5EF99',
    borderColor: '#E0A800',
  },
  buttonContent: {
    color: '#fff',
  },
});
