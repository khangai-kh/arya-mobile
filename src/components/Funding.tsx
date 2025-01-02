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
        color: string;
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
        } else if (value === 'Closed deal') {
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
                    padding: 12,
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
                            width: '48%', // Each item takes up 48% of the width
                            marginBottom: 8,
                            flexDirection: 'column',
                            borderRightWidth: (index % 2 === 0 && index !== data.length - 1) ? 1 : 0, // Right border for left column
                            borderRightColor: '#e0e0e0',
                            borderBottomWidth: index < data.length - 2 ? 1 : 0, // Bottom border for all rows except the last row
                            borderBottomColor: '#e0e0e0',
                            paddingRight: 8,
                            paddingBottom: 8,
                        }}
                    >
                        <Text style={{ fontSize: 12, color: '#6e6e6e' }}>{item.label}:</Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>{item.value}</Text>
                    </View>
                ))}
            </View>
        </TouchableOpacity>
    );
};