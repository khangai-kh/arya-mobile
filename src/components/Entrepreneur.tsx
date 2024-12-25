import { Image, StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { Box } from './common/Box';

type EntrepreneurProps = Omit<TouchableOpacityProps, 'activeOpacity'> & {
    title: string;
    type: string;
};

const styles = (colors: MD3Colors) => StyleSheet.create({
    course: {
        flex: 1,
        padding: 12,
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.outlineVariant,
        backgroundColor: '#fff'
    }
});

export const Entrepreneur = (props: EntrepreneurProps) => {
    const { colors } = useTheme();
    const { course } = styles(colors);
    const {
        style,
        title,
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
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 8,
                            borderRadius: '50%',
                            borderWidth: 1,
                            borderColor: '#F99F1C',
                            padding: 18
                        }}
                    >
                        {(() => {
                            switch (type) {
                                case 'startups':
                                    return (
                                        <Image
                                            source={require('../assets/flat-icons/rocket.png')}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: '#F99F1C'
                                            }}
                                            resizeMode='contain'
                                        />
                                    );
                                case 'closedDeals':
                                    return (
                                        <Image
                                            source={require('../assets/flat-icons/assept-document.png')}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: '#F99F1C'
                                            }}
                                            resizeMode='contain'
                                        />
                                    );
                                case 'academyStartups':
                                    return (
                                        <Image
                                            source={require('../assets/flat-icons/graduation-cap.png')}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: '#F99F1C'
                                            }}
                                            resizeMode='contain'
                                        />
                                    );
                                default:
                                    return (
                                        <Image
                                            source={require('../assets/flat-icons/workshop.png')}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: '#F99F1C'
                                            }}
                                            resizeMode='contain'
                                        />
                                    );
                            }
                        })()}
                    </View>
                    <Box ml={8}>
                        <Text
                            variant="titleSmall"
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                    </Box>
                </View>
                <Image
                    source={require('../assets/flat-icons/chevron-small-right.png')}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: '#A09FA0'
                    }}
                />
            </View>
        </TouchableOpacity>
    );
};