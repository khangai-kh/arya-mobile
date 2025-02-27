import React from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { View } from './common/View';
import { Box } from './common/Box';
import { InteresteModel } from '../models/general/interest.model';

type SelectInterestProps = {
  interests: InteresteModel[];
  selectedInterests: number[];
  onSelect: (value: InteresteModel) => void;
  onNextButton: () => void;
};

export const SelectInterest = ({
  interests,
  selectedInterests,
  onSelect,
  onNextButton,
}: SelectInterestProps) => {
  const handleSelect = (interest: InteresteModel) => {
    if (selectedInterests.includes(interest.interest_id)) {
      onSelect(interest);
    } else if (selectedInterests.length < 5) {
      onSelect(interest);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.title}>
            Select up to 5 Interests
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Discover meaningful connections by selecting your interests
          </Text>
          <View style={styles.interestsContainer}>
            {interests.map((interest) => {
              const isSelected = selectedInterests.includes(interest.interest_id);
              return (
                <TouchableOpacity
                  key={interest.interest_id}
                  style={[
                    styles.interestBox,
                    isSelected && styles.selectedBox,
                  ]}
                  onPress={() => handleSelect(interest)}
                >
                  <Image
                    source={interest.icon ? { uri: interest.icon } : require('../assets/flat-icons/check-circle.png')}
                    style={[styles.interestIcon, isSelected && styles.selectedInterestIcon]}
                  />
                  <Text style={styles.interestText}>{interest.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <Box px={16} py={16}>
        <Button mode="contained" onPress={onNextButton}>
          <Text style={styles.buttonContent}>Save</Text>
        </Button>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 12,
    textAlign: 'center',
  },
  interestsContainer: {
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  interestBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    marginBottom: 12,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedBox: {
    backgroundColor: '#F5EF99',
  },
  iconContainer: {
    marginRight: 8,
  },
  interestText: {
    fontSize: 10,
    lineHeight: 14,
    paddingLeft:10,
    width: '80%',
  },
  interestIcon: {
    width: 20,
    height: 20,
    tintColor: '#A09FA0',
  },
  selectedInterestIcon: {
    tintColor: '#414042',
  },
  buttonContent: {
    color: '#fff',
  },
});
