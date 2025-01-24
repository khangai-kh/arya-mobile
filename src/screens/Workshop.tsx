import { StackScreenProps } from '@react-navigation/stack';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Appbar, Button, Card, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { MainStackParams } from '../models/navigation';
type WorkshopProps = StackScreenProps<MainStackParams, 'Workshop'>;

export const Workshop = (props: WorkshopProps) => {

    const { navigation } = props;
    const { colors } = useTheme();

    const [
        workshop,
        setWorkshop
    ] = useState({
        title: "Entrepreneur Workshops",
        image: "",
        organizer: "Akbank & Arya",
        information: `Arya'nın, Akbank partnerliğinde düzenlediği, girişimcilere yönelik dönemlik eğitim serisidir. Girişimcilerin en çok karşılaştığı problemleri çözmeye yönelik pratik bilgiler ve vakalar içeren Akbank Girişimci Atölyelerimizde; alanında güçlü konuşmacıları, Türkiye'nin başarılı şirket sahibi girişimcileri ile buluşturuyoruz.  Girişimci atölyesinde Verilen Eğitimler Her yıl yüzlerce girişimcinin, işini büyütmesine destek olan Girişimci Atölyeleri programımıza katılım tamamen ücretsizdir ve herkesin başvurusuna açıktır. Akbank ve Arya tarafından düzenlenen, atölyeye davet edilen girişimciler, kendilerini geliştirme ve işlerini farklı bir bakış açısıyla değerlendirme şansı yakalar. Etkinlik hybrid olarak gerçekleşecektir.`,
        location: "Assembly One Tower, Ankara & Online",
        locationDetail: "Oran, One Tower AVM, Kudüs Cd. 6/A Kat:1, 06550 Çankaya/Ankara",
        date: `07.06.2024 13: 30-18:00`
    });

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
                        paddingTop: '60%',
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
                            Workshop
                        </Text>
                    </Box>
                    <Text
                        variant='titleLarge'
                        style={{
                            marginTop: 28,
                            marginBottom: 4
                        }}
                    >
                        {workshop.title}
                    </Text>
                    <Text>
                        {workshop.organizer}
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
                                    {dayjs(workshop.date).format('MMMM DD,YYYY')}
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
                                        {workshop.location}
                                    </Text>
                                    <Text
                                        variant="bodySmall"
                                        style={{
                                            fontWeight: 300
                                        }}
                                    >
                                        {workshop.locationDetail}
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
                            {workshop.information}
                        </Text>
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
                    disabled
                    onPress={() => {

                    }}
                >
                    Join the event
                </Button>
            </Box>
        </SafeAreaView>
    );
};