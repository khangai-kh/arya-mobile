import dayjs from 'dayjs';
import { Image, StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

type InspirationProps = Omit<TouchableOpacityProps, 'activeOpacity'> & {
    title: string;
    image: string;
    name: string;
    profileImage?: string | null;
    date: string;
};

const styles = (colors: MD3Colors) => StyleSheet.create({
    Inspiration: {
        flexDirection: 'row',
        padding: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.outlineVariant,
        borderRadius: 24,
        backgroundColor: '#fff'
    }
});

export const Inspiration = (props: InspirationProps) => {
    const { colors } = useTheme();
    const { Inspiration } = styles(colors);
    const {
        style,
        title,
        image,
        name,
        profileImage,
        date,
        ...otherProps
    } = props;

    return (
        <TouchableOpacity
            {...otherProps}
            style={[
                Inspiration,
                style
            ]}
        >
            <Image
                resizeMode="cover"
                source={require('../assets/dummy-image-1.jpeg')}
                style={{
                    marginRight: 8,
                    borderRadius: 18,
                    width: 92,
                    height: 92,
                    backgroundColor: '#fff'
                }}
            />
            <View style={{
                flex: 1,
                justifyContent: 'space-between'
            }}>
                <Text
                    variant="titleMedium"
                    style={{
                        flexBasis: 'auto',
                        flexShrink: 1
                    }}
                >
                    {title}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Avatar.Image
                            size={24}
                            source={require('../assets/avatar.png')}
                            style={{
                                backgroundColor: '#f2f4f7',
                                marginRight: 4.5
                            }}
                        />
                        <Text
                            variant='bodySmall'
                            style={{
                                fontWeight: '300'
                            }}
                        >
                            {name}
                        </Text>
                    </View>
                    <Text
                        variant='bodySmall'
                        style={{
                            fontWeight: '300'
                        }}
                    >
                        {dayjs(date).format('DD.MM.YYYY')}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
