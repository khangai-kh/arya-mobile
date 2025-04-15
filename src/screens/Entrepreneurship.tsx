import React from 'react';
import { CompositeNavigationProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Entrepreneur } from '../components/Entrepreneur';
import { MainStackParams } from '../models/navigation';
import { BottomTabStackParams } from '../navigation/user/tabs/BottomTab';

type UseNavigationProps = CompositeNavigationProp<NavigationProp<BottomTabStackParams, 'Home'>, NavigationProp<MainStackParams>>;

export const Entrepreneurship = () => {
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
            title: 'Venture Academy Startups',
            type: 'academyStartups',
        },
        {
            title: 'Entrepreneur Workshops',
            type: 'workshops',
        },
    ]);

    return (
        <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
        >
            {menuItems.map((item, index) => (
                <Entrepreneur
                    key={index}
                    title={item.title}
                    type={item.type}
                    style={styles.menuItem}
                    onPress={() => {
                        if (item.type === 'startups') {
                            navigate({ name: 'Startups', params: { type: 1 } });
                        } else if (item.type === 'closedDeals') {
                            navigate({ name: 'Startups', params: { type: 2 } });
                        } else if (item.type === 'academyStartups') {
                            navigate({ name: 'Startups', params: { type: 0 } });
                        } else if (item.type === 'workshops') {
                            navigate('Workshops');
                        }
                    }}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        marginHorizontal: 16,
        marginTop: 24,
    },
    menuItem: {
        marginBottom: 8,
    },
});
