import React from 'react';
import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableWithoutFeedback, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Events } from '../../../screens/Events';
import { Home } from '../../../screens/Home';
import { Messenger } from '../../../screens/Messenger';
import { Profile } from '../../../screens/Profile';
import { MainStackParams } from '../../../models/navigation';
import { useNavigationContext } from '../../../contexts/NavigationContext';
import { MemberDiscovery } from '../../../screens/MemberDiscovery';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParams {}
  }
}

// Update Home screen to accept filterModel and index as parameters
export type BottomTabStackParams = {
  Home?: { filterModel?: any; index?: number };
  Events: undefined;
  MemberDiscovery: undefined;
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

const CustomTabButton: React.FC<BottomTabBarButtonProps> = ({ onPress, style }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={[styles.floatingButton, style]}
  >
    <Image
      source={require('../../../assets/flower.png')}
      style={styles.floatingIcon}
    />
  </TouchableOpacity>
);

export const BottomTab = (props: any) => {
  const { colors } = useTheme();
  const { hideTabBar } = useNavigationContext();

  // Extract route params (if any) passed into BottomTab
  const { route } = props;
  const { filterModel, index: tabIndex } = route?.params || {};

  // console.log('BottomTab filterModel', filterModel);
  // console.log('BottomTab index', tabIndex);

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
      <BottomTabStack.Screen
        name="Home"
        component={Home}
        options={{ tabBarIcon: renderHomeIcon }}
        initialParams={{ filterModel: filterModel, index: tabIndex }}
      />
      <BottomTabStack.Screen name="Events" component={Events} options={{ tabBarIcon: renderEventsIcon }} />
      <BottomTabStack.Screen 
        name="MemberDiscovery" 
        component={MemberDiscovery} 
        options={{
          tabBarButton: (props) => <CustomTabButton children={undefined} {...props} />,
        }}
        />
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
    shadowOpacity: 0.1,
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
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
  },
  floatingIcon: {
    width: 50,
    height: 50,
  },
});

export default BottomTab;
