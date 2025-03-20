import React from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { View } from './common/View';
import { Box } from './common/Box';
import { InterestModel } from '../models/general/models';

type SelectInterestProps = {
  interests: InterestModel[];
  selectedInterests: number[];
  onSelect: (value: InterestModel) => void;
  onNextButton: () => void;
};

export const SelectInterest = ({
  interests,
  selectedInterests,
  onSelect,
  onNextButton,
}: SelectInterestProps) => {
  const handleSelect = (interest: InterestModel) => {
    if (selectedInterests.includes(interest.interest_id)) {
      onSelect(interest);
    } else if (selectedInterests.length < 5) {
      onSelect(interest);
    }
  };

  // Group interests by title (subheader)
  const groupedInterests = interests.reduce((acc, interest) => {
    const title = interest.title;
    if (!acc[title]) {
      acc[title] = [];
    }
    acc[title].push(interest);
    return acc;
  }, {} as Record<string, InterestModel[]>);

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
          {Object.entries(groupedInterests).map(([title, interestsGroup]) => (
            <View key={title} style={styles.categoryContainer}>
              <Text variant="titleMedium" style={styles.subheader}>
                {title}
              </Text>
              <View style={styles.interestsContainer}>
                {interestsGroup.map((interest) => {
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
                        source={
                          interest.icon
                            ? { uri: interest.icon }
                            : require('../assets/flat-icons/check-circle.png')
                        }
                        style={[styles.interestIcon, isSelected && styles.selectedInterestIcon]}
                      />
                      <Text style={styles.interestText}>{interest.interest_name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
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
  categoryContainer: {
    marginTop: 24,
  },
  subheader: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5, // Adds spacing between items
  },
  interestBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    marginRight: 12, // Space between items horizontally
    marginBottom: 12, // Space between items vertically
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
  interestText: {
    fontSize: 12,
    lineHeight: 14,
    paddingLeft: 5,
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
