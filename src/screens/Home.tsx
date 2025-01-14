import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { Image, useWindowDimensions, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { AppStackParams } from '../navigation/App';
import { BottomTabStackParams } from '../navigation/BottomTab';
import { Contents } from './Contents';
import { Entrepreneurship } from './Entrepreneurship';
import { Investments } from './Investments';
import { Members } from './Members';

type HomeProps = CompositeScreenProps<BottomTabScreenProps<BottomTabStackParams, 'Home'>, StackScreenProps<AppStackParams>>;

const renderScene = SceneMap({
    'contents': Contents,
    'members': Members,
    'investments': Investments,
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
        key: 'investments',
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
                    <Image
                        source={require('../assets/aryaUP.png')}
                        style={{
                            width: 98,
                            height: 40,
                        }}
                        resizeMode='contain'
                    />
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <IconButton
                            containerColor={colors.onPrimary}
                            icon={require('../assets/flat-icons/search.png')}
                            size={24}
                            onPress={() => navigation.navigate('Search')}
                        />
                        <IconButton
                            containerColor={colors.onPrimary}
                            icon={require('../assets/flat-icons/bell.png')}
                            size={24}
                            onPress={() => navigation.navigate('Notifications')}
                        />
                        <IconButton
                            containerColor={colors.onPrimary}
                            icon={require('../assets/flat-icons/info.png')}
                            size={24}
                            onPress={() => navigation.navigate('AboutUs')}
                        />
                    </View>
                </View>
            </View>
            <View style={{
                flex: 1,
                backgroundColor: '#F2F2F2'
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