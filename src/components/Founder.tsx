import React from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from 'react-native';
import { Avatar, Chip, IconButton, Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';

const createStyles = (colors: MD3Colors) => StyleSheet.create({
    course: {
        flex: 1,
        padding: 12,
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.outlineVariant,
        backgroundColor: '#fff',
    },
    avatarStyle: {
        backgroundColor: '#f2f4f7',
        marginRight: 4,
    },
    iconButtonStyle: {
        borderRadius: 50,
        padding: 4,
    },
    chipStyle: {
        backgroundColor: '#f2f2f2',
        alignSelf: 'flex-start',
    },
    chipContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    roleIcon: {
        width: 14,
        height: 14,
        marginRight: 4,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    column: {
        flex: 1,
    },
    justifyBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap:2,
        width: '75%',
        marginLeft:10,
    },
    textMargin: {
        flexShrink: 1,
        marginBottom: 4,
    }
});

type FounderProps = Omit<TouchableOpacityProps, 'activeOpacity'> & {
    userId: number;
    name: string;
    image: string;
    founderRole: string;
    status: string;
    following: boolean;
    style?: any;
    onPress: () => void;
};

export const Founder: React.FC<FounderProps> = (props) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const { user_id } = useSelector((state: RootState) => state.auth);

    const { userId, style, name, status, image, founderRole, following, ...otherProps } = props;

    const checkRole = (role: string) => {
        let iconSource;
        let tintColor;

        switch (role) {
            case 'Investor':
                iconSource = require('../assets/flat-icons/diamond.png');
                tintColor = '#00AEEF';
                break;
            case 'Premium':
                iconSource = require('../assets/flat-icons/crown.png');
                tintColor = '#B61D8D';
                break;
            case 'Entrepreneur':
                iconSource = require('../assets/flat-icons/rocket.png');
                tintColor = '#F99F1C';
                break;
            default:
                return null;
        }

        return (
            <Image
                resizeMode="contain"
                source={iconSource}
                style={[styles.roleIcon, { tintColor }]}
            />
        );
    };

    return (
        <TouchableOpacity {...otherProps} style={[styles.course, style]}>
            <View style={styles.row}>
                <Avatar.Image
                    size={54}
                    source={image ? { uri: image} : require('../assets/Image-54.png')}
                    style={styles.avatarStyle}  />
                <View style={styles.justifyBetween}>
                    <View>
                        <Text variant="titleMedium" numberOfLines={1}>{name}</Text>
                        <Text variant="bodySmall" numberOfLines={1} style={styles.textMargin}>{status}</Text>
                        <Chip style={styles.chipStyle}>
                            <View style={styles.chipContainer}>
                                {checkRole(founderRole)}
                                <Text variant="bodySmall" numberOfLines={1}>{founderRole}</Text>
                            </View>
                        </Chip>
                    </View>
                    {user_id !== userId && (
                        <IconButton
                            icon={following ? require('../assets/flat-icons/following.png') : require('../assets/flat-icons/user-add.png')}
                            size={18}
                            iconColor={following ? '#B61D8D' : '#ffffff'}
                            style={[styles.iconButtonStyle, { backgroundColor: following ? colors.onPrimary : colors.primary }]}
                            onPress={() => { }}
                        />
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};
