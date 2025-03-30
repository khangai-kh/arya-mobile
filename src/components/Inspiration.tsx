import React from 'react';
import dayjs from 'dayjs';
import { Image, StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

export type InspirationProps = Omit<TouchableOpacityProps, 'activeOpacity'> & {
  title: string;
  image: string;
  name: string;
  profileImage?: string | null;
  date: string;
};

export const Inspiration = ({
  style,
  title,
  image,
  name,
  profileImage,
  date,
  ...otherProps
}: InspirationProps) => {
  const { colors } = useTheme();
  const {
    container,
    image: imageStyle,
    contentContainer,
    title: titleStyle,
    footer,
    authorContainer,
    avatar,
    name: nameStyle,
    date: dateStyle,
  } = styles(colors);

  return (
    <TouchableOpacity {...otherProps} style={[container, style]}>
      <Image
        resizeMode="cover"
        source={image ? { uri: image } : require('../assets/dummy-image-1.jpeg')}
        style={imageStyle}
      />
      <View style={contentContainer}>
        <Text variant="titleMedium" style={titleStyle}>
          {title}
        </Text>
        <View style={footer}>
          <View style={authorContainer}>
            <Avatar.Image
              size={24}
              source={
                profileImage ? { uri: profileImage } : require('../assets/avatar.png')
              }
              style={avatar}
            />
            <Text variant="bodySmall" style={nameStyle}>
              {name}
            </Text>
          </View>
          <Text variant="bodySmall" style={dateStyle}>
            {dayjs(date).format('DD.MM.YYYY')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
      container: {
        flexDirection: 'row',
        padding: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.outlineVariant,
        borderRadius: 24,
        backgroundColor: '#fff',
      },
      image: {
        marginRight: 8,
        borderRadius: 18,
        width: 92,
        height: 92,
        backgroundColor: '#fff',
      },
      contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
      },
      title: {
        flexBasis: 'auto',
        flexShrink: 1,
      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      authorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      avatar: {
        backgroundColor: '#f2f4f7',
        marginRight: 4.5,
      },
      name: {
        fontWeight: '300',
      },
      date: {
        fontWeight: '300',
      },
});
