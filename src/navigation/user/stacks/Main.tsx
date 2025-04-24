import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { MainStackParams } from '../../../models/navigation';
import { AboutUs } from '../../../screens/AboutUs';
import { AcademyStartups } from '../../../screens/AcademyStartups';
import { Announcement } from '../../../screens/Announcement';
import { Announcements } from '../../../screens/Announcements';
import { BetterFutureCirclesDays } from '../../../screens/BetterFutureCirclesDays';
import { BKYLicense } from '../../../screens/BKYLicense';
import { BKYSuccess } from '../../../screens/BKYSuccess';
import { ClosedDeals } from '../../../screens/ClosedDeals';
import { DisclosureText } from '../../../screens/DisclosureText';
import { Inspirations } from '../../../screens/Inspirations';
import { InvestorTrainings } from '../../../screens/InvestorTrainings';
import { IPILicense } from '../../../screens/IPILicence';
import { Member } from '../../../screens/Member';
import { MemberFilter } from '../../../screens/MemberFilter';
import { MemberShip } from '../../../screens/MemberShip';
import { Notifications } from '../../../screens/Notifications';
import { OnBoarding } from '../../../screens/OnBoarding';
import { Search } from '../../../screens/Search';
import { Startup } from '../../../screens/Startup';
import { Startups } from '../../../screens/Startups';
import { StartupsFilter } from '../../../screens/StartupsFilter';
import { Training } from '../../../screens/Training';
import { Workshop } from '../../../screens/Workshop';
import { Workshops } from '../../../screens/Workshops';
import { BottomTab } from '../tabs/BottomTab';
import { Profile } from '../../../screens/Profile';
import {PremiumSuccess} from '../../../screens/PremiumSuccess';
import PaymentForm from '../../../components/forms/PaymentForm';
import { StripePayment } from '../../../screens/StripePayment';
import { MokaPayment } from '../../../screens/MokaPayment';
import ThreeDSecureScreen from '../../../screens/ThreeDSecureScreen';
import { FundingRound } from '../../../screens/FundingRound';
import { FundingSuccess } from '../../../screens/FundingSuccess';
import { MemberDiscovery } from '../../../screens/MemberDiscovery';
import { SplashScreen } from '../../../screens/SplashScreen';
import Members from '../../../screens/Members';
import UserMembers from '../../../screens/UserMembers';
import { Events } from '../../../screens/Events';
import SignIn from '../../../screens/SignIn';


const Stack = createNativeStackNavigator<MainStackParams>();

const SearchIconButton = ({ onPress }: { onPress: () => void }) => (
  <IconButton
    icon={require('../../../assets/flat-icons/search.png')}
    size={24}
    style={styles.iconButton}
    onPress={onPress}
  />
);

export const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={({ route }: { route: { params?: { hideTabBar?: boolean } } }) => ({
            headerShown: false,
            tabBarStyle: route.params?.hideTabBar ? { display: 'none' } : undefined,
          })}
        />
        <Stack.Screen name="AboutUs" component={AboutUs} options={{ title: 'About Us' }} />
        <Stack.Screen name="Announcements" component={Announcements} options={{ title: 'Announcements' }} />
        <Stack.Screen name="Announcement" component={Announcement} options={{ headerShown: false }} />
        <Stack.Screen
          name="AcademyStartups"
          component={AcademyStartups}
          options={{
            title: 'Venture academy startups',
            headerRight: () => <SearchIconButton onPress={() => {}} />,
          }}
        />
        <Stack.Screen
          name="BetterFutureCirclesDays"
          component={BetterFutureCirclesDays}
          options={{ title: 'Better.Future.Circles.Days' }}
        />
        <Stack.Screen name="BKYLicense" component={BKYLicense} options={{ title: 'BKY License' }} />
        <Stack.Screen name="InvestorTrainings" component={InvestorTrainings} options={{ title: 'Investor trainings' }} />
        <Stack.Screen
          name="ClosedDeals"
          component={ClosedDeals}
          options={{
            title: 'Closed deals',
            headerRight: () => <SearchIconButton onPress={() => {}} />,
          }}
        />
        <Stack.Screen name="DisclosureText" component={DisclosureText} options={{ title: 'Disclosure text' }} />
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
        <Stack.Screen name="FundingRound" component={FundingRound} options={{ headerShown: false }} />
        <Stack.Screen name="Startup" component={Startup} options={{ headerShown: false }}/>
        <Stack.Screen name="StartupsFilter" component={StartupsFilter} options={{ headerShown: false }} />
        <Stack.Screen name="Startups" component={Startups} options={{ headerShown: false }}/>
        <Stack.Screen name="Workshop" component={Workshop} options={{ headerShown: false }} />
        <Stack.Screen name="Workshops" component={Workshops} options={{ title: 'Entrepreneur workshops' }} />
        <Stack.Screen name="IPILicense" component={IPILicense} options={{ title: 'IPI License form' }} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }} />
        <Stack.Screen name="Member" component={Member} options={{ headerShown: false }} />
        <Stack.Screen name="Members" component={Members} options={{ headerShown: false }} />
        <Stack.Screen name="UserMembers" component={UserMembers} options={{ headerShown: false }} />
        <Stack.Screen name="MemberShip" component={MemberShip} options={{ title: 'Membership' }} />
        <Stack.Screen name="PremiumSuccess" component={PremiumSuccess} options={{ title: 'Premium Success' }} />
        <Stack.Screen name="FundingSuccess" component={FundingSuccess} options={{ headerShown: false }} />
        <Stack.Screen name="MemberFilter" component={MemberFilter} options={{ headerShown: false }} />
        <Stack.Screen name="Inspirations" component={Inspirations} options={{ title: 'Inspirations' }} />
        <Stack.Screen name="BKYSuccess" component={BKYSuccess} options={{ headerShown: false }} />
        <Stack.Screen name="Training" component={Training} options={{ headerShown: false }} />
        <Stack.Screen name="Notifications" component={Notifications} options={{ title: 'Notifications' }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
        <Stack.Screen name="Events" component={Events} options={{ title: 'Events' }} />
        <Stack.Screen name="MemberDiscovery" component={MemberDiscovery} options={{  headerShown: false }} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{  headerShown: false }}/>
        <Stack.Screen name="SignIn" component={SignIn} options={{  headerShown: false }}/>
        <Stack.Screen name="PaymentLocation" component={PaymentForm} />
        <Stack.Screen name="StripePayment" component={StripePayment} />
        <Stack.Screen name="MokaPayment" component={MokaPayment} />
        <Stack.Screen name="ThreeDSecureScreen" component={ThreeDSecureScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: '#F8E8F4',
  },
  startupHeaderRight: {
    flexDirection: 'row',
  },
  heartIconButton: {
    backgroundColor: '#F8E8F4',
  },
  menuIconButton: {
    backgroundColor: '#F8E8F4',
    marginLeft: 4,
  },
});
