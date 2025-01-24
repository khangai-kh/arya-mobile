import { CompositeNavigationProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Investment } from '../components/Investment';
import { MainStackParams } from '../models/navigation';
import { BottomTabStackParams } from '../navigation/user/tabs/BottomTab';

type UseNavigationProps = CompositeNavigationProp<NavigationProp<BottomTabStackParams, 'Home'>, NavigationProp<MainStackParams>>;

export const Investments = () => {
    const { navigate } = useNavigation<UseNavigationProps>();

    const [
        menuItems,
        setMenuItems
    ] = useState([
        {
            title: "Startups in Funding Round",
            type: "startups",
        },
        {
            title: "Closed Deals",
            type: "closedDeals",
        },
        {
            title: "Better.Future.Circles.Days",
            type: "betterFutureCirclesDays",
        },
        {
            title: "Investor Trainings",
            type: "investorTrainings",
        },
        {
            title: "Angel Investor License (BKY)",
            type: "BKYLicense",
        }
    ]);

    return (
        <ScrollView
            style={{
                flex: 1,
                marginHorizontal: 16,
                marginTop: 24
            }}
            showsVerticalScrollIndicator={false}
        >
            {menuItems.map((item, index) => (
                <Investment
                    title={item.title}
                    type={item.type}
                    style={{
                        marginBottom: index === menuItems.length - 1 ? 0 : 8
                    }}
                    onPress={() => {
                        if (item.type === 'startups') {
                            navigate('Startups');
                        } else if (item.type === 'closedDeals') {
                            navigate('ClosedDeals');
                        } else if (item.type === 'betterFutureCirclesDays') {
                            navigate('BetterFutureCirclesDays');
                        } else if (item.type === 'investorTrainings') {
                            navigate('InvestorTrainings');
                        } else if (item.type === 'BKYLicense') {
                            navigate('BKYLicense');
                        }

                    }}
                />
            ))}
        </ScrollView>
    );
};
