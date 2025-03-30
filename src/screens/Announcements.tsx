import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Appbar, MD3Theme, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Announcement } from '../components/Announcement';
import { ContentModel, ContentTypeModel } from '../models/homepage/Content';
import { API } from '../plugins/axios';
import { DEFAULT_PAGE, PAGE_SIZE } from '../constants/constants';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';
import { useNavigation } from '@react-navigation/native';

export const Announcements = () => {
  const { colors } = useTheme();
  const dynamicStyles = createDynamicStyles(colors);
  const navigation = useNavigation();
  const { token } = useSelector((state: RootState) => state.auth);
  const [contents, setContents] = useState<ContentModel[]>([]);
  const [contentTypes, setContentTypes] = useState<ContentTypeModel[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const { isFetching: isFetchingAnnouncements } = useQuery(
    ['contents', DEFAULT_PAGE, PAGE_SIZE, token, selectedCategoryId],
    async () => {
      const response = await API.get('/api/contents', {
        params: {
          page: DEFAULT_PAGE,
          page_size: PAGE_SIZE,
          content_type_id: selectedCategoryId,
        },
      });
      return response.data || [];
    },
    {
      onSuccess: (data) => {
        setContents(data);
      },
    }
  );

  const { isFetching: isFetchingContentTypes } = useQuery(
    ['contentTypes', token],
    async () => {
      const response = await API.get('/api/content-types');
      return response.data || [];
    },
    {
      onSuccess: (data) => {
        setContentTypes(data);
      },
    }
  );

  // Handle category press
  const handleCategoryPress = (categoryId: number) => {
    setSelectedCategoryId(categoryId === selectedCategoryId ? null : categoryId); // Toggle selection
  };

  if (isFetchingAnnouncements || isFetchingContentTypes) {
    return (
      <View style={dynamicStyles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={dynamicStyles.safeArea} edges={['top']}>
      <Appbar.Header style={dynamicStyles.appbarHeader}>
        <Appbar.Action
          icon={require('../assets/flat-icons/angle-small-left.png')}
          color="#414042"
          size={20}
          style={dynamicStyles.appbarActionRight}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          title={
            <View style={dynamicStyles.titleContainer}>
              <Text variant="titleMedium" style={dynamicStyles.titleText}>
                Announcements
              </Text>
            </View>
          }
        />
      </Appbar.Header>
      <View style={dynamicStyles.container}>
        {/* Category Chips */}
        <View style={dynamicStyles.chipContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {contentTypes.map((type) => (
              <TouchableOpacity
                key={type.index} // Assuming 'index' exists; replace with 'id' if needed
                style={[
                  dynamicStyles.interestBox,
                  selectedCategoryId === type.id && dynamicStyles.selectedInterestBox, // Highlight selected
                ]}
                onPress={() => handleCategoryPress(type.id)}
              >
                <Text
                  style={[
                    dynamicStyles.interestText,
                    selectedCategoryId === type.id && dynamicStyles.selectedInterestText, // Highlight text
                  ]}
                >
                  {type.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Announcements List */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {contents?.map((content, index) => (
            <Announcement
              key={index}
              title={content.title || ''}
              image={content.image_url}
              body={content.description || ''}
              location={content.location || 'Istanbul, Turkey'}
              date={content.created_at || ''}
              type={content.content_type?.name || ''}
              style={[
                dynamicStyles.announcement,
                index === contents.length - 1 && dynamicStyles.lastAnnouncement,
              ]}
              onPress={() => {}}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const createDynamicStyles = (colors: MD3Theme['colors']) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    appbarHeader: {
      width: '100%',
      backgroundColor: 'transparent',
      alignContent: 'flex-start',
      justifyContent: 'space-between',
      borderBottomColor: colors.outline,
      borderBottomWidth: StyleSheet.hairlineWidth,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    appbarActionRight: {
      backgroundColor: colors.onPrimary,
      marginRight: 5,
    },
    titleContainer: {
      alignItems: 'center',
    },
    titleText: {
      fontWeight: 'bold',
      marginLeft: -40,
    },
    container: {
      flex: 1,
      marginTop: 24,
      marginHorizontal: 16,
    },
    chipContainer: {
      marginBottom: 16,
    },
    announcement: {
      marginBottom: 8,
    },
    lastAnnouncement: {
      marginBottom: 0,
    },
    interestBox: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      borderRadius: 15,
      backgroundColor: '#f5f5f5',
      marginVertical: 6,
      paddingHorizontal: 10,
      marginHorizontal: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    selectedInterestBox: {
      backgroundColor: colors.primary,
    },
    interestText: {
      fontSize: 12,
      color: colors.primary,
      paddingLeft: 0,
      marginLeft: 0,
    },
    selectedInterestText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
