import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Image, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Button, MD3Theme, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { MainStackParams } from '../models/navigation';

type BKYLicenseProps = StackScreenProps<MainStackParams, 'BKYLicense'>;

export const BKYLicense = (props: BKYLicenseProps) => {
    const { navigation } = props;
    const { colors } = useTheme();
    const dynamicStyles = createDynamicStyles(colors);

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
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
                                BKY License
                            </Text>
                        </View>
                    }
                />
            </Appbar.Header>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    source={require('../assets/bky.jpeg')}
                    style={styles.image}
                />
                <View style={styles.textContainer}>
                    <Text variant="titleLarge" style={styles.title}>
                        Angel Investor License from Arya
                    </Text>
                    <Text>
                        By obtaining an Individual Participation Investor (IPI) License, you can benefit from tax advantages under the provisional Article 82 of the Income Tax Law. This license allows full taxpayer real persons who pay tax with their declaration to benefit from tax deductions of 2.5mn TL per year for their investments in joint stock companies. Please fill out the form to apply for a license and get more information.arya's Angel Investor License
                    </Text>
                </View>
            </ScrollView>
            <Box px={16} py={16}>
                <Button
                    mode="contained"
                    disabled={true}
                    onPress={() => {
                        navigation.navigate('IPILicense', {
                            agreed: false,
                        });
                    }}
                >
                    Apply for BKY License
                </Button>
            </Box>
        </SafeAreaView>
    );
};
const createDynamicStyles = (colors: MD3Theme['colors']) =>
    StyleSheet.create({
    appbarActionRight: {
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
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    image: {
        marginTop: 25,
        borderRadius: 32,
        width: '100%',
        height: 200,
    },
    textContainer: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    title: {
        marginBottom: 12,
    },
    appbarHeader: {
        width: '100%',
        backgroundColor: 'transparent',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
});
