// screens/Home.tsx
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabBar, TabView } from 'react-native-tab-view';
import { MainStackParams } from '../models/navigation';
import { BottomTabStackParams } from '../navigation/user/tabs/BottomTab';
import { Contents } from './Contents';
import { Entrepreneurship } from './Entrepreneurship';
import { Investments } from './Investments';
import { Members } from './Members';

type HomeProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabStackParams, 'Home'>,
  StackScreenProps<MainStackParams>
>;

export const Home = (props: HomeProps) => {
  const { navigation, route } = props;
  const { width } = useWindowDimensions();
  const { colors } = useTheme();

  // Extract route params safely.
  const params: { filterModel?: Record<string, any>; index?: number } = route.params ?? {};
  const filterModel = params.filterModel ?? {};
  const initialTabIndex = params.index ?? 0;

  const [index, setIndex] = useState(initialTabIndex);
  const [routes] = useState([
    { key: 'contents', title: 'Contents' },
    { key: 'members', title: 'Members' },
    { key: 'investments', title: 'Investment' },
    { key: 'entrepreneurship', title: 'Entrepreneurship' },
  ]);

  const navigateToMemberShip = () =>
    navigation.navigate('MemberShip', {
      agreed_agreement: false,
      agreed_confidentiality: false,
    });
  const navigateToSearch = () => navigation.navigate('Search');
  const navigateToNotifications = () => navigation.navigate('Notifications');
  const navigateToAboutUs = () => navigation.navigate('AboutUs');

  // Wrap each scene in a container that fills available space.
  const renderScene = ({ route }: { route: { key: string } }) => {
    let content = null;
    switch (route.key) {
      case 'contents':
        content = <Contents />;
        break;
      case 'members':
        content = <Members filterModel={filterModel} refresh={false} />;
        break;
      case 'investments':
        content = <Investments />;
        break;
      case 'entrepreneurship':
        content = <Entrepreneurship />;
        break;
      default:
        return null;
    }
    return (
      <View key={route.key} style={styles.scene}>
        {content}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Image
            source={require('../assets/arya_up.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.iconRow}>
            <IconButton
              containerColor={colors.onPrimary}
              icon={require('../assets/flat-icons/upgrade.png')}
              size={18}
              onPress={navigateToMemberShip}
            />
            <IconButton
              containerColor={colors.onPrimary}
              icon={require('../assets/flat-icons/search.png')}
              size={18}
              onPress={navigateToSearch}
            />
            <IconButton
              containerColor={colors.onPrimary}
              icon={require('../assets/flat-icons/bell.png')}
              size={18}
              onPress={navigateToNotifications}
            />
            <IconButton
              containerColor={colors.onPrimary}
              icon={require('../assets/flat-icons/info.png')}
              size={18}
              onPress={navigateToAboutUs}
            />
          </View>
        </View>
      </View>

      {/* TabView Section */}
      <View style={styles.tabViewContainer}>
        <TabView
          lazy
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width }}
          navigationState={{ index, routes }}
          renderTabBar={(tabProps) => (
            <TabBar
              {...tabProps}
              inactiveColor={colors.onSurface}
              activeColor={colors.primary}
              scrollEnabled
              tabStyle={styles.tabStyle}
              indicatorStyle={[styles.indicatorStyle, { backgroundColor: colors.primary }]}
              style={[styles.tabBar, { backgroundColor: colors.background }]}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 98,
    height: 40,
  },
  iconRow: {
    flexDirection: 'row',
  },
  tabViewContainer: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  tabStyle: {
    width: 'auto',
  },
  // Standard indicator style.
  indicatorStyle: {
    height: 2,
    backgroundColor: 'transparent',
  },
  tabBar: {
    backgroundColor: 'transparent',
  },
  // New style: wrap each scene.
  scene: {
    flex: 1,
  },
});

export default Home;
