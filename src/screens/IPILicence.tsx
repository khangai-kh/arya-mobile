import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Checkbox, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { AppStackParams } from '../navigation/App';

type IPILicenseProps = StackScreenProps<AppStackParams, 'IPILicense'>;

export const IPILicense = (props: IPILicenseProps) => {

    const {
        navigation,
        route
    } = props;
    const { colors } = useTheme();

    const [
        checked,
        setChecked
    ] = useState<boolean | undefined>(route.params.agreed);
    const [
        fullname,
        setFullname
    ] = useState('');
    const [
        email,
        setEmail
    ] = useState('');
    const [
        country,
        setCountry
    ] = useState(undefined);
    const [
        phone,
        setPhone
    ] = useState('');

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
                <View
                    style={{
                        marginTop: 24,
                        paddingHorizontal: 16
                    }}
                >
                    <View>
                        <Text
                            variant='titleMedium'
                            style={{
                                marginBottom: 12
                            }}
                        >
                            Full name
                            <Text
                                variant='titleMedium'
                                style={{
                                    color: '#D71920'
                                }}
                            >
                                *
                            </Text>
                        </Text>
                        <TextInput
                            mode='outlined'
                            placeholder='Name Surname'
                            value={fullname}
                            outlineStyle={{
                                borderRadius: 16,
                                borderColor: '#fff',
                                backgroundColor: '#fff'
                            }}
                            onChangeText={(text) => setFullname(text)}
                        />
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text
                            variant='titleMedium'
                            style={{
                                marginBottom: 12
                            }}
                        >
                            Email
                            <Text
                                variant='titleMedium'
                                style={{
                                    color: '#D71920'
                                }}
                            >
                                *
                            </Text>
                        </Text>
                        <TextInput
                            mode='outlined'
                            placeholder='examle@example.com'
                            value={email}
                            outlineStyle={{
                                borderRadius: 16,
                                borderColor: '#fff',
                                backgroundColor: '#fff'
                            }}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text
                            variant='titleMedium'
                            style={{
                                marginBottom: 12
                            }}
                        >
                            Phone
                            <Text
                                variant='titleMedium'
                                style={{
                                    color: '#D71920'
                                }}
                            >
                                *
                            </Text>
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            <TextInput
                                mode='outlined'
                                value={country}
                                outlineStyle={{
                                    borderRadius: 16,
                                    borderColor: '#fff',
                                    backgroundColor: '#fff'
                                }}
                                onSelectionChange={(value) => {
                                    //TODO: make sure get countries and be selectable
                                }}
                            />
                            <TextInput
                                mode='outlined'
                                placeholder='5555555555'
                                value={phone}
                                outlineStyle={{
                                    borderRadius: 16,
                                    borderColor: '#fff',
                                    backgroundColor: '#fff'
                                }}
                                style={{
                                    flex: 1,
                                    marginLeft: 8
                                }}
                                onChangeText={(text) => setPhone(text)}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            marginTop: 16,
                            flexDirection: 'row',
                        }}
                    >
                        <Checkbox.Android
                            status={checked ? 'checked' : 'unchecked'}
                            color="#fff"
                            uncheckedColor="#A09FA0"
                            onPress={() => { setChecked(!checked); }}
                        />
                        <Text
                            style={{
                                marginLeft: 8,
                                flexShrink: 1
                            }}
                        >
                            I have read the <Text style={{ color: '#00AEEF' }} onPress={() => navigation.navigate('DisclosureText')}>IPI License Disclosure Text</Text> and give my explicit consent to the processing of the relevant data.<Text style={{ color: '#D71920' }}>*</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <Box
                px={16}
                py={16}
            >
                <Button
                    mode="contained"
                    disabled={checked}
                    onPress={() => {
                        navigation.navigate('Success');
                    }}
                >
                    Submit
                </Button>
            </Box>
        </SafeAreaView>
    );
};