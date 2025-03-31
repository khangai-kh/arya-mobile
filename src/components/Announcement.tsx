import React from 'react';
import {
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { Box } from './common/Box';
import dayjs from 'dayjs';

type AnnouncementProps = Omit<TouchableOpacityProps, 'activeOpacity'> & {
  title: string;
  image: string;
  body: string;
  location: string;
  date: string;
  type: string;
};

export const Announcement = ({
  style,
  title,
  image,
  body,
  location,
  date,
  type,
  ...otherProps
}: AnnouncementProps) => {
  const { colors } = useTheme();
  const {
    container,
    imageBackground,
    typeBox,
    title: titleStyle,
    body: bodyStyle,
    footer,
    locationContainer,
    dateContainer,
    icon,
    textLight,
  } = styles(colors);

  return (
    <TouchableOpacity {...otherProps} style={[container, style]}>
      <ImageBackground
        resizeMode="cover"
        source={image ? { uri: image } : require('../assets/dummy-image-1.jpeg')}
        style={imageBackground}
      />
      {type !== undefined && (
        <Box px={12} py={3} style={typeBox}>
          <Text variant="labelSmall">{type}</Text>
        </Box>
      )}
      <Box px={12} py={8}>
        <Text
            variant="titleMedium"
            numberOfLines={1}
            style={titleStyle}>
          {title}
        </Text>
        <Text
          variant="bodyMedium"
          numberOfLines={2}
          ellipsizeMode="tail"
          style={bodyStyle}
        >
          {body}
        </Text>
        <View style={footer}>
        {type === 'Event' && (
          <View style={locationContainer}>
            <Image
              source={require('../assets/flat-icons/marker.png')}
              style={icon}
            />
            <Text variant="bodyMedium" numberOfLines={1} style={textLight}>
              {location}
            </Text>
          </View>
        )}
          <View style={dateContainer}>
              <Image
              source={require('../assets/flat-icons/calendar.png')}
              style={icon}
              />
              <Text
                  variant="bodyMedium"
                  numberOfLines={1}
                  style={textLight}>
              {dayjs(date).format('DD.MM.YYYY')}
              </Text>
          </View>
        </View>
      </Box>
    </TouchableOpacity>
  );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        container: {
            position: 'relative',
            borderRadius: 24,
            overflow: 'hidden',
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: colors.outlineVariant,
            backgroundColor: '#fff',
        },
        imageBackground: {
            borderRadius: 24,
            paddingTop: '64%',
            backgroundColor: '#f2f4f7',
        },
        typeBox: {
            position: 'absolute',
            top: 12,
            left: 12,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 32,
            backgroundColor: '#F5EF99',
        },
        title: {
            flexShrink: 1,
            marginHorizontal: 6,
            width: '100%',
            fontWeight: 'bold',
        },
        body: {
            marginTop: 4,
            marginBottom: 8,
            marginHorizontal: 6,
            flexShrink: 1,
            width: 300,
        },
        footer: {
            marginTop:10,
            flexDirection: 'row',
            marginRight:6,
            gap: 4,
            justifyContent: 'space-between',
            flexWrap: 'wrap',
        },
        locationContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 6,
            flexShrink: 1,
        },
        dateContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 8,
            flexShrink: 1,
        },
        icon: {
            width: 14,
            height: 14,
            marginRight: 4,
            tintColor: colors.primary,
        },
        textLight: {
            paddingTop: 6,
            fontWeight: '300',
            marginBottom: 5,
            flexShrink: 1,
        },
    });
