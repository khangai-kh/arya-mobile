import { CompositeNavigationProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Entrepreneur } from '../components/Entrepreneur';
import { AppStackParams } from '../navigation/App';
import { BottomTabStackParams } from '../navigation/BottomTab';

type UseNavigationProps = CompositeNavigationProp<NavigationProp<BottomTabStackParams, 'Home'>, NavigationProp<AppStackParams>>;

export const Entrepreneurship = () => {
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
            title: "Venture Academy Startups",
            type: "academyStartups",
        },
        {
            title: "Entrepreneur Workshops",
            type: "workshops",
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
                <Entrepreneur
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
                        } else if (item.type === 'academyStartups') {
                            navigate('AcademyStartups');
                        } else if (item.type === 'workshops') {
                            navigate('Workshops');
                        }
                    }}
                />
            ))}
        </ScrollView>
    );
};
