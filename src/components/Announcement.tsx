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

    const formattedDate = new Date(date).toLocaleString();

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
                        backgroundColor: '#F5EF99',
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
                {/* Title with Single Line Wrapping */}
                <Text
                    variant="titleMedium"
                    numberOfLines={1}
                    style={{ flexShrink: 1, width: '100%' }} 
                >
                    {title}
                </Text>

                {/* Body with Two Line Wrapping */}
                <Text
                    variant="bodyMedium"
                    numberOfLines={2} 
                    ellipsizeMode="tail"
                    style={{
                        marginTop: 4,
                        marginBottom: 8,
                        flexShrink: 1,
                        width: 300,
                    }}
                >
                    {body}
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap' // Allow items to wrap if needed
                    }}
                >
                    {/* Location */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flexShrink: 1
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
                                fontWeight: '300',
                                flexShrink: 1
                            }}
                        >
                            {location}
                        </Text>
                    </View>

                    {/* Date */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 8,
                            flexShrink: 1
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
                                fontWeight: '300',
                                flexShrink: 1
                            }}
                        >
                            {formattedDate}
                        </Text>
                    </View>
                </View>
            </Box>
        </TouchableOpacity>
    );
};
