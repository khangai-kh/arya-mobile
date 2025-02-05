import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';
import { Box } from './common/Box';
import { View } from './common/View';
import { MotivationModel } from '../models/general/motivation.model';

type SelectMotivationProps = {
  motivations: MotivationModel[];
  selectedMotivation: number | undefined;
  onSelect: (value: number) => void;
  onNextButton: () => void;
};

export const SelectMotivation = ({
  motivations,
  selectedMotivation,
  onSelect,
  onNextButton,
}: SelectMotivationProps) => (
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
                selectedMotivation === motivation.interest_id && styles.selectedMotivationButton,
              ]}
              onPress={() => onSelect(motivation.interest_id)}
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
        onPress={onNextButton}>
          <Text style={styles.buttonContent}>Next</Text>
        </Button>
    </Box>
  </View>
);

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
  },
  selectedMotivationButton: {
    backgroundColor: '#F5EF99',
  },
  buttonContent: {
    color: '#fff',
  },
});
