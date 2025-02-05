import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';
import { Box } from './common/Box';
import { View } from './common/View';
import { DescribeModel } from '../models/general/describe.model';

type SelectRoleProps = {
  roles: DescribeModel[];
  selectedRole: number | undefined;
  onSelect: (value: number) => void;
  onNextButton: () => void;
};

export const SelectRole = ({ roles, selectedRole, onSelect, onNextButton }: SelectRoleProps) => (
  <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.contentContainer}>
        <Text variant="titleLarge" style={styles.title}>
          How would you describe yourself?
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Choose the role that best describes you
        </Text>
        <View style={styles.rolesContainer}>
          {roles.map((role) => {
            const isSelected = selectedRole === role.describes_id;
            return (
              <TouchableOpacity
                key={role.describes_id}
                style={[styles.roleButton, isSelected && styles.selectedRoleButton]}
                onPress={() => onSelect(role.describes_id)}
              >
                <Text variant="titleMedium">{role.interest_name}</Text>
                <Image
                  source={role.icon ? { uri: role.icon } : getRoleImage(role.title)}
                  style={[styles.roleIcon, isSelected && styles.selectedRoleIcon]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
    <Box px={16} py={16}>
      <Button
          mode="contained" 
          onPress={onNextButton}
          >
          <Text style={styles.buttonContent}>Next</Text>
      </Button>
    </Box>
  </View>
);

const getRoleImage = (title: string) => {
  const images: Record<string, any> = {
    Investor: require('../assets/flat-icons/diamond-outlined.png'),
    Entrepreneur: require('../assets/flat-icons/rocket-outlined.png'),
    Professional: require('../assets/flat-icons/briefcase.png'),
    'Family business': require('../assets/flat-icons/family-dress.png'),
    Student: require('../assets/flat-icons/graduation-cap-outlined.png'),
  };
  return images[title] || null;
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
  },
  subtitle: {
    marginTop: 12,
    textAlign: 'center',
  },
  rolesContainer: {
    marginTop: 24,
  },
  roleButton: {
    flex: 1,
    padding: 16,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  selectedRoleButton: {
    backgroundColor: '#F5EF99',
  },
  roleIcon: {
    width: 40,
    height: 40,
    tintColor: '#A09FA0',
  },
  selectedRoleIcon: {
    tintColor: '#414042',
  },
  buttonContent: {
    color: '#fff',
  },
});
