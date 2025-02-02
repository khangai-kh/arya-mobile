import { Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';
import { Box } from './common/Box';
import { View } from './common/View';

type SelectRoleProps = {
    roles: {
        id: number;
        title: string;
    }[];
    selectedRole: string | undefined;
    onSelect: (value: string) => void;
    onNextButton: () => void;
};
export const SelectRole = (props: SelectRoleProps) => {
    const {
        roles,
        selectedRole,
        onSelect,
        onNextButton
    } = props;

    return (
        <View
            style={{
                flex: 1
            }}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        marginTop: 24,
                        paddingHorizontal: 16
                    }}
                >
                    <Text
                        variant='titleLarge'
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        How would you describe yourself?
                    </Text>
                    <Text
                        variant='bodyMedium'
                        style={{
                            marginTop: 12,
                            textAlign: 'center'
                        }}
                    >
                        Choose the role that best describes you
                    </Text>
                    <View
                        style={{
                            marginTop: 24
                        }}
                    >
                        {roles.map((role, index) => (
                            <TouchableOpacity
                                key={role.id}
                                style={{
                                    flex: 1,
                                    backgroundColor: selectedRole === role.title ? '#F5EF99' : '#fff',
                                    padding: 16,
                                    borderRadius: 24,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: roles.length >= index ? 8 : 0
                                }}
                                onPress={() => onSelect(role.title)}
                            >
                                <Text variant='titleMedium'>
                                    {role.title}
                                </Text>

                                {(() => {
                                    switch (role.title) {
                                        case 'Investor':
                                            return (
                                                <Image
                                                    source={require('../assets/flat-icons/diamond-outlined.png')}
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        tintColor: selectedRole === role.title ? '#414042' : '#A09FA0',
                                                    }}
                                                />
                                            );
                                        case 'Entrepreneur':
                                            return (
                                                <Image
                                                    source={require('../assets/flat-icons/rocket-outlined.png')}
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        tintColor: selectedRole === role.title ? '#414042' : '#A09FA0',
                                                    }}
                                                />
                                            );
                                        case 'Professional':
                                            return (
                                                <Image
                                                    source={require('../assets/flat-icons/briefcase.png')}
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        tintColor: selectedRole === role.title ? '#414042' : '#A09FA0',
                                                    }}
                                                />
                                            );
                                        case 'Family business':
                                            return (
                                                <Image
                                                    source={require('../assets/flat-icons/family-dress.png')}
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        tintColor: selectedRole === role.title ? '#414042' : '#A09FA0',
                                                    }}
                                                />
                                            );
                                        case 'Student':
                                            return (
                                                <Image
                                                    source={require('../assets/flat-icons/graduation-cap-outlined.png')}
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        tintColor: selectedRole === role.title ? '#414042' : '#A09FA0',
                                                    }}
                                                />
                                            );
                                    }
                                })()}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView >
            <Box
                px={16}
                py={16}
            >
                <Button
                    mode="contained"
                    onPress={() => onNextButton()}
                    disabled={selectedRole === undefined}
                >
                    Next
                </Button>
            </Box>
        </View >
    );
};