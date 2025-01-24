import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar, Button, Chip, Searchbar, Switch, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { MainStackParams } from '../models/navigation';

type FilterProps = StackScreenProps<MainStackParams, 'MemberFilter'>;

export const MemberFilter = (props: FilterProps) => {
    const { navigation } = props;
    const { colors } = useTheme();

    const [value, setValue] = useState<string>('all');
    const [role, setRole] = useState<string>('All');
    const [isMentorship, setIsMentorship] = useState<boolean>(false);
    const [hasInvestment, setHasInvestment] = useState<boolean>(false);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filters = [
        { id: 0, title: 'Profile type' },
        { id: 1, title: 'Interest' },
        { id: 2, title: 'Sector' },
        { id: 3, title: 'Location' },
    ];

    const roles = [
        { id: 0, title: 'All' },
        { id: 1, title: 'Investors' },
        { id: 2, title: 'Entrepreneurs' },
    ];

    const toggleFilter = (filter: string) => {
        setSelectedFilters((prev) =>
            prev.includes(filter) ? prev.filter((item) => item !== filter) : [...prev, filter]
        );
    };

    const renderDrawerContent = () => (
        <SafeAreaView
            edges={['bottom']}
            style={{
                flex: 1,
                backgroundColor: '#F2F2F2'

            }}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                    <Appbar.Action
                        icon={require('../assets/flat-icons/angle-small-left.png')}
                        color="#414042"
                        style={{
                            backgroundColor: colors.onPrimary
                        }}
                        onPress={() => setOpen(false)}
                    />
                    <Appbar.Content
                        title={
                            <Text variant='titleMedium'>
                                Filter
                            </Text>
                        }
                    />
                </Appbar.Header>
                <View
                    style={{
                        margin: 16
                    }}
                >
                    <Searchbar
                        icon={require('../assets/flat-icons/search.png')}
                        clearIcon={require('../assets/flat-icons/cross-circle.png')}
                        // iconColor='#CFCFCF'
                        placeholder="Search Arya"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        style={{
                            backgroundColor: '#fff'
                        }}
                    />
                </View>
            </ScrollView>
            <Box
                px={16}
                py={16}
            >
                <Button
                    mode="contained"
                    onPress={() => {
                        setOpen(false);
                    }}
                >
                    Apply
                </Button>
            </Box>
        </SafeAreaView>
    );

    return (
        <Drawer
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            swipeEnabled={false}
            drawerPosition="right"
            drawerType="slide"
            drawerStyle={{ width: '100%' }} // Full width
            renderDrawerContent={renderDrawerContent}
        >
            <SafeAreaView
                edges={['bottom']}
                style={{ flex: 1 }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                        <Appbar.Action
                            icon={require('../assets/flat-icons/angle-small-left.png')}
                            color="#414042"
                            style={{
                                backgroundColor: colors.onPrimary
                            }}
                            onPress={() => navigation.goBack()}
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
                                // TODO: Reset action
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
                                    setOpen(true);
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
        </Drawer>
    );
};;