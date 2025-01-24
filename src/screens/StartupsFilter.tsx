import { StackScreenProps } from '@react-navigation/stack';
import { Image, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar, Button, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { MainStackParams } from '../models/navigation';

type StartupsFilterProps = StackScreenProps<MainStackParams, 'StartupsFilter'>;

export const StartupsFilter = (props: StartupsFilterProps) => {

    const {
        navigation,
        route
    } = props;

    const { colors } = useTheme();

    const filters = ([
        {
            id: 0,
            title: 'Status'
        },
        {
            id: 1,
            title: 'Investment status'
        },
        {
            id: 2,
            title: 'Total investment'
        },
        {
            id: 3,
            title: 'Target amount'
        },
        {
            id: 4,
            title: 'Amount collected'
        }
    ]);

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
                        marginTop: 16
                    }}
                >
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