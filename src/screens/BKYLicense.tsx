import { StackScreenProps } from '@react-navigation/stack';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { MainStackParams } from '../models/navigation';

type BKYLicenseProps = StackScreenProps<MainStackParams, 'BKYLicense'>;

export const BKYLicense = (props: BKYLicenseProps) => {

    const { navigation } = props;
    const { colors } = useTheme();

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
            edges={[
                'bottom'
            ]}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    source={require('../assets/bky.jpeg')}
                    style={{
                        marginTop: 25,
                        borderRadius: 32,
                        width: '100%',
                        height: 200,
                    }}
                />
                <View
                    style={{
                        marginTop: 24,
                        paddingHorizontal: 16
                    }}
                >
                    <Text
                        variant='titleLarge'
                        style={{
                            marginBottom: 12
                        }}
                    >
                        Angel Investor License from Arya
                    </Text>
                    <Text>
                        By obtaining an Individual Participation Investor (IPI) License, you can benefit from tax advantages under the provisional Article 82 of the Income Tax Law. This license allows full taxpayer real persons who pay tax with their declaration to benefit from tax deductions of 2.5mn TL per year for their investments in joint stock companies. Please fill out the form to apply for a license and get more information.arya's Angel Investor License
                    </Text>
                </View>
            </ScrollView>
            <Box
                px={16}
                py={16}
            >
                <Button
                    mode="contained"
                    onPress={() => {
                        navigation.navigate('IPILicense', {
                            agreed: false
                        });
                    }}
                >
                    Apply for BKY License
                </Button>
            </Box>
        </SafeAreaView>
    );
};