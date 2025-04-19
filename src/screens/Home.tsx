// screens/Home.tsx
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Icon, IconButton, Modal, Portal, Text, TouchableRipple, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabBar, TabView } from 'react-native-tab-view';
import { MainStackParams } from '../models/navigation';
import { BottomTabStackParams } from '../navigation/user/tabs/BottomTab';
import { Contents } from './Contents';
import { Entrepreneurship } from './Entrepreneurship';
import { Investments } from './Investments';
import { Members } from './Members';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';

type HomeProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabStackParams, 'Home'>,
  StackScreenProps<MainStackParams>
>;

export const Home = (props: HomeProps) => {
  const { navigation, route } = props;
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const { role } = useSelector((state: RootState) => state.auth);
  const [visible, setVisible] = useState(false);
  // Extract route params safely.
  const params: { filterModel?: Record<string, any>; index?: number } = route.params ?? {};
  const filterModel = params.filterModel ?? {};
  const initialTabIndex = params.index ?? 0;

  const [index, setIndex] = useState(initialTabIndex);
  const [routes] = useState([
    { key: 'contents', title: 'Contents' },
    { key: 'members', title: 'Members' },
    { key: 'investments', title: 'Investment' },
    ...(role !== 4 ? [{ key: 'entrepreneurship', title: 'Entrepreneurship' }] : []),
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
        if (role === 4) {
          return null; // Prevent showing Members content when role is 4
        }
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
          <View style={styles.headerRight}>
          {role === 4 && (
            <View style={[styles.crownRight,{borderBlockColor:colors.primary}]}  >
              <Icon
                source={require('../assets/flat-icons/crown.png')}
                color={colors.primary}
                size={14}
              />
              <Text style={[styles.upgradeButtonLabel,{color:colors.primary}]} onPress={navigateToMemberShip}>Upgrade</Text>
            </View>)}
          </View>
            <View style={styles.iconRow}>
              {role !== 4 && (
                <IconButton
                containerColor={colors.onPrimary}
                icon={require('../assets/flat-icons/search.png')}
                size={18}
                onPress={navigateToSearch}
              />)}
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
          onIndexChange={(newIndex) => {
            if (routes[newIndex].key === 'members' && role === 4) {
              setVisible(true);
            } else {
              setIndex(newIndex);
            }
          }}
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
      <Portal>
        <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={styles.modal}
        >
            <IconButton
                icon={require('../assets/flat-icons/x.png')}
                size={20}
                iconColor="#A09FA0"
                style={styles.modalClose}
                onPress={() => setVisible(false)}
            />
            <Image
                resizeMode="contain"
                source={require('../assets/flat-icons/diamond.png')}
                style={styles.modalIcon}
            />
            <Text variant="headlineSmall" style={styles.modalTitle}>
                Please become a Premium member to join
            </Text>
            <View style={styles.modalButtons}>
                <TouchableRipple
                    style={styles.modalButton}
                    onPress={() => {setVisible(false);}}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  logo: {
    width: 85,
    height: 40,
    marginBottom:6,
    marginLeft:4,
  },
  crown: {
    width: 20,
    height: 20,
  },
  headerRight: {
    flexDirection:'row',
    verticalAlign:'middle',
    paddingBottom:12,
    paddingLeft:30,
    alignItems: 'center',
  },
  crownRight: {
    flexDirection:'row',
    verticalAlign:'middle',
    paddingHorizontal:4,
    alignItems: 'center',
    borderRadius:10,
    borderWidth:1,
  },
  upgradeButton: {
    backgroundColor: '#C2185B', // Pink color to match the photo
    borderRadius: 20,
  },
  upgradeButtonLabel: {
    marginLeft:4,
    fontSize: 12,
  },
  iconRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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

export default Home;
