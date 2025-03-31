import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Events } from '../../../screens/Events';
import { Home } from '../../../screens/Home';
import { Messenger } from '../../../screens/Messenger';
import { Profile } from '../../../screens/Profile';
import { MainStackParams } from '../../../models/navigation';
import { useNavigationContext } from '../../../contexts/NavigationContext';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParams {}
  }
}

// Renamed type: change "BottomTab" key to "CenterTab"
export type BottomTabStackParams = {
  Home: undefined;
  Events: undefined;
  CenterTab: undefined;
  Messenger: undefined;
  Profile: undefined;
};

const BottomTabStack = createBottomTabNavigator<BottomTabStackParams>();

const getTabIcon = (focused: boolean, iconFocused: any, iconUnfocused: any) => (
  <Image
    source={focused ? iconFocused : iconUnfocused}
    style={[styles.tabIcon, focused ? styles.tabIconFocused : styles.tabIconUnfocused]}
  />
);

const HomeIcon = ({ focused }: { focused: boolean }) =>
  getTabIcon(focused, require('../../../assets/flat-icons/home.png'), require('../../../assets/flat-icons/home-outlined.png'));

const EventsIcon = ({ focused }: { focused: boolean }) =>
  getTabIcon(focused, require('../../../assets/flat-icons/calendar-star.png'), require('../../../assets/flat-icons/calendar-star-outlined.png'));

const MessengerIcon = ({ focused }: { focused: boolean }) =>
  getTabIcon(focused, require('../../../assets/flat-icons/comment-alt.png'), require('../../../assets/flat-icons/comment-alt-outlined.png'));

const ProfileIcon = ({ focused }: { focused: boolean }) =>
  getTabIcon(focused, require('../../../assets/flat-icons/user.png'), require('../../../assets/flat-icons/user-outlined.png'));

const CustomTabButton = () => (
  <TouchableWithoutFeedback>
    <View style={styles.floatingButton}>
      <Image source={require('../../../assets/bottom-tab.png')} style={styles.floatingIcon} />
    </View>
  </TouchableWithoutFeedback>
);

// DummyScreen defined outside to avoid inline component functions
const DummyScreen = () => null;

export const BottomTab = () => {
  const { colors } = useTheme();
  const { hideTabBar } = useNavigationContext();

  const renderHomeIcon = ({ focused }: { focused: boolean }) => <HomeIcon focused={focused} />;
  const renderEventsIcon = ({ focused }: { focused: boolean }) => <EventsIcon focused={focused} />;
  const renderMessengerIcon = ({ focused }: { focused: boolean }) => <MessengerIcon focused={focused} />;
  const renderProfileIcon = ({ focused }: { focused: boolean }) => <ProfileIcon focused={focused} />;

  return (
    <BottomTabStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: colors.onSurface,
        tabBarStyle: hideTabBar ? { display: 'none' } : styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarShowLabel: false,
      }}
    >
      <BottomTabStack.Screen name="Home" component={Home} options={{ tabBarIcon: renderHomeIcon }} />
      <BottomTabStack.Screen name="Events" component={Events} options={{ tabBarIcon: renderEventsIcon }} />
      <BottomTabStack.Screen name="CenterTab" component={DummyScreen} options={{ tabBarButton: CustomTabButton }} />
      <BottomTabStack.Screen name="Messenger" component={Messenger} options={{ tabBarIcon: renderMessengerIcon }} />
      <BottomTabStack.Screen name="Profile" component={Profile} options={{ tabBarIcon: renderProfileIcon }} />
    </BottomTabStack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    bottom: 14,
    left: 16,
    right: 16,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    borderTopColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    paddingTop: 20,
    paddingRight: 10,
    paddingLeft: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  tabBarItemStyle: {
    paddingBottom: 8,
    justifyContent: 'center',
  },
  tabIcon: {
    width: 25,
    height: 25,
  },
  tabIconFocused: {
    tintColor: '#b2469d',
  },
  tabIconUnfocused: {
    tintColor: '#9e9e9e',
  },
  floatingButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  floatingIcon: {
    width: 50,
    height: 50,
  },
});
