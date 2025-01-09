import { Image, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

type SpecialProps = {
    icon: string;
    value: string;
};

export const Special = (props: SpecialProps) => {
    const {
        icon,
        value
    } = props;
    const { colors } = useTheme();

    const checkIcon = (icon: string) => {
        if (icon === 'graduation-cap') {
            return (
                <Image
                    source={require('../assets/flat-icons/graduation-cap.png')}
                    style={{
                        width: 24,
                        height: 24,
                        tintColor: colors.primary
                    }}
                />
            );
        } else if (icon === 'confetti') {
            return (
                <Image
                    source={require('../assets/flat-icons/confetti.png')}
                    style={{
                        width: 24,
                        height: 24,
                        tintColor: colors.primary
                    }}
                />
            );
        } else if (icon === 'diamond') {
            return (
                <Image
                    source={require('../assets/flat-icons/diamond.png')}
                    style={{
                        width: 24,
                        height: 24,
                        tintColor: colors.primary
                    }}
                />
            );
        } else if (icon === 'comment-user') {
            return (
                <Image
                    source={require('../assets/flat-icons/comment-user.png')}
                    style={{
                        width: 24,
                        height: 24,
                        tintColor: colors.primary
                    }}
                />
            );
        } else if (icon === 'chat-arrow-grow') {
            return (
                <Image
                    source={require('../assets/flat-icons/chat-arrow-grow.png')}
                    style={{
                        width: 24,
                        height: 24,
                        tintColor: colors.primary
                    }}
                />
            );
        } else if (icon === 'calendar') {
            return (
                <Image
                    source={require('../assets/flat-icons/calendar.png')}
                    style={{
                        width: 24,
                        height: 24,
                        tintColor: colors.primary
                    }}
                />
            );
        }
    };
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#F5EF99',
                borderRadius: 16,
                padding: 12
            }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {checkIcon(icon)}
            </View>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 8
                }}
            >
                <Text
                    variant='labelMedium'
                    style={{
                        color: colors.primary,
                        textAlign: 'center',
                        fontWeight: '500'
                    }}
                >
                    {value}
                </Text>
            </View>
        </View>
    );
};