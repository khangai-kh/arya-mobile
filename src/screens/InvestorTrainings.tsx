import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, MD3Theme, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainStackParams } from '../models/navigation';
import { ContentModel } from '../models/homepage/Content';
import { API } from '../plugins/axios';
import { DEFAULT_PAGE, PAGE_SIZE } from '../constants/constants';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';
import { Inspiration } from '../components/Inspiration';

type InvestorTrainingsProps = StackScreenProps<MainStackParams, 'InvestorTrainings'>;

export const InvestorTrainings = (props: InvestorTrainingsProps) => {
    const { navigation } = props;
    const { colors } = useTheme();
    const dynamicStyles = createDynamicStyles(colors);
    const [trainings, setTrainings] = useState<ContentModel[]>([]);
    const { token } = useSelector((state: RootState) => state.auth);

    const { isFetching } = useQuery(
        ['trainings', DEFAULT_PAGE, PAGE_SIZE, token],
        async () => {
            const [announcementsResponse] = await Promise.all([
                API.get('/api/contents', {
                    params: {
                        page: DEFAULT_PAGE,
                        page_size: PAGE_SIZE,
                        content_type_id: 1, // Investor Trainings
                    },
                }),
            ]);
            return {
                announcements: announcementsResponse.data || [],
            };
        },
        {
            onSuccess: (data) => {
                const announcements = Array.isArray(data.announcements) ? data.announcements : [];
                console.log('Investor Trainings:', announcements);
                setTrainings(announcements);
            },
            onError: (error) => {
                console.error('Error fetching trainings:', error);
                setTrainings([]);
            },
        }
    );

    if (isFetching) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <Appbar.Header style={styles.appbarHeader}>
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
                            <Text variant="titleMedium" style={dynamicStyles.interestText}>
                                Investor Trainings
                            </Text>
                        </View>
                    }
                />
            </Appbar.Header>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {trainings.length > 0 ? (
                        trainings.map((inspiration, index) => (
                            <Inspiration
                                key={index}
                                title={inspiration.title || ''}
                                image={inspiration.images?.[0]?.image_url || ''}
                                profileImage={inspiration.created_user?.photo}
                                name={inspiration.created_user?.full_name || ''}
                                date={inspiration.date}
                                style={[styles.inspiration, index === trainings.length - 1 && styles.lastInspiration]}
                                onPress={() => navigation.navigate('Announcement', { id: inspiration.id || 0 })}
                            />
                        ))
                    ) : (
                        <Text style={styles.noDataText}>No trainings available</Text>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const createDynamicStyles = (colors: MD3Theme['colors']) =>
    StyleSheet.create({
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
    });

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop: 24,
        marginHorizontal: 16,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inspiration: {
        marginBottom: 8,
    },
    lastInspiration: {
        marginBottom: 0,
    },
    appbarHeader: {
        width: '100%',
        backgroundColor: 'transparent',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#414042',
    },
});
