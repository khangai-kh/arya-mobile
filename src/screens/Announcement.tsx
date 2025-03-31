import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import dayjs from 'dayjs';
import { ActivityIndicator, Image, ImageBackground, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Appbar, Button, Card, MD3Theme, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { MainStackParams } from '../models/navigation';
import { ContentDetailModel } from '../models/homepage/Content/content.model';
import { API } from '../plugins/axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';
import { useQuery } from 'react-query';

type AnnouncementProps = StackScreenProps<MainStackParams, 'Announcement'>;

export const Announcement = (props: AnnouncementProps) => {
  const { navigation, route } = props;
  const { colors } = useTheme();
  const dynamicStyles = createDynamicStyles(colors);
  const contentId = route.params?.id;
  const { token } = useSelector((state: RootState) => state.auth);
  const [content, setContent] = useState<ContentDetailModel>();

  useQuery(
    ['content', token],
    async () => {
      const { data } = await API.get('/api/content-by-id?id=' + contentId);
      setContent(data || []);
    }
  );

  const [hosts] = useState([
    {
      id: 0,
      name: 'Ahu Serter',
      role: 'Arya WIP, Founder, GP & CEO',
      bio: "Ahu Serter is a serial entrepreneur and investor. She is the founder of Fark Labs, a global innovation and transformation center, Arya Women Investment Platform, a social enterprise and F+Ventures, a corporate venture capital firm. In 2022, she founded Arya Venture Capital Investment Fund, Turkey's first gender-focused impact investment fund."
    }
  ]);

  if (!content) {
    return (
      <View style={dynamicStyles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          resizeMode="cover"
          source={require('../assets/dummy-image-1.jpeg')}
          style={styles.imageBackground}
        >
          <LinearGradient
            style={styles.linearGradient}
            colors={['#00000099', '#00000000']}
          >
            <Appbar.Header style={styles.appBarHeader}>
              <Appbar.Action
                icon={require('../assets/flat-icons/angle-small-left.png')}
                color="#414042"
                style={dynamicStyles.appBarAction}
                onPress={() => navigation.goBack()}
              />
            </Appbar.Header>
          </LinearGradient>
        </ImageBackground>
        <Box px={16} mt={24}>
          <Box px={12} py={3} style={styles.hostBadge}>
            <Text variant="labelSmall">
              {content?.content_type?.name}
            </Text>
          </Box>
          <Text variant="titleLarge" style={styles.title}>
            {content?.title}
          </Text>
          <Text>{content?.title}</Text>
          <Card mode="contained" style={styles.card}>
            <Card.Content>
              <View style={styles.calendarContainer}>
                <Image
                  source={require('../assets/flat-icons/calendar-outlined.png')}
                  style={dynamicStyles.calendarIcon}
                />
                <Text variant="titleSmall">
                  {dayjs(content?.created_at).format('MMMM DD,YYYY')}
                </Text>
              </View>
              <View style={styles.locationContainer}>
                <Image
                  source={require('../assets/flat-icons/marker-outlined.png')}
                  style={dynamicStyles.markerIcon}
                />
                <View style={styles.flexOne}>
                  <Text variant="titleSmall">
                    {content?.events?.event_location}
                  </Text>
                  <Text variant="bodySmall" style={styles.bodySmall}>
                    {content?.events?.max_participants}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
          <View style={styles.contentContainer}>
            <Text>{content?.description}</Text>
            <Text variant="titleSmall" style={styles.hostsTitle}>
              Hosts
            </Text>
            {hosts.map((host, index) => (
              <View
                key={host.id}
                style={[
                  styles.hostContainer,
                  { marginBottom: index === hosts.length - 1 ? 0 : 8 }
                ]}
              >
                <View style={styles.hostRow}>
                  <Text>
                    <Text style={styles.hostNameUpper}>{host.name}</Text> - {host.role}
                  </Text>
                </View>
                <Text>{host.bio}</Text>
              </View>
            ))}
          </View>
        </Box>
      </ScrollView>
      <Box px={16} py={16} style={dynamicStyles.bottomBox}>
        <Button
          mode="contained"
          onPress={() => {}}
        >
          Join the event
        </Button>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  imageBackground: {
    position: 'relative',
    paddingTop: '64%',
    backgroundColor: '#f2f4f7',
  },
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  appBarHeader: {
    backgroundColor: 'transparent',
  },
  hostBadge: {
    position: 'absolute',
    top: 0,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 32,
    backgroundColor: '#F5EF99',
  },
  title: {
    marginTop: 28,
    marginBottom: 4,
  },
  card: {
    marginTop: 12,
    backgroundColor: '#fff',
  },
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 8,
    marginTop: 8,
  },
  flexOne: {
    flex: 1,
  },
  contentContainer: {
    marginTop: 12,
  },
  hostsTitle: {
    marginVertical: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  hostContainer: {},
  hostRow: {
    flexDirection: 'row',
  },
  hostNameUpper: {
    textTransform: 'uppercase',
  },
  bodySmall: {
    fontWeight: '300',
  },
});

const createDynamicStyles = (colors: MD3Theme['colors']) =>
  StyleSheet.create({
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    appBarAction: {
      backgroundColor: colors.onPrimary,
    },
    calendarIcon: {
      width: 14,
      height: 14,
      marginRight: 8,
      tintColor: colors.primary,
    },
    markerIcon: {
      width: 14,
      height: 14,
      marginRight: 8,
      tintColor: colors.primary,
    },
    bottomBox: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: colors.outlineVariant,
    },
  });
