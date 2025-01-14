import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { Image, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar, Button, Chip, Switch, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { AppStackParams } from '../navigation/App';

type FilterProps = StackScreenProps<AppStackParams, 'MemberFilter'>;

export const MemberFilter = (props: FilterProps) => {

    const {
        navigation,
        route
    } = props;

    const { colors } = useTheme();

    const [
        value,
        setValue
    ] = useState('all');

    const filters = ([
        {
            id: 0,
            title: 'Profile type'
        },
        {
            id: 1,
            title: 'Interest'
        },
        {
            id: 2,
            title: 'Sector'
        },
        {
            id: 3,
            title: 'Location'
        }
    ]);
    const [
        roles,
        setRoles
    ] = useState([
        {
            id: 0,
            title: 'All'
        },
        {
            id: 1,
            title: 'Investors'
        },
        {
            id: 2,
            title: 'Entrepreneurs'
        }
    ]);
    const [
        role,
        setRole
    ] = useState('All');

    const [
        isMentorship,
        setIsMentorship
    ] = useState(false);

    const [
        hasInvestment,
        setHasInvestment
    ] = useState(false);

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
            edges={[
                'bottom'
            ]}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Appbar.Header style={{
                    backgroundColor: 'transparent'
                }}>
                    <Appbar.Action
                        icon={require('../assets/flat-icons/angle-small-left.png')}
                        color="#414042"
                        style={{
                            backgroundColor: colors.onPrimary
                        }}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />
                    <Appbar.Content
                        title={
                            <Text variant='titleMedium'>
                                Filter
                            </Text>
                        }
                    />
                    <Text
                        variant='titleSmall'
                        style={{
                            fontWeight: '500',
                            marginRight: 16
                        }}
                        onPress={() => {
                            //TODO there will be reset action
                        }}
                    >
                        Reset
                    </Text>
                </Appbar.Header>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        borderRadius: 32,
                        marginTop: 24,
                        marginHorizontal: 16
                    }}
                >
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <Button
                            mode={value === 'all' ? 'contained' : 'text'}
                            onPress={(e) => {
                                setValue('all');
                            }}
                        >
                            All members (500)
                        </Button>
                    </View>
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <Button
                            mode={value !== 'all' ? 'contained' : 'text'}
                            onPress={(e) => {
                                setValue('connections');
                            }}
                        >
                            Connections (10)
                        </Button>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 16
                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#fff',
                            padding: 16,
                            borderRadius: 16
                        }}
                    >
                        <Text
                            variant='titleMedium'
                            style={{
                                marginBottom: 12
                            }}
                        >
                            Role
                        </Text>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            horizontal
                        >
                            {roles.map((item, index) => (
                                <Chip
                                    key={item.id}
                                    style={{
                                        padding: 6,
                                        backgroundColor: role === item.title ? '#F5EF99' : '#F2F2F2',
                                        marginRight: index === roles.length ? 0 : 4,
                                        alignSelf: 'flex-start',
                                        borderRadius: 32
                                    }}
                                    onPress={() => setRole(item.title)}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {role === item.title && (
                                            <Image
                                                source={require('../assets/flat-icons/check.png')}
                                                style={{
                                                    width: 14,
                                                    height: 14,
                                                    tintColor: '#414042',
                                                    marginRight: 4
                                                }}
                                            />
                                        )}
                                        <Text
                                            variant='labelMedium'
                                        >
                                            {item.title}
                                        </Text>
                                    </View>
                                </Chip>
                            ))}
                        </ScrollView>
                    </View>
                    {filters.map((filter, index) => (
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#fff',
                                padding: 16,
                                borderRadius: 16,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: filters.length >= index ? 8 : 0
                            }}
                            onPress={() => {
                                //TODO: there will be action on click to navigate to each filter
                            }}
                        >
                            <Text variant='titleMedium'
                                style={{
                                    color: '#414042'
                                }}
                            >
                                {filter.title}
                            </Text>
                            <Image
                                source={require('../assets/flat-icons/angle-small-right.png')}
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: '#414042'
                                }}
                            />
                        </TouchableOpacity>
                    ))}
                    <View
                        style={{
                            marginTop: 8,
                            backgroundColor: '#fff',
                            padding: 16,
                            borderRadius: 16,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Text variant='titleMedium'
                            style={{
                                color: '#414042'
                            }}
                        >
                            MentorShip
                        </Text>
                        <Switch
                            value={isMentorship}
                            onValueChange={() => setIsMentorship(!isMentorship)}
                            color='#4CB748'
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 8,
                            backgroundColor: '#fff',
                            padding: 16,
                            borderRadius: 16,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Text variant='titleMedium'
                            style={{
                                color: '#414042'
                            }}
                        >
                            Have investment
                        </Text>
                        <Switch
                            value={hasInvestment}
                            onValueChange={() => setHasInvestment(!hasInvestment)}
                            color='#4CB748'
                        />
                    </View>
                </View>
            </ScrollView>
            <Box
                px={16}
                py={16}
            >
                <Button
                    mode="contained"
                    onPress={() => {

                    }}
                >
                    Apply
                </Button>
            </Box>
        </SafeAreaView>
    );
};