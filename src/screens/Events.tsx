// src/screens/EventsScreen.tsx
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Text, useTheme, IconButton, Icon } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { API } from '../plugins/axios';
import { RootState } from '../redux/configureStore';
import { MainStackParams } from '../models/navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { DEFAULT_PAGE, PAGE_SIZE } from '../constants/constants';
import { Announcement } from '../components/Announcement';
import { ContentModel } from '../models/homepage/Content';
import { EventTypeModel } from '../models/general/models';

type EventsProps = StackScreenProps<MainStackParams, 'Events'>;

export const Events = ({ navigation }: EventsProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { token } = useSelector((s: RootState) => s.auth);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [events, setEvents] = useState<ContentModel[]>([]);
  const [agendaEvents, setAgendaEvents] = useState<ContentModel[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [viewMode, setViewMode] = useState<'agenda' | 'list'>('agenda');
  const today = useMemo(() => new Date(), []);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<EventTypeModel[]>([]);
  const { role } = useSelector((state: RootState) => state.auth);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const navigateToAboutUs = () => navigation.navigate('AboutUs');
  const navigateToNotifications = () => navigation.navigate('Notifications');

  const goPrev = () => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const goNext = () => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const calendarDays = useMemo(() => {
    const firstDow = new Date(year, month, 1).getDay();
    const offset = (firstDow + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const arr: Array<number | null> = [];
    for (let i = 0; i < offset; i++) {
      arr.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      arr.push(d);
    }
    return arr;
  }, [year, month]);

  const fetchEvents = useCallback(
    async (pageNum: number, params: any = {}) => {
      const response = await API.get('/api/contents', {
        params: {
          page: pageNum,
          page_size: PAGE_SIZE,
          content_type_id: 1,
          ...params,
        },
      });
      return response.data || [];
    },
    []
  );

  const { isFetching: isFetchingContentTypes } = useQuery(
    ['contentTypes', token],
    async () => {
      const response = await API.get('/api/event-types');
      return response.data || [];
    },
    {
      onSuccess: (data) => {
        setCategories(data);
      },
    }
  );

  const { isFetching: isFetchingEvents } = useQuery(
    ['events', page, PAGE_SIZE, token, selectedCategoryId],
    () => fetchEvents(page, { event_type_id: selectedCategoryId }),
    {
      onSuccess: (data) => {
        if (page === DEFAULT_PAGE) {
          setEvents(data);
        } else {
          setEvents((prev) => [...prev, ...data]);
        }
        setHasMore(data.length === PAGE_SIZE);
        setIsFirstLoad(false);
      },
      enabled: !isLoadingMore,
    }
  );

  const loadMore = useCallback(async () => {
    if (!isLoadingMore && hasMore && !isFetchingEvents) {
      setIsLoadingMore(true);
      const nextPage = page + 1;
      try {
        const newData = await fetchEvents(nextPage, { event_type_id: selectedCategoryId });
        setEvents((prev) => [...prev, ...newData]);
        setPage(nextPage);
        setHasMore(newData.length === PAGE_SIZE);
      } catch (error) {
        console.error('Error loading more events:', error);
      } finally {
        setIsLoadingMore(false);
      }
    }
  }, [isLoadingMore, hasMore, isFetchingEvents, page, fetchEvents, selectedCategoryId]);

  const handleCategoryPress = (categoryId: number) => {
    setSelectedCategoryId(categoryId === selectedCategoryId ? null : categoryId);
    setPage(DEFAULT_PAGE);
  };

  const monthName = useMemo(
    () => currentDate.toLocaleString('default', { month: 'long' }),
    [currentDate]
  );

  const handleScroll = ({ nativeEvent }: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const paddingToBottom = 20;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      loadMore();
    }
  };

  const navigateToSearch = () => navigation.navigate('Search');

  const navigateToMemberShip = () =>
    navigation.navigate('MemberShip', {
      agreed_agreement: false,
      agreed_confidentiality: false,
    });

  useEffect(() => {
    const fetchAgendaEvents = async () => {
      try {
        const params: any = {
          page: DEFAULT_PAGE,
          page_size: PAGE_SIZE,
          content_type_id: 1,
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
        };

        if (selectedDay) {
          params.day = selectedDay;
        }

        const data = await fetchEvents(DEFAULT_PAGE, params);
        setAgendaEvents(data);
      } catch (error) {
        console.error('Error fetching agenda events:', error);
        setAgendaEvents([]);
      }
    };

    fetchAgendaEvents();

    // Set selected day to today only if it's the current month and year on first load
    if (
      isFirstLoad &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    ) {
      setSelectedDay(today.getDate());
    } else if (
      currentDate.getMonth() !== today.getMonth() ||
      currentDate.getFullYear() !== today.getFullYear()
    ) {
      setSelectedDay(null); // Reset selected day when month/year changes
    }

    setIsFirstLoad(false);
  }, [currentDate, selectedDay, today, isFirstLoad, fetchEvents]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header Section */}
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                <Image
                  source={require('../assets/arya_up.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <View style={styles.headerRight}>
                {role === 4 && (
                  <View style={[styles.crownRight,{borderBlockColor:colors.primary}]}  >
                    <Icon
                      source={require('../assets/flat-icons/crown.png')}
                      color={colors.primary}
                      size={14}
                    />
                    <Text style={[styles.upgradeButtonLabel,{color:colors.primary}]} onPress={navigateToMemberShip}>Upgrade</Text>
                  </View>)}
                </View>
                  <View style={styles.iconRow}>
                    {role !== 4 && (
                      <IconButton
                      containerColor={colors.onPrimary}
                      icon={require('../assets/flat-icons/search.png')}
                      size={18}
                      onPress={navigateToSearch}
                    />)}
                    <IconButton
                      containerColor={colors.onPrimary}
                      icon={require('../assets/flat-icons/bell.png')}
                      size={18}
                      onPress={navigateToNotifications}
                    />
                    <IconButton
                      containerColor={colors.onPrimary}
                      icon={require('../assets/flat-icons/info.png')}
                      size={18}
                      onPress={navigateToAboutUs}
                    />
                  </View>
              </View>
            </View>

      {/* Segmented Control */}
      <View style={styles.segment}>
        {['agenda', 'list'].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[styles.segmentButton, viewMode === mode && styles.segmentButtonActive]}
            onPress={() => setViewMode(mode as any)}
          >
            <Text
              style={[styles.segmentText, viewMode === mode && styles.segmentTextActive]}
            >
              {mode === 'agenda' ? 'Agenda' : 'Events List'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {viewMode === 'agenda' ? (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.calendarContainer}>
            {/* Calendar Header */}
            <View style={styles.calHeader}>
              <TouchableOpacity style={styles.navIconTouch} onPress={goPrev}>
                <Image
                  style={styles.navIcon}
                  source={require('../assets/flat-icons/angle-small-left.png')}
                />
              </TouchableOpacity>
              <Text style={styles.calTitle}>
                {monthName} {year}
              </Text>
              <TouchableOpacity onPress={goNext} style={styles.navIconTouch}>
                <Image
                  source={require('../assets/flat-icons/angle-small-right.png')}
                  style={styles.navIcon}
                />
              </TouchableOpacity>
            </View>

            {/* Weekdays */}
            <View style={styles.weekRow}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => (
                <Text key={d} style={styles.weekDay}>
                  {d}
                </Text>
              ))}
            </View>

            {/* Dates */}
            <View style={styles.datesGrid}>
              {calendarDays.map((day, i) => {
                const isOutside = day == null;
                const isSelected = day === selectedDay;

                return (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.dateBox,
                      isSelected && styles.dateBoxSelected,
                      isOutside && styles.dateBoxOutside,
                    ]}
                    onPress={() => {
                      if (!isOutside) {
                        setSelectedDay(day!);
                      }
                    }}
                    disabled={isOutside}
                    activeOpacity={0.6}
                  >
                    <Text
                      style={[
                        styles.dateText,
                        isSelected && styles.dateTextSelected,
                        isOutside && styles.dateTextOutside,
                      ]}
                    >
                      {day ?? ''}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Events for that day */}
          <Text style={styles.sectionTitle}>
            {monthName} {year} Events
          </Text>
          {isFetchingEvents && !agendaEvents?.length ? (
            <ActivityIndicator color={colors.primary} style={{ marginTop: 20 }} />
          ) : (
            agendaEvents?.map((content, index) => (
              <Announcement
                key={index}
                title={content.title || ''}
                image={content.images?.[0]?.image_url || ''}
                body={content.description || ''}
                location={content.event?.event_location || 'Istanbul, Turkey'}
                date={content.created_at || ''}
                type={content.content_type?.name || ''}
                style={[
                  styles.announcement,
                  index === agendaEvents.length - 1 && styles.lastAnnouncement,
                ]}
                onPress={() => navigation.navigate('Announcement', { id: content.id || 0 })}
              />
            ))
          )}
        </ScrollView>
      ) : (
        /* LIST VIEW */
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {/* Category Grid */}
          <View style={styles.categories}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryBox,
                  selectedCategoryId === category.id && styles.selectedCategoryBox,
                ]}
                onPress={() => handleCategoryPress(category.id)}
              >
                <Icon
                  source={
                    category.icon_dark
                      ? { uri: selectedCategoryId === category.id ? category.icon_light : category.icon_dark }
                      : require('../assets/flat-icons/crown.png')
                  }
                  size={18}
                />
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategoryId === category.id && styles.selectedCategoryText,
                  ]}
                >
                  {category.type_name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>All Events</Text>
          {(isFetchingEvents || isFetchingContentTypes) ? (
            <ActivityIndicator color={colors.primary} style={{ marginTop: 20 }} />
          ) : (
            events?.map((content, index) => (
              <Announcement
                key={index}
                title={content.title || ''}
                image={content.images?.[0]?.image_url || ''}
                body={content.description || ''}
                location={content.event?.event_location || 'Istanbul, Turkey'}
                date={content.created_at || ''}
                type={content.content_type?.name || ''}
                style={[
                  styles.announcement,
                  index === events.length - 1 && styles.lastAnnouncement,
                ]}
                onPress={() => navigation.navigate('Announcement', { id: content.id || 0 })}
              />
            ))
          )}
        </ScrollView>
      )}
       <View style={styles.sectionBottom}>
            {/*Overlay bottom tab */}
        </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const dateSize = (width - 32) / 7 - 4;

const createStyles = (colors: any) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    headerContainer: {
      padding: 8,
      justifyContent: 'space-between',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    logo: {
      width: 85,
      height: 40,
      marginBottom: 6,
      marginLeft: 4,
    },
    crown: {
      width: 20,
      height: 20,
    },
    headerRight: {
      flexDirection:'row',
      verticalAlign:'middle',
      paddingBottom:12,
      paddingLeft:30,
      alignItems: 'center',
    },
    crownRight: {
      marginLeft:-58,
      marginTop: 12,
      flexDirection: 'row',
      verticalAlign: 'middle',
      paddingHorizontal: 4,
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 1,
    },
    upgradeButton: {
      backgroundColor: '#C2185B',
      borderRadius: 20,
    },
    upgradeButtonLabel: {
      marginLeft: 4,
      fontSize: 12,
    },
    iconRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    appbarHeader: {
      width: '100%',
      backgroundColor: 'transparent',
      alignContent: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    appbarActionRight: {
      backgroundColor: colors.onPrimary || '#FFFFFF',
      marginRight: 5,
      marginTop: 20,
    },
    titleContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    interestText: {
      fontWeight: 'bold',
      paddingLeft: 0,
      marginLeft: -40,
    },
    segment: {
      flexDirection: 'row',
      margin: 16,
      backgroundColor: '#f0f0f0',
      borderRadius: 20,
    },
    segmentButton: {
      flex: 1,
      paddingVertical: 8,
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: '#fff',
    },
    segmentButtonActive: {
      backgroundColor: colors.primary,
    },
    segmentText: {
      color: '#777',
      fontWeight: '500',
    },
    segmentTextActive: {
      color: '#fff',
    },
    container: {
      paddingHorizontal: 16,
      paddingBottom: 24,
    },
    calHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    calendarContainer: {
      backgroundColor: '#fff',
      borderRadius: 20,
      elevation: 2,
      padding: 6,
    },
    navIconTouch: {
      borderRadius: 15,
      padding: 6,
      tintColor: colors.primary,
      backgroundColor: colors.onPrimary,
    },
    navIcon: {
      width: 20,
      height: 20,
    },
    calTitle: {
      fontSize: 16,
      fontWeight: '600',
    },
    weekRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    weekDay: {
      width: dateSize,
      textAlign: 'center',
      color: '#777',
    },
    datesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      gap: 8,
      marginTop: 8,
      backgroundColor: '#fff',
    },
    dateBox: {
      width: dateSize - 5,
      height: dateSize - 5,
      marginBottom: 8,
      borderRadius: dateSize / 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    dateBoxSelected: {
      backgroundColor: '#f5e8c7',
    },
    dateText: {
      fontSize: 14,
      color: '#000',
    },
    dateTextSelected: {
      color: '#000',
      fontWeight: 'bold',
    },
    dateBoxOutside: {
      backgroundColor: 'transparent',
    },
    dateTextOutside: {
      color: 'transparent',
    },
    sectionTitle: {
      marginTop: 24,
      marginBottom: 12,
      fontSize: 16,
      fontWeight: '600',
    },
    card: {
      marginBottom: 16,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: '#fff',
      elevation: 2,
    },
    cardImage: {
      width: '100%',
      height: 140,
    },
    cardContent: {
      padding: 12,
    },
    eventBadge: {
      backgroundColor: '#f5e8c7',
      alignSelf: 'flex-start',
      borderRadius: 4,
      paddingHorizontal: 6,
      paddingVertical: 2,
      marginBottom: 6,
      fontSize: 10,
      fontWeight: '700',
    },
    cardTitle: {
      marginBottom: 4,
    },
    categories: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    categoryBox: {
      width: '48%',
      height: 98,
      marginBottom: 12,
      borderRadius: 10,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedCategoryBox: {
      backgroundColor: colors.primary,
    },
    categoryText: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '500',
    },
    selectedCategoryText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    announcement: {
      marginBottom: 8,
    },
    lastAnnouncement: {
      marginBottom: 0,
    },
    sectionBottom:{
        height:100,
    },
  });

export default Events;
