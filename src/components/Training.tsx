import { Image, StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

type TrainingProps = Omit<TouchableOpacityProps, 'activeOpacity'> & {
    title: string;
    image: string;
    about: string;
};

const styles = (colors: MD3Colors) => StyleSheet.create({
    Training: {
        flexDirection: 'row',
        padding: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.outlineVariant,
        borderRadius: 24,
        backgroundColor: '#fff'
    }
});

export const Training = (props: TrainingProps) => {
    const { colors } = useTheme();
    const { Training } = styles(colors);
    const {
        style,
        title,
        about,
        image,
        ...otherProps
    } = props;

    return (
        <TouchableOpacity
            {...otherProps}
            style={[
                Training,
                style
            ]}
        >
            <Image
                resizeMode="cover"
                source={require('../assets/dummy-image-1.png')}
                style={{
                    marginRight: 8,
                    borderRadius: 18,
                    width: 92,
                    height: 92,
                    backgroundColor: '#fff'
                }}
            />
            <View style={{ flex: 1 }}>
                <Text
                    variant="titleMedium"
                    numberOfLines={2}
                    lineBreakMode='tail'
                    style={{
                        flexBasis: 'auto',
                        flexShrink: 1
                    }}
                >
                    {title}
                </Text>
                <Text
                    variant='bodySmall'
                    style={{
                        marginTop: 4,
                        flexBasis: 'auto',
                        flexShrink: 1
                    }}
                >
                    {about}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
