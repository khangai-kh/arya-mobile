import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Searchbar, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainStackParams } from '../models/navigation';

type SearchProps = StackScreenProps<MainStackParams, 'Search'>;

export const Search = (props: SearchProps) => {
  const { navigation } = props;
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const dynamicStyles = createDynamicStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Appbar.Header style={styles.appbarHeader}>
          <View style={styles.searchContainer}>
            <Searchbar
              icon={require('../assets/flat-icons/search.png')}
              clearIcon={require('../assets/flat-icons/cross-circle.png')}
              placeholder="Search Arya"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={dynamicStyles.searchbar}
            />
          </View>
          <Text
            variant="titleSmall"
            style={styles.cancelText}
            onPress={() => navigation.navigate('BottomTab')}
          >
            Cancel
          </Text>
        </Appbar.Header>
        <View style={styles.bodyContainer}>
          <Text>TODO:body of search screen</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  appbarHeader: {
    backgroundColor: 'transparent',
  },
  searchContainer: {
    flex: 1,
  },
  cancelText: {
    fontWeight: '500',
    marginHorizontal: 16,
  },
  bodyContainer: {
    // Add any desired styling for the search body here
  },
});

const createDynamicStyles = (colors: any) =>
  StyleSheet.create({
    searchbar: {
      backgroundColor: '#fff',
    },
  });
