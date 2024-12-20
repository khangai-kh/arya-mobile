import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Avatar, Chip, IconButton, Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { Box } from './common/Box';

type MemberProps = Omit<TouchableOpacityProps, 'activeOpacity'> & {
    name: string;
    image: string;
    memberRole: string;
    status: string;
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
                <Box
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box>
                        <Text
                            variant="bodyMedium"
                            numberOfLines={1}
                            style={{
                                marginBottom: 4
                            }}
                        >
                            {memberRole}
                        </Text>
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
                    </Box>
                    <IconButton
                        icon={require('../assets/flat-icons/filter.png')}
                        size={18}
                        onPress={() => { }}
                    />
                </Box>
            </View>
            <View
                style={{
                    flex: 1,
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
            {/* {type !== undefined && (
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
            )} */}

        </TouchableOpacity>
    );
};