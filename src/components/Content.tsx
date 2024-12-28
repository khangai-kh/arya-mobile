import dayjs from 'dayjs';
import { ImageBackground, StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { Box } from './common/Box';

type ContentProps = Omit<TouchableOpacityProps, 'activeOpacity'> & {
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
//find a solution to render in announcements page 
export const Content = (props: ContentProps) => {
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
                source={require('../assets/dummy-image-1.png')}
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
                    <Text
                        variant="bodyMedium"
                        numberOfLines={1}
                        style={{
                            fontWeight: 300
                        }}
                    >
                        {dayjs(date).format('DD.MM.YYYY')}
                    </Text>
                </View>
            </Box>
        </TouchableOpacity>
    );
};