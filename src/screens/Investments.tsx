import React from 'react';
import { CompositeNavigationProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Investment } from '../components/Investment';
import { MainStackParams } from '../models/navigation';
import { BottomTabStackParams } from '../navigation/user/tabs/BottomTab';

type UseNavigationProps = CompositeNavigationProp<
  NavigationProp<BottomTabStackParams, 'Home'>,
  NavigationProp<MainStackParams>
>;

export const Investments = () => {
  const { navigate } = useNavigation<UseNavigationProps>();

  const [menuItems, setMenuItems] = useState([
    {
      title: 'Startups in Funding Round',
      type: 'startups',
    },
    {
      title: 'Closed Deals',
      type: 'closedDeals',
    },
    {
      title: 'Better.Future.Circles.Days',
      type: 'betterFutureCirclesDays',
    },
    {
      title: 'Investor Trainings',
      type: 'investorTrainings',
    },
    {
      title: 'Angel Investor License (BKY)',
      type: 'BKYLicense',
    },
  ]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {menuItems.map((item, index) => (
        <Investment
          key={index}
          title={item.title}
          type={item.type}
          style={{
            marginBottom: index === menuItems.length - 1 ? 0 : 8,
          }}
          onPress={() => {
            switch (item.type) {
              case 'startups':
                navigate('Startups');
                break;
              case 'closedDeals':
                navigate('ClosedDeals');
                break;
              case 'betterFutureCirclesDays':
                navigate('BetterFutureCirclesDays');
                break;
              case 'investorTrainings':
                navigate('InvestorTrainings');
                break;
              case 'BKYLicense':
                navigate('BKYLicense');
                break;
              default:
                break;
            }
          }}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 24,
  },
});
