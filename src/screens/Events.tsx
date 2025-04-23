// src/screens/EventsScreen.tsx
import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Appbar, Text, useTheme, MD3Theme } from 'react-native-paper';
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


type Category = {
    id: number;
    name: string;
    icon_url?: string;
  };

const categories: Category[] = [
    { id: 1, name: 'Galas', icon_url: 'star' },
    { id: 2, name: 'Retreats', icon_url: 'paintbrush' },
    { id: 3, name: 'Startup Programs', icon_url: 'rocket' },
    { id: 4, name: 'Investor Events', icon_url: 'diamond' },
    { id: 5, name: 'Arya Gathering', icon_url: 'group' },
    { id: 6, name: 'Club Events', icon_url: 'sparkles' },
  ];

type EventsProps = StackScreenProps<MainStackParams, 'Events'>;

export const Events = ({navigation}: EventsProps) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const { token } = useSelector((s: RootState) => s.auth);
    const [page, setPage] = useState(DEFAULT_PAGE);
    const [events, setEvents] = useState<ContentModel[]>([]);
    const [hasMore, setHasMore] = useState(true);
    // --- VIEW MODE ---
    const [viewMode, setViewMode] = useState<'agenda'|'list'>('agenda');
    // --- AGENDA STATE ---
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date());
    // if the calendar is initially on the current month/year, pre-select today:
    const [selectedDay, setSelectedDay] = useState<number | null>(() => {
        return currentDate.getMonth() === today.getMonth()
            && currentDate.getFullYear() === today.getFullYear()
            ? today.getDate()
            : null;
    });
    const monthName = useMemo(
        () => currentDate.toLocaleString('default', { month: 'long' }),
        [currentDate]
    );
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0–11
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const goPrev = () =>
        setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    const goNext = () =>
        setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

    // build calendar grid
    const calendarDays = useMemo(() => {
        const firstDow = new Date(year, month, 1).getDay(); // Sun=0…Sat=6
        const offset = (firstDow + 6) % 7; // shift so Mon=0…Sun=6
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const arr: Array<number|null> = [];
        for (let i = 0; i < offset; i++) {arr.push(null);}
        for (let d = 1; d <= daysInMonth; d++) {arr.push(d);}
        return arr;
    }, [year, month]);

    // --- LIST STATE ---
    const [selectedCategoryId, setSelectedCategoryId] = useState<number| null>(null);

    const fetchEvents = useCallback(
        async (pageNum: number) => {
          const response = await API.get('/api/contents', {
            params: {
              page: pageNum,
              page_size: PAGE_SIZE,
              category_id: 1,
            },
          });
          return response.data || [];
        },
        []
    );

    const { isFetching: isFetchingEvents } = useQuery(
    ['events', page, PAGE_SIZE, token, selectedCategoryId],
    () => fetchEvents(page),
    {
        onSuccess: (data) => {
        if (page === DEFAULT_PAGE) {
            setEvents(data);
        } else {
            setEvents((prev) => [...prev, ...data]);
        }
        setHasMore(data.length === PAGE_SIZE);
        },
        enabled: !isLoadingMore,
    }
    );

    const loadMore = useCallback(async () => {
    if (!isLoadingMore && hasMore && !isFetchingEvents) {
        setIsLoadingMore(true);
        const nextPage = page + 1;
        try {
        const newData = await fetchEvents(nextPage);
        setEvents((prev) => [...prev, ...newData]);
        setPage(nextPage);
        setHasMore(newData.length === PAGE_SIZE);
        } catch (error) {
        console.error('Error loading more events:', error);
        } finally {
        setIsLoadingMore(false);
        }
    }
    }, [isLoadingMore, hasMore, isFetchingEvents, page, fetchEvents]);

    const handleCategoryPress = (categoryId: number) => {
        setSelectedCategoryId(categoryId === selectedCategoryId ? null : categoryId);
        setPage(DEFAULT_PAGE);
        //setEvents([]);
      };
    // filter for agenda
    const agendaEvents = useMemo(() => {
        if (selectedDay === null) {return [];}

        // build a Date object for the selected cell
        const selectedDate = new Date(year, month, selectedDay);

        return events.filter(e => {
          const eventDateStr = e.event?.event_date;
          if (!eventDateStr) {return false;}

          const eventDate = new Date(eventDateStr);
          return (
            eventDate.getFullYear() === selectedDate.getFullYear() &&
            eventDate.getMonth()     === selectedDate.getMonth() &&
            eventDate.getDate()      === selectedDate.getDate()
          );
        });
      }, [events, selectedDay, year, month]);

    const handleScroll = ({ nativeEvent }: any) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const paddingToBottom = 20;
        if (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom
        ) {
            loadMore();
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <Appbar.Header style={styles.appbarHeader}>
                <Appbar.Action
                icon={require('../assets/flat-icons/angle-small-left.png')}
                color="#414042"
                size={20}
                style={styles.appbarActionRight}
                onPress={() => navigation.goBack()}
                />
                <Appbar.Content
                    title={
                        <View style={styles.titleContainer}>
                            <Text variant="titleMedium" style={styles.interestText}>
                                Events
                            </Text>
                        </View>
                    }
                />
            </Appbar.Header>

            {/* Segmented Control */}
            <View style={styles.segment}>
                {['agenda','list'].map(mode => (
                <TouchableOpacity
                    key={mode}
                    style={[
                    styles.segmentButton,
                    viewMode === mode && styles.segmentButtonActive,
                    ]}
                    onPress={() => setViewMode(mode as any)}
                >
                    <Text
                    style={[
                        styles.segmentText,
                        viewMode === mode && styles.segmentTextActive,
                    ]}
                    >
                    {mode === 'agenda' ? 'Agenda' : 'Events List'}
                    </Text>
                </TouchableOpacity>
                ))}
            </View>

            {viewMode === 'agenda' ? (
                <ScrollView contentContainerStyle={styles.container}>
                    {/* Calendar Header */}
                    <View style={styles.calHeader}>
                        <TouchableOpacity onPress={goPrev}>
                        <Image
                            source={require('../assets/flat-icons/angle-small-left.png')}
                            style={styles.navIcon}
                        />
                        </TouchableOpacity>
                        <Text style={styles.calTitle}>
                        {monthName} {year}
                        </Text>
                        <TouchableOpacity onPress={goNext}>
                        <Image
                            source={require('../assets/flat-icons/angle-small-right.png')}
                            style={styles.navIcon}
                        />
                        </TouchableOpacity>
                    </View>

                    {/* Weekdays */}
                    <View style={styles.weekRow}>
                        {['M','T','W','T','F','S','S'].map(d => (
                        <Text key={d} style={styles.weekDay}>{d}</Text>
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
                                onPress={() => !isOutside && setSelectedDay(day!)}
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

                    {/* Events for that day */}
                    <Text style={styles.sectionTitle}>
                        {monthName} {year} Events
                    </Text>
                    {isFetchingEvents && !agendaEvents.length ? (
                        <ActivityIndicator color={colors.primary} style={{marginTop:20}}/>
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
                                    index === events.length - 1 && styles.lastAnnouncement,
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
                <View style={styles.chipContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryBox1,
                            selectedCategoryId === category.id && styles.selectedCategoryBox,
                            ]}
                            onPress={() => handleCategoryPress(category.id)}
                        >
                            <Text
                            style={[
                                styles.categoryText1,
                                selectedCategoryId === category.id && styles.selectedCategoryText,
                            ]}
                            >
                            {category.name}
                            </Text>
                        </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <Text style={styles.sectionTitle}>All Events</Text>
                {isFetchingEvents ? (
                    <ActivityIndicator color={colors.primary} style={{marginTop:20}}/>
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
        </SafeAreaView>
    );
};

const { width } = Dimensions.get('window');
const dateSize = (width - 32) / 7 - 4;

const createStyles = (colors: MD3Theme['colors']) =>
    StyleSheet.create({
        safeArea: {
            flex: 1,
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
            marginLeft:-40,
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
        navIcon: {
             width: 28,
             height: 28,
             tintColor: colors.primary,
        },
        calTitle: {
            fontSize: 18,
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
            gap:4,
            marginTop: 8,
        },
        dateBox: {
            width: dateSize,
            height: dateSize,
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
            color: '#000',
        },
        dateTextSelected: {
            color: '#000',
            fontWeight: 'bold',
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
            height: 80,
            marginBottom: 12,
            borderRadius: 8,
            backgroundColor: '#fff',
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: colors.outline,
            justifyContent: 'center',
            alignItems: 'center',
        },
        categoryBoxActive: {
            backgroundColor: colors.primary,
        },
        categoryIcon: {
            width: 28,
            height: 28,
            marginBottom: 4,
            tintColor: colors.primary,
        },
        categoryText: {
            fontSize: 12,
            color: colors.primary,
            fontWeight: '500',
        },
        dateBoxOutside: {
            backgroundColor: 'transparent',        // completely white       // light gray ring
        },
        dateTextOutside: {
            color: 'transparent',           // hide the placeholder text
        },
        activeTabText: {
            color: '#fff',
            fontWeight: 'bold',
        },
        chipContainer: {
            marginBottom: 16,
        },
        categoryBox1: {
            padding: 10,
            borderRadius: 15,
            backgroundColor: '#f5f5f5',
            marginHorizontal: 5,
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 100,
        },
        selectedCategoryBox: {
            backgroundColor: colors.primary,
        },
        categoryText1: {
            fontSize: 12,
            color: colors.primary,
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
    });
