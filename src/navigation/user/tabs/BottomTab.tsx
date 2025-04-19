import React, { useState } from 'react';
import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton, Modal, Portal, Text, TouchableRipple, useTheme } from 'react-native-paper';
import { Events } from '../../../screens/Events';
import { Home } from '../../../screens/Home';
import { Messenger } from '../../../screens/Messenger';
import { Profile } from '../../../screens/Profile';
import { MainStackParams } from '../../../models/navigation';
import { useNavigationContext } from '../../../contexts/NavigationContext';
import { MemberDiscovery } from '../../../screens/MemberDiscovery';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/configureStore';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParams {}
  }
}

type NavigationProp = NativeStackNavigationProp<MainStackParams>;

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
  getTabIcon(
    focused,
    require('../../../assets/flat-icons/home.png'),
    require('../../../assets/flat-icons/home-outlined.png')
  );

const EventsIcon = ({ focused }: { focused: boolean }) =>
  getTabIcon(
    focused,
    require('../../../assets/flat-icons/calendar-star.png'),
    require('../../../assets/flat-icons/calendar-star-outlined.png')
  );

const MessengerIcon = ({ focused }: { focused: boolean }) =>
  getTabIcon(
    focused,
    require('../../../assets/flat-icons/comment-alt.png'),
    require('../../../assets/flat-icons/comment-alt-outlined.png')
  );

const ProfileIcon = ({ focused }: { focused: boolean }) =>
  getTabIcon(
    focused,
    require('../../../assets/flat-icons/user.png'),
    require('../../../assets/flat-icons/user-outlined.png')
  );

const CustomTabButton: React.FC<BottomTabBarButtonProps> = ({ style }) => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const { role } = useSelector((state: RootState) => state.auth);

  const handlePress = () => {
    if (role === 4) {
      setVisible(true);
    } else {
      navigation.navigate('MemberDiscovery');
    }
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        style={[styles.floatingButton, style]}
      >
        <Image
          source={require('../../../assets/flower.png')}
          style={[styles.floatingIcon, role === 4 ? styles.floatingIconGray : styles.floatingIconDefault]}
        />
      </TouchableOpacity>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <IconButton
            icon={require('../../../assets/flat-icons/x.png')}
            size={24}
            iconColor="#A09FA0"
            style={styles.modalClose}
            onPress={() => setVisible(false)}
          />
          <Image
            resizeMode="contain"
            source={require('../../../assets/flat-icons/diamond.png')}
            style={styles.modalIcon}
          />
          <Text variant="headlineSmall" style={styles.modalTitle}>
            Please become a Premium member to join
          </Text>
          <View style={styles.modalButtons}>
Jpa            <TouchableRipple
              style={styles.modalButton}
              onPress={() => setVisible(false)}
            >
              <Text variant="titleMedium" style={styles.modalButtonText}>
                Not now
              </Text>
            </TouchableRipple>
            <TouchableRipple
              style={styles.modalButtonPrimary}
              onPress={() => {
                setVisible(false);
                navigation.navigate('MemberShip', {
                  agreed_agreement: false,
                  agreed_confidentiality: false,
                });
              }}
            >
              <Text variant="titleMedium" style={styles.modalButtonPrimaryText}>
                Arya Premium
              </Text>
            </TouchableRipple>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export const BottomTab = (props: any) => {
  const { colors } = useTheme();
  const { hideTabBar } = useNavigationContext();

  const { route } = props;
  const { filterModel, index: tabIndex } = route?.params || {};

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
          tabBarButton: (props) => <CustomTabButton {...props} />,
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
    marginLeft:  10,
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
  floatingIconDefault: {
    // Explicitly no tintColor to preserve original icon colors
  },
  floatingIconGray: {
    tintColor: '#808080',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 24,
    margin: 24,
    padding: 16,
  },
  modalClose: {
    position:'absolute',
    top:10,
    left:250,
  },
  modalIcon: {
      alignSelf: 'center',
      width: 56,
      height: 56,
      tintColor: '#B61D8D',
      marginVertical: 24,
  },
  modalTitle: {
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    marginTop: 8,
  },
  modalButtons: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    rowGap: 8,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12.5,
    borderRadius: 32,
    alignItems: 'center',
  },
  modalButtonText: {
    textAlign: 'center',
  },
  modalButtonPrimary: {
    paddingVertical: 12.5,
    paddingHorizontal: 28.5,
    backgroundColor: '#B61D8D',
    borderRadius: 32,
    alignItems: 'center',
  },
  modalButtonPrimaryText: {
    color: '#FFFFFF',
  },
});

export default BottomTab;