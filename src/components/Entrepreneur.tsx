import React from 'react';
import { Image, StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Box } from './common/Box';

type EntrepreneurProps = Omit<TouchableOpacityProps, 'activeOpacity'> & {
    title: string;
    type: string;
};

export const Entrepreneur = (props: EntrepreneurProps) => {
    const { colors } = useTheme();
    const {
        style,
        title,
        type,
        ...otherProps
    } = props;

    return (
        <TouchableOpacity
            {...otherProps}
            style={[styles.course, style]}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        {(() => {
                            switch (type) {
                                case 'startups':
                                    return (
                                        <Image
                                            source={require('../assets/flat-icons/rocket.png')}
                                            style={styles.icon}
                                            resizeMode="contain"
                                        />
                                    );
                                case 'closedDeals':
                                    return (
                                        <Image
                                            source={require('../assets/flat-icons/assept-document.png')}
                                            style={styles.icon}
                                            resizeMode="contain"
                                        />
                                    );
                                case 'academyStartups':
                                    return (
                                        <Image
                                            source={require('../assets/flat-icons/graduation-cap.png')}
                                            style={styles.icon}
                                            resizeMode="contain"
                                        />
                                    );
                                default:
                                    return (
                                        <Image
                                            source={require('../assets/flat-icons/workshop.png')}
                                            style={styles.icon}
                                            resizeMode="contain"
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
                    style={styles.chevron}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    course: {
        flex: 1,
        padding: 12,
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#A09FA0', // Using a fallback color; adjust as needed
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#F99F1C',
        padding: 18,
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: '#F99F1C',
    },
    chevron: {
        width: 20,
        height: 20,
        tintColor: '#A09FA0',
    },
});
