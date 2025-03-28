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
  const dynamicStyles = createDynamicdynamicStyles(colors);
  const navigation = useNavigation();
  const { token } = useSelector((state: RootState) => state.auth);
  const [contents, setContents] = useState<ContentModel[]>([]);
  const [contentTypes, setContentTypes] = useState<ContentTypeModel[]>([]);

  // Query for announcements
  const { isFetching: isFetchingAnnouncements } = useQuery(
    ['contents', DEFAULT_PAGE, PAGE_SIZE, token],
    async () => {
      const response = await API.get('/api/contents', {
        params: {
          page: DEFAULT_PAGE,
          page_size: PAGE_SIZE,
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

  // Query for content types
  const { isFetching: isFetchingContentTypes } = useQuery(
    ['contentTypes', token],
    async () => {
      const response = await API.get('/api/content-types');
      return response || [];
    },
    {
      onSuccess: (data) => {
        setContentTypes(data);
      },
    }
  );

  if (isFetchingAnnouncements || isFetchingContentTypes) {
    return (
      <View style={dynamicStyles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={dynamicStyles.safeArea} edges={['bottom']}>
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
                key={type.index}
                style={dynamicStyles.interestBox}
                onPress={() => {}}
              >
                <Text style={dynamicStyles.interestText}>{type.name}</Text>
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

const createDynamicdynamicStyles = (colors: MD3Theme['colors']) =>
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
      marginBottom: 10,
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
      marginHorizontal:5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    interestText: {
        fontSize: 12,
        color: colors.primary,
        paddingLeft: 0,
        marginLeft: 0,
    },
  });
