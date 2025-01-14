import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Searchbar, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParams } from '../navigation/App';

type SearchProps = StackScreenProps<AppStackParams, 'Search'>;

export const Search = (props: SearchProps) => {
    const {
        navigation,
        route
    } = props;

    const { colors } = useTheme();

    const [
        searchQuery,
        setSearchQuery
    ] = useState('');
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
                    <View
                        style={{
                            flex: 1,
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
                    <Text
                        variant='titleSmall'
                        style={{
                            fontWeight: '500',
                            marginHorizontal: 16
                        }}
                        onPress={() => {
                            navigation.navigate('BottomTab');
                        }}
                    >
                        Cancel
                    </Text>
                </Appbar.Header>
                <View>
                    <Text>
                        TODO:body of search screen
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};