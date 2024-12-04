import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { AppStackParams } from '../navigation/App';
import { BottomTabStackParams } from '../navigation/BottomTab';
import { Contents } from './Contents';
import { Entrepreneurship } from './Entrepreneurship';
import { Investment } from './Investment';
import { Members } from './Members';

type HomeProps = CompositeScreenProps<BottomTabScreenProps<BottomTabStackParams, 'Home'>, StackScreenProps<AppStackParams>>;

const renderScene = SceneMap({
    'contents': Contents,
    'members': Members,
    'investment': Investment,
    'entrepreneurship': Entrepreneurship
});

export const Home = (props: HomeProps) => {
    const { navigation } = props;
    const { width } = useWindowDimensions();
    const { colors } = useTheme();
    const [
        index,
        setIndex
    ] = useState(0);
    const [
        routes
    ] = useState([{
        key: 'contents',
        title: 'Contents'
    }, {
        key: 'members',
        title: 'Members'
    }, {
        key: 'investment',
        title: 'Investment'
    }, {
        key: 'entrepreneurship',
        title: 'Entrepreneurship'
    }]);

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
            edges={[
                'top'
            ]}
        >
            <View style={{ padding: 16 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#B21D8D' }}>aryaUP</Text>
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <IconButton
                            containerColor={colors.onPrimary}
                            icon={require('../assets/flat-icons/search.png')}
                            size={32}
                            onPress={() => { }}
                        />
                        <IconButton
                            containerColor={colors.onPrimary}
                            icon={require('../assets/flat-icons/bell.png')}
                            size={32}
                            onPress={() => { }}
                        />
                        <IconButton
                            containerColor={colors.onPrimary}
                            icon={require('../assets/flat-icons/info.png')}
                            size={32}
                            onPress={() => { }}
                        />
                    </View>
                </View>
            </View>
            <View style={{
                flex: 1,
                backgroundColor: '#f5f7f9'
            }}>
                <TabView
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width }}
                    navigationState={{
                        index,
                        routes
                    }}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            inactiveColor={colors.onSurface}
                            activeColor={colors.primary}
                            scrollEnabled
                            tabStyle={{
                                width: 'auto'
                            }}
                            indicatorStyle={{
                                backgroundColor: colors.primary
                            }}
                            style={{
                                backgroundColor: colors.background
                            }}
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    );
};