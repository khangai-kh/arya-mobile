import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { default as LinearGradient } from 'react-native-linear-gradient';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { AppStackParams } from '../navigation/App';

type AnnouncementProps = StackScreenProps<AppStackParams, 'Announcement'>;

export const Announcement = (props: AnnouncementProps) => {
    const {
        navigation,
        route
    } = props;
    const { colors } = useTheme();

    const [
        announcement,
        setAnnouncement
    ] = useState({
        title: "Arya Retreat'24",
        image: "",
        body: "Freedom: Manage Your Money, Discover Your Power",
        location: "Tasigo Hotel Eskişehir",
        date: "2024-09-24",
        type: "Event",
    });
    const [
        types,
        setTypes
    ] = useState([
        {
            id: 0,
            value: 'Event'
        },
        {
            id: 1,
            value: 'Investment'
        },
        {
            id: 2,
            value: 'Funding'
        },
        {
            id: 3,
            value: 'Workshop'
        },
        {
            id: 4,
            value: 'Webinar'
        },
        {
            id: 5,
            value: 'Success'
        },
    ]);

    return (

        <SafeAreaView
            style={{
                flex: 1
            }}
            edges={[
                'bottom'
            ]}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground
                    resizeMode="cover"
                    source={require('../assets/dummy-image-1.png')}
                    style={{
                        position: 'relative',
                        paddingTop: '56.25%',
                        backgroundColor: '#f2f4f7'
                    }}
                >
                    <LinearGradient
                        style={{
                            ...StyleSheet.absoluteFillObject
                        }}
                        colors={[
                            '#00000099',
                            '#00000000'
                        ]}
                    >
                        <Appbar.Header style={{
                            backgroundColor: 'transparent'
                        }}>
                            <Appbar.Action
                                icon={require('../assets/flat-icons/chevron-left.png')}
                                color="#414042"
                                style={{
                                    backgroundColor: colors.onPrimary
                                }}
                                onPress={() => {
                                    navigation.goBack();
                                }}
                            />
                        </Appbar.Header>
                    </LinearGradient>
                </ImageBackground>
                <Box px={16}>
                    <Text>
                        body
                    </Text>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
};