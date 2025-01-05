import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Avatar, Chip, IconButton, Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { Box } from './common/Box';

type FundingProps = Omit<TouchableOpacityProps, 'activeOpacity'> & {
    title: string;
    image: string;
    bio: string;
    types: {
        id: number;
        value: string;
    }[];
    following: boolean,
    status: string,
    investmentStatus?: string,
    valuation?: string,
    targetAmount?: string,
    amountCollected?: string,
    totalInvestment?: string,
    renderingScreen: string;
};

const styles = (colors: MD3Colors) => StyleSheet.create({
    course: {
        padding: 12,
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.outlineVariant,
        backgroundColor: '#fff'
    }
});

export const Funding = (props: FundingProps) => {
    const { navigate } = useNavigation();
    const { colors } = useTheme();
    const { course } = styles(colors);
    const {
        style,
        title,
        image,
        bio,
        amountCollected,
        following,
        investmentStatus,
        status,
        targetAmount,
        totalInvestment,
        types,
        ...otherProps
    } = props;

    const data = [
        { label: 'Status', value: 'Prototype ready' },
        { label: 'Investment status', value: 'Pre-seed' },
        { label: 'Total investment', value: '$400K' },
        { label: 'Valuation', value: '$3M' },
        { label: 'Target amount', value: '$500K' },
        { label: 'Amount collected', value: '$350K' },
    ];

    const checkColor = (value: string) => {
        if (value === 'Funding round') {
            return '#00AEEF';
        } else if (value === 'Academy') {
            return '#F99F1C';
        } else if (value === 'Closed deals') {
            return '#A09FA0';
        } else if (value === 'Graduate') {
            return '#4CB748';
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
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginRight: 4
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
                            flex: 1
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            {types !== undefined && (
                                types.map((type, index) => (
                                    <Chip
                                        key={type.id}
                                        style={{
                                            backgroundColor: checkColor(type.value),
                                            marginRight: index === types.length ? 0 : 4,
                                            alignSelf: 'flex-start',
                                        }}
                                    >
                                        <Text
                                            variant='labelMedium'
                                            style={{ color: '#fff' }}
                                        >
                                            {type.value}
                                        </Text>
                                    </Chip>
                                ))
                            )}
                        </View>
                        <Text
                            variant="titleMedium"
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {title}
                        </Text>
                        <Text
                            variant="bodyMedium"
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                                flex: 1,
                                marginTop: 4,
                                marginBottom: 8
                            }}
                        >
                            {bio}
                        </Text>
                    </Box>
                </View>
                <IconButton
                    icon={following
                        ? require('../assets/flat-icons/heart-outlined.png')
                        : require('../assets/flat-icons/heart.png')
                    }
                    size={18}
                    iconColor={following ? '#fff' : '#B61D8D'}
                    style={{
                        backgroundColor: following ? colors.primary : colors.onPrimary
                    }}
                    onPress={() => { }}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#e0e0e0',
                    backgroundColor: '#fff',
                }}
            >
                {data.map((item, index) => (
                    <View
                        key={index}
                        style={{
                            width: '50%',
                            borderRightWidth: index % 2 === 0 ? 1 : 0,
                            borderRightColor: '#e0e0e0',
                            borderBottomWidth: index < data.length - 2 ? 1 : 0,
                            borderBottomColor: '#e0e0e0',
                            paddingVertical: 8,
                            paddingHorizontal: 12,
                        }}
                    >
                        <Text
                            variant='bodySmall'
                            style={{
                                color: '#A09FA0'
                            }}
                        >
                            {item.label}:
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: 500,
                                color: '#414042'
                            }}
                        >
                            {item.value}
                        </Text>
                    </View>
                ))}
            </View>
            {/* //TODO: activate bottom when data is not array */}
            {/* <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#e0e0e0',
                    backgroundColor: '#fff',
                }}
            >
                <View
                    style={{
                        width: '50%',
                        borderRightWidth: 1,
                        borderRightColor: '#e0e0e0',
                        borderBottomWidth: 1,
                        borderBottomColor: '#e0e0e0',
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                    }}
                >
                    <Text style={{ fontSize: 12, color: '#6e6e6e' }}>Status:</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>Prototype ready</Text>
                </View>
                <View
                    style={{
                        width: '50%',
                        borderBottomWidth: 1,
                        borderBottomColor: '#e0e0e0',
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                    }}
                >
                    <Text style={{ fontSize: 12, color: '#6e6e6e' }}>Investment status:</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>Pre-seed</Text>
                </View>
                <View
                    style={{
                        width: '50%',
                        borderRightWidth: 1,
                        borderRightColor: '#e0e0e0',
                        borderBottomWidth: 1,
                        borderBottomColor: '#e0e0e0',
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                    }}
                >
                    <Text style={{ fontSize: 12, color: '#6e6e6e' }}>Total investment:</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>$400K</Text>
                </View>
                <View
                    style={{
                        width: '50%',
                        borderBottomWidth: 1,
                        borderBottomColor: '#e0e0e0',
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                    }}
                >
                    <Text style={{ fontSize: 12, color: '#6e6e6e' }}>Valuation:</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>$3M</Text>
                </View>
                <View
                    style={{
                        width: '50%',
                        borderRightWidth: 1,
                        borderRightColor: '#e0e0e0',
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                    }}
                >
                    <Text style={{ fontSize: 12, color: '#6e6e6e' }}>Target amount:</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>$500K</Text>
                </View>
                <View
                    style={{
                        width: '50%',
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                    }}
                >
                    <Text style={{ fontSize: 12, color: '#6e6e6e' }}>Amount collected:</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>$350K</Text>
                </View>
            </View> */}
        </TouchableOpacity>
    );
};