import { StackScreenProps } from '@react-navigation/stack';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { default as LinearGradient } from 'react-native-linear-gradient';
import { Appbar, Button, Card, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { MainStackParams } from '../models/navigation';

type AnnouncementProps = StackScreenProps<MainStackParams, 'Announcement'>;

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
        information: `The highly anticipated Arya Retreat'24 will take place in Eskişehir between September 27 - 28 - 29! The biggest 3-day event of the year will bring together the leading names of the entrepreneurship and investment ecosystem.
“Freedom: Manage Your Money, Discover Your Power”, we will focus on discovering our own potential and making our lives shine like stars. You will come together on different topics every day and discover the secrets to become the star of your life.`,
        location: "Tasigo Hotel Eskişehir",
        locationDetail: "Dede Mahallesi, Haktanır Sokak No:1 Bademlik, 26030 Odunpazarı/Eskişehir",
        date: "2024-09-24",
        type: "Event",
    });

    const [hosts] = useState([
        {
            id: 0,
            name: 'Ahu Serter',
            role: 'Arya WIP, Founder, GP & CEO',
            bio: "Ahu Serter is a serial entrepreneur and investor. She is the founder of Fark Labs, a global innovation and transformation center, Arya Women Investment Platform, a social enterprise and F+Ventures, a corporate venture capital firm. In 2022, she founded Arya Venture Capital Investment Fund, Turkey's first gender-focused impact investment fund."
        }
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
                    source={require('../assets/dummy-image-1.jpeg')}
                    style={{
                        position: 'relative',
                        paddingTop: '64%',
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
                                icon={require('../assets/flat-icons/angle-small-left.png')}
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
                <Box
                    px={16}
                    mt={24}
                >
                    <Box
                        px={12}
                        py={3}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 12,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: 32,
                            backgroundColor: '#F5EF99'
                        }}
                    >
                        <Text variant="labelSmall">
                            {announcement.type}
                        </Text>
                    </Box>
                    <Text
                        variant='titleLarge'
                        style={{
                            marginTop: 28,
                            marginBottom: 4
                        }}
                    >
                        {announcement.title}
                    </Text>
                    <Text>
                        {announcement.body}
                    </Text>
                    <Card
                        mode='contained'
                        style={{
                            marginTop: 12,
                            backgroundColor: '#fff'
                        }}
                    >
                        <Card.Content>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginLeft: 8
                                }}
                            >
                                <Image
                                    source={require('../assets/flat-icons/calendar-outlined.png')}
                                    style={{
                                        width: 14,
                                        height: 14,
                                        marginRight: 8,
                                        tintColor: colors.primary
                                    }}
                                />
                                <Text variant="titleSmall">
                                    {dayjs(announcement.date).format('MMMM DD,YYYY')}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    marginLeft: 8,
                                    marginTop: 8
                                }}
                            >
                                <Image
                                    source={require('../assets/flat-icons/marker-outlined.png')}
                                    style={{
                                        width: 14,
                                        height: 14,
                                        marginRight: 8,
                                        tintColor: colors.primary
                                    }}
                                />
                                <View style={{ flex: 1 }}>
                                    <Text variant="titleSmall">
                                        {announcement.location}
                                    </Text>
                                    <Text
                                        variant="bodySmall"
                                        style={{
                                            fontWeight: 300
                                        }}
                                    >
                                        {announcement.locationDetail}
                                    </Text>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                    <View
                        style={{
                            marginTop: 12
                        }}
                    >
                        <Text>
                            {announcement.information}
                        </Text>
                        <Text
                            variant='titleSmall'
                            style={{
                                marginVertical: 12,
                                fontWeight: 500,
                                textTransform: 'uppercase'
                            }}
                        >
                            Hosts
                        </Text>
                        {hosts.map((host, index) => (
                            <View
                                style={{
                                    marginBottom: hosts.length === index ? 0 : 8
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row'
                                    }}
                                >
                                    <Text>
                                        <Text style={{ textTransform: 'uppercase' }}>{host.name}</Text> - {host.role}
                                    </Text>
                                </View>
                                <Text>{host.bio}</Text>
                            </View>
                        ))}
                    </View>
                </Box>
            </ScrollView>
            <Box
                px={16}
                py={16}
                style={{
                    borderTopWidth: StyleSheet.hairlineWidth,
                    borderColor: colors.outlineVariant
                }}
            >
                <Button
                    mode="contained"
                    onPress={() => {

                    }}
                >
                    Join the event
                </Button>
            </Box>
        </SafeAreaView>
    );
};