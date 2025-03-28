import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Avatar, Chip, IconButton, Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

type MemberProps = Omit<TouchableOpacityProps, 'activeOpacity'> & {
    name: string;
    image: string;
    memberRole: string;
    status: string;
    following: boolean;
    interests: {
        id: number,
        title: string;
    }[];
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

export const Member = (props: MemberProps) => {
    const { navigate } = useNavigation();
    const { colors } = useTheme();
    const { course } = styles(colors);
    const {
        style,
        name,
        image,
        memberRole,
        status,
        interests,
        following,
        ...otherProps
    } = props;

    const checkRole = (role: string) => {
        if (role === 'Investor') {
            return (
                <Image
                    resizeMode="contain"
                    source={require('../assets/flat-icons/diamond.png')}
                    style={{
                        width: 14,
                        height: 14,
                        tintColor: '#00AEEF',
                        marginRight: 4
                    }}
                />);
        } else if (role === 'Premium') {
            return (
                <Image
                    resizeMode="contain"
                    source={require('../assets/flat-icons/crown.png')}
                    style={{
                        width: 14,
                        height: 14,
                        tintColor: '#B61D8D',
                        marginRight: 4
                    }}
                />);
        } else if (role === 'Entrepreneur') {
            return (
                <Image
                    resizeMode="contain"
                    source={require('../assets/flat-icons/rocket.png')}
                    style={{
                        width: 14,
                        height: 14,
                        tintColor: '#F99F1C',
                        marginRight: 4
                    }}
                />);
        }
    };

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
                    flexDirection: 'row'
                }}
            >
                <Avatar.Image
                    size={54}
                    source={require('../assets/Image-54.png')}
                    style={{
                        backgroundColor: '#f2f4f7',
                        marginRight: 4
                    }}
                />
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <Chip
                            style={{
                                backgroundColor: '#f2f2f2',
                                alignSelf: 'flex-start',
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {checkRole(memberRole)}
                                <Text
                                    variant="bodySmall"
                                    numberOfLines={1}
                                >
                                    {memberRole}
                                </Text>
                            </View>
                        </Chip>
                        <Text
                            variant="titleMedium"
                            numberOfLines={1}
                        >
                            {name}
                        </Text>
                        <Text
                            variant="bodyMedium"
                            numberOfLines={1}
                            style={{
                                fontWeight: 300
                            }}
                        >
                            {status}
                        </Text>
                    </View>
                    <IconButton
                        icon={following
                            ? require('../assets/flat-icons/following.png')
                            : require('../assets/flat-icons/user-add.png')
                        }
                        size={18}
                        iconColor={following ? '#B61D8D' : '#ffffff'}
                        style={{
                            backgroundColor: following ? colors.onPrimary : colors.primary
                        }}
                        onPress={() => { }}
                    />
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 4
                }}
            >
                {interests.map((interest, index) => (
                    <Chip
                        key={interest.id}
                        style={{
                            backgroundColor: '#f2f2f2',
                            marginRight: index === interests.length ? 0 : 4
                        }}
                    >
                        <Text>
                            {interest.title}
                        </Text>
                    </Chip>
                ))}
            </View>
        </TouchableOpacity>
    );
};