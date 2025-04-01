import React, { useState, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import dayjs from 'dayjs';
import { ActivityIndicator, Image, ImageBackground, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Appbar, Avatar, Button, Card, MD3Theme, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { MainStackParams } from '../models/navigation';
import { ContentDetailModel } from '../models/homepage/Content/content.model';
import { API } from '../plugins/axios';
import HTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

type AnnouncementProps = StackScreenProps<MainStackParams, 'Announcement'>;

export const Announcement = (props: AnnouncementProps) => {
  const { navigation, route } = props;
  const { colors } = useTheme();
  const dynamicStyles = createDynamicStyles(colors);
  const contentId = route.params?.id;
  const [content, setContent] = useState<ContentDetailModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { width } = useWindowDimensions();

  console.log(contentId);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await API.get(`/api/content-by-id?id=${contentId}`);
        console.log('API Response:', response.data); // Debug log
        setContent(response.data);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    if (contentId) {
      fetchContent();
    }
  }, [contentId]);

  if (loading) {
    return (
      <View style={dynamicStyles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !content) {
    return (
      <View style={dynamicStyles.loaderContainer}>
        <Text>{error || 'No content available'}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          resizeMode="cover"
          source={
            content?.images && content.images.length > 0 && content.images[0].image_url
              ? { uri: content.images[0].image_url }
              : require('../assets/dummy-image-1.jpeg')
          }
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
              {content.content_type?.name || 'N/A'}
            </Text>
          </Box>
          <Text variant="titleLarge" style={styles.title}>
            {content.title || 'Untitled'}
          </Text>
          {content.content_type?.name === 'Event' && (
            <Text variant="titleSmall" style={styles.titleSub}>
              {content.event?.max_participants || 'N/A'} participants
            </Text>
          )}
           {content.content_type?.name !== 'Event' &&(<View style={styles.userContainer}>
              <Avatar.Image
                  size={24}
                  source={
                    content.created_user.photo ? { uri: content.created_user.photo } : require('../assets/avatar.png')
                  }
                  style={styles.avatar}
                />
                <Text>{content.created_user.full_name || 'Untitled'}</Text>
          </View>)}
          {content.content_type?.name === 'Event' && (<Card mode="contained" style={styles.card}>
            <Card.Content>
              <View style={styles.calendarContainer}>
                <Image
                  source={require('../assets/flat-icons/calendar-outlined.png')}
                  style={dynamicStyles.calendarIcon}
                />
                <Text variant="titleSmall">
                  {content.created_at 
                    ? dayjs(content.created_at).format('MMMM DD,YYYY')
                    : 'Date not available'}
                </Text>
              </View>
              <View style={styles.locationContainer}>
                <Image
                  source={require('../assets/flat-icons/marker-outlined.png')}
                  style={dynamicStyles.markerIcon}
                />
                <View style={styles.flexOne}>
                  <Text variant="titleSmall">
                    {content.events?.event_location || 'Location not specified'}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>)}
          <View style={styles.contentContainer}>
          <Text>
            {content.description ? (
              <HTML
                source={{ html: content.description }}
                contentWidth={width}
              />
            ) : (
              'No description available'
            )}
          </Text>
              {content.content_type?.name === 'Event' && (
                <>
                  <Text variant="titleSmall" style={styles.hostsTitle}>
                    Host
                  </Text>
                  <View  style={styles.userContainer}>
                    <Avatar.Image
                        size={40}
                        source={
                          content.created_user.photo ? { uri: content.created_user.photo } : require('../assets/avatar.png')
                        }
                        style={styles.avatar}
                      />
                      <Text>{content.created_user.full_name || 'Untitled'}</Text>
                </View>
                <View style={styles.hostContainer}>
                  <Text style={styles.hostText}>{content.created_user?.title}</Text>
                </View>
                </>
              )}
          </View>
        </Box>
      </ScrollView>
      {content.content_type?.name === 'Event' && (
        <Box px={16} py={16} style={dynamicStyles.bottomBox}>
          <Button
            mode="contained"
            onPress={() => {}}
          >
            Join the event
          </Button>
      </Box>
      )}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    marginTop: 38,
    marginBottom: 10,
  },
  titleSub: {
    marginBottom: 10,
    fontWeight: '300',
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
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  hostContainer: {
    marginBottom:20,
  },
  hostRow: {
    flexDirection: 'row',
  },
  hostNameUpper: {
    textTransform: 'uppercase',
  },
  bodySmall: {
    fontWeight: '300',
  },
  avatar: {
    backgroundColor: '#f2f4f7',
    marginRight: 4.5,
  },
  hostText:{
    marginTop:20,
  }
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