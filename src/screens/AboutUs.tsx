import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Avatar, Button, MD3Theme, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleGrid } from 'react-native-super-grid';

import { Box } from '../components/common/Box';
import { Special } from '../components/Special';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParams } from '../models/navigation';

// Types
type SpecialItem = {
  id: number;
  icon: string;
  value: string;
};

// Constants
const SPECIALS: SpecialItem[] = [
  { id: 0, icon: 'graduation-cap', value: 'Entrepreneur and investor development trainings' },
  { id: 1, icon: 'confetti', value: 'Corporate collaborations' },
  { id: 2, icon: 'diamond', value: 'Special trainings for our members' },
  { id: 3, icon: 'comment-user', value: 'Mentoring matches' },
  { id: 4, icon: 'chat-arrow-grow', value: 'Investment readiness acceleration programs' },
  { id: 5, icon: 'calendar', value: 'Inspiring events and club meetings' },
];

const { width } = Dimensions.get('window');
const ITEM_DIMENSION = (width - 100) / 3;

type AboutUsProps = StackScreenProps<MainStackParams, 'AboutUs'>;
// Component
export const AboutUs = (props: AboutUsProps) => {
    const { navigation } = props;
    const { colors } = useTheme();
    const dynamicStyles = createDynamicStyles(colors);

    const handleJoinPress = () => {
        navigation.navigate('MemberShip', {
            agreed_agreement: false,
            agreed_confidentiality: false,
          });
    };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
        <Appbar.Header style={styles.appbarHeader}>
            <Appbar.Action
                icon={require('../assets/flat-icons/angle-small-left.png')}
                color="#414042"
                size={20}
                style={dynamicStyles.appbarActionRight}
                onPress={() => navigation.goBack()}
            />
            <Appbar.Content
                title={
                    <View style={dynamicStyles.titleContainer}>
                        <Text variant="titleMedium" style={dynamicStyles.interestText}>
                            About Us
                        </Text>
                    </View>
                }
            />
        </Appbar.Header>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerContainer}>
            <Image
                resizeMode="cover"
                source={require('../assets/star.png')}
                style={styles.starIcon}
            />
            <Text variant="displaySmall" style={styles.headerText}>
                Arya Women Investment Platform
            </Text>
            <Text style={styles.subHeaderText}>
                Our vision is to transform the world, led by women.
            </Text>
            </View>

            <Image
                resizeMode="cover"
                source={require('../assets/arya-image.png')}
                style={styles.mainImage}
            />

            <View style={styles.logoContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Image
                        source={require('../assets/about-us-1.png')}
                        style={styles.logoImage}
                    />
                    <Image
                        source={require('../assets/about-us-2.png')}
                        style={styles.logoImage}
                    />
                    <Image
                        source={require('../assets/about-us-3.png')}
                        style={styles.logoImage}
                    />
                    <Image
                        source={require('../assets/about-us-4.png')}
                        style={styles.logoImage}
                    />
                </ScrollView>
            </View>

            <View style={styles.contentContainer}>
            <View style={[styles.infoCard, { backgroundColor: colors.primary }]}>
                <Text variant="bodySmall" style={styles.infoText}>
                Arya Women Investment Platform was born as a social initiative in 2013 with the goal of
                achieving gender balance in investment, creating social and economic value and
                transforming the world under women&apos;s leadership. Today, Arya is Turkey&apos;s
                largest gender-balanced investment platform with more than 450 senior executive women
                members.
                </Text>
            </View>

            <View style={styles.founderContainer}>
                <View style={styles.avatarContainer}>
                <Avatar.Image size={96} source={require('../assets/dummy-founder-1.png')} />
                </View>
                <Text variant="labelMedium" style={[styles.founderLabel, { color: colors.primary }]}>
                Founder
                </Text>
                <Text variant="titleMedium">Ahu Serter</Text>
                <Text variant="bodySmall" style={styles.founderDescription}>
                As one of Turkey&apos;s most innovative entrepreneurs and investors with 20+ years of
                experience, she has invested $12M in mobility, sustainability and technology that
                improves people&apos;s lives.
                </Text>
            </View>

            <View style={styles.founderContainer}>
                <View style={styles.avatarContainer}>
                <Avatar.Image size={96} source={require('../assets/dummy-founder-2.png')} />
                </View>
                <Text variant="labelMedium" style={[styles.founderLabel, { color: colors.primary }]}>
                Co-Founder
                </Text>
                <Text variant="titleMedium">Münteha Adalı</Text>
                <Text variant="bodySmall" style={styles.founderDescription}>
                While carrying out projects focused on culture-based inequalities and social impact, she
                has assumed the role of strategist and impact advocate within the entrepreneurship,
                investment and civil society ecosystem.
                </Text>
            </View>

            <SimpleGrid
                listKey="specials"
                itemDimension={ITEM_DIMENSION}
                data={SPECIALS}
                spacing={16}
                renderItem={({ item }) => <Special icon={item.icon} value={item.value} />}
            />
            </View>
        </ScrollView>

        <Box px={16} py={16}>
            <Button mode="contained" onPress={handleJoinPress}>
            Ready to join Arya
            </Button>
        </Box>
    </SafeAreaView>
  );
};

const createDynamicStyles = (colors: MD3Theme['colors']) =>
    StyleSheet.create({appbarActionRight: {
        backgroundColor: colors.onPrimary || '#FFFFFF',
        marginRight: 5,
        marginTop: 20,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    interestText: {
        fontWeight: 'bold',
        paddingLeft: 0,
        marginLeft:-40,
    },
});
// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 16,
    },
    headerContainer: {
        position: 'relative',
        padding: 16,
    },
    starIcon: {
        position: 'absolute',
        left: 286,
        width: 54,
        height: 54,
    },
    headerText: {
        textAlign: 'center',
    },
    subHeaderText: {
        marginTop: 16,
        fontSize:14,
        textAlign: 'center',
    },
    mainImage: {
        marginTop: 24,
        borderRadius: 32,
        width: '100%',
        height: 192,
    },
    contentContainer: {
        marginHorizontal: 16,
    },
    logosText: {
        marginTop: 24,
        textAlign: 'center',
    },
    infoCard: {
        marginTop: 24,
        borderRadius: 24,
        padding: 12,
    },
    infoText: {
        color: '#fff',
    },
    founderContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    avatarContainer: {
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 50,
    },
    founderLabel: {
        marginTop: 8,
    },
    founderDescription: {
        textAlign: 'center',
        marginTop: 4,
    },
    appbarHeader: {
        width: '100%',
        backgroundColor: 'transparent',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    logoContainer: {
        marginTop: 16,
        marginHorizontal: 16,
    },
    logoImage: {
        width: 100,
        height: 50,
        marginRight: 16,
        resizeMode: 'contain',
    },
});
