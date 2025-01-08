import { useNavigation } from '@react-navigation/native';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { Box } from './common/Box';

type AnnouncementProps = Omit<TouchableOpacityProps, 'activeOpacity'> & {
    title: string;
    image: string;
    body: string;
    location: string;
    date: string;
    type: string;
};

const styles = (colors: MD3Colors) => StyleSheet.create({
    course: {
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.outlineVariant,
        backgroundColor: '#fff'
    }
});

export const Announcement = (props: AnnouncementProps) => {
    const { navigate } = useNavigation();
    const { colors } = useTheme();
    const { course } = styles(colors);
    const {
        style,
        title,
        image,
        body,
        location,
        date,
        type,
        ...otherProps
    } = props;

    return (
        <TouchableOpacity
            {...otherProps}
            style={[
                course,
                style
            ]}
        >
            <ImageBackground
                resizeMode="cover"
                source={require('../assets/dummy-image-1.jpeg')}
                style={{
                    borderRadius: 24,
                    paddingTop: '64%',
                    backgroundColor: '#f2f4f7'
                }}
            />
            {type !== undefined && (
                <Box
                    px={12}
                    py={3}
                    style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 32,
                        backgroundColor: '#F5EF99'
                    }}
                >
                    <Text variant="labelSmall">
                        {type}
                    </Text>
                </Box>
            )}
            <Box
                px={12}
                py={8}
            >
                <Text
                    variant="titleMedium"
                    numberOfLines={1}
                >
                    {title}
                </Text>
                <Text
                    variant="bodyMedium"
                    numberOfLines={1}
                    style={{
                        marginTop: 4,
                        marginBottom: 8
                    }}
                >
                    {body}
                </Text>
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            source={require('../assets/flat-icons/marker.png')}
                            style={{
                                width: 14,
                                height: 14,
                                marginRight: 4,
                                tintColor: colors.primary
                            }}
                        />
                        <Text
                            variant="bodyMedium"
                            numberOfLines={1}
                            style={{
                                fontWeight: 300
                            }}
                        >
                            {location}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 8
                        }}
                    >
                        <Image
                            source={require('../assets/flat-icons/calendar.png')}
                            style={{
                                width: 14,
                                height: 14,
                                marginRight: 4,
                                tintColor: colors.primary
                            }}
                        />
                        <Text
                            variant="bodyMedium"
                            numberOfLines={1}
                            style={{
                                fontWeight: 300
                            }}
                        >
                            {date}
                        </Text>
                    </View>
                </View>
            </Box>
        </TouchableOpacity>
    );
};