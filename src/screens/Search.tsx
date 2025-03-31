import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Appbar, Searchbar, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainStackParams } from '../models/navigation';
import { ContentModel } from '../models/homepage/Content';
import { Inspiration } from '../components/Inspiration';
import { DEFAULT_PAGE, PAGE_SIZE } from '../constants/constants';
import { API } from '../plugins/axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';

type SearchProps = StackScreenProps<MainStackParams, 'Search'>;

export const Search = (props: SearchProps) => {
  const { navigation } = props;
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const { token } = useSelector((state: RootState) => state.auth);
  const [contents, setContents] = useState<ContentModel[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(4);
  const contentTypes = [
    { id: 1, name: 'Members' },
    { id: 2, name: 'Investment' },
    { id: 3, name: 'Startups' },
    { id: 4, name: 'Contents' },
  ];
  const dynamicStyles = createDynamicStyles(colors);

  // Debounce the search query so API calls are not made on every keystroke.
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      // Reset page & contents when the query changes
      setPage(DEFAULT_PAGE);
      if (searchQuery.length < 3) {
        setContents([]);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Updated fetch function using debouncedSearchQuery as keyword.
  const fetchAnnouncements = useCallback(
    async (pageNum: number) => {
      const response = await API.get('/api/contents', {
        params: {
          page: pageNum,
          page_size: PAGE_SIZE,
          keyword: debouncedSearchQuery,
        },
      });
      return response.data || [];
    },
    [debouncedSearchQuery]
  );

  // Trigger query only if debounced search query has at least 3 characters.
  const { isFetching: isFetchingAnnouncements } = useQuery(
    ['contents', debouncedSearchQuery, page, PAGE_SIZE, token, selectedCategoryId],
    () => fetchAnnouncements(page),
    {
      onSuccess: (data) => {
        if (page === DEFAULT_PAGE) {
          setContents(data);
        } else {
          setContents(prev => [...prev, ...data]);
        }
        setHasMore(data.length === PAGE_SIZE);
      },
      enabled: debouncedSearchQuery.length >= 3 && !isLoadingMore,
    }
  );

  const handleCategoryPress = (categoryId: number) => {
    setSelectedCategoryId(categoryId === selectedCategoryId ? null : categoryId);
    setContents([]); // Clear existing contents when category changes
  };

  const loadMore = useCallback(async () => {
    if (!isLoadingMore && hasMore && !isFetchingAnnouncements) {
      setIsLoadingMore(true);
      const nextPage = page + 1;
      try {
        const newData = await fetchAnnouncements(nextPage);
        setContents(prev => [...prev, ...newData]);
        setPage(nextPage);
        setHasMore(newData.length === PAGE_SIZE);
      } catch (error) {
        console.error('Error loading more announcements:', error);
      } finally {
        setIsLoadingMore(false);
      }
    }
  }, [isLoadingMore, hasMore, isFetchingAnnouncements, page, fetchAnnouncements]);

  const handleScroll = ({ nativeEvent }: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const paddingToBottom = 20;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      loadMore();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Appbar.Header style={styles.appbarHeader}>
          <View style={styles.searchContainer}>
            <Searchbar
              icon={require('../assets/flat-icons/search.png')}
              clearIcon={require('../assets/flat-icons/cross-circle.png')}
              placeholder="Search in AryaUp"
              placeholderTextColor={'gray'}
              cursorColor={'white'}
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={dynamicStyles.searchbar}
              inputStyle={dynamicStyles.searchbarInput}
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
          <View style={dynamicStyles.chipContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {contentTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    dynamicStyles.interestBox,
                    selectedCategoryId === type.id && dynamicStyles.selectedInterestBox,
                  ]}
                  onPress={() => handleCategoryPress(type.id)}
                >
                  <Text
                    style={[
                      dynamicStyles.interestText,
                      selectedCategoryId === type.id && dynamicStyles.selectedInterestText,
                    ]}
                  >
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={handleScroll}
          >
            {contents?.map((inspiration, index) => (
              <Inspiration
                key={inspiration.id}
                title={inspiration.title ?? 'Untitled'}
                image={inspiration.image_url ?? ''}
                profileImage={inspiration.profileImage}
                name={inspiration.created_user?.full_name ?? 'Unknown'}
                date={inspiration.created_at ?? ''}
                style={{ marginBottom: index === contents.length - 1 ? 0 : 8 }}
                onPress={() => navigation.navigate('Announcement', { id: inspiration.id || 0 })}
              />
            ))}
            {isFetchingAnnouncements && (
              <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 16 }} />
            )}
          </ScrollView>
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
    // Additional styling if needed
  },
});

const createDynamicStyles = (colors: any) =>
  StyleSheet.create({
    searchbar: {
      backgroundColor: '#fff',
      height: 48,
      paddingVertical: 0,
    },
    // Update input style: setting lineHeight equal to the height helps center the text
    searchbarInput: {
      textAlignVertical: 'center',
      fontSize: 16,
      paddingVertical: 10,
      paddingBottom: 10,
      marginVertical: 0,
      lineHeight: 48,
      height: 48,
    },
    chipContainer: {
      marginBottom: 16,
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
    loadingMoreContainer: {
      padding: 16,
      alignItems: 'center',
    },
  });
