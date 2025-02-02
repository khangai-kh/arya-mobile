import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { Button, IconButton, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from '../components/common/View';
import { SelectInterest } from '../components/SelectInterest';
import { SelectMotivation } from '../components/SelectMotivation';
import { SelectRole } from '../components/SelectRole';
import { MainStackParams } from '../models/navigation';

type CreateProfileProps = StackScreenProps<MainStackParams, 'CreateProfile'>;

export const CreateProfile = (props: CreateProfileProps) => {
    const {
        navigation,
        route
    } = props;

    const { colors } = useTheme();
    const [stage, setStage] = useState('role');
    const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [selectedMotivation, setSelectedMotivation] = useState<string | undefined>(undefined);

    const roles = ([
        {
            id: 0,
            title: 'Investor'
        },
        {
            id: 1,
            title: 'Entrepreneur'
        },
        {
            id: 2,
            title: 'Professional'
        },
        {
            id: 3,
            title: 'Family business'
        },
        {
            id: 4,
            title: 'Student'
        }
    ]);

    const interests = ([
        {
            id: 0,
            type: 'financial',
            title: 'test 1'
        },
        {
            id: 1,
            type: 'financial',
            title: 'test 2'
        },
        {
            id: 2,
            type: 'investing',
            title: 'test 3'
        },
        {
            id: 3,
            type: 'investing',
            title: 'test 4'
        }
    ]);

    const motivations = ([
        {
            id: 0,
            title: 'Learn angel / VC investing'
        },
        {
            id: 1,
            title: 'Improve my investing skills'
        },
        {
            id: 2,
            title: 'Invest in technology'
        },
        {
            id: 3,
            title: 'Accelerate my business'
        },
        {
            id: 4,
            title: 'Meet with investors'
        },
        {
            id: 5,
            title: 'Discover new tech startups'
        },
        {
            id: 6,
            title: 'Expand my network'
        },
        {
            id: 7,
            title: 'Become a mentor'
        },
        {
            id: 8,
            title: 'Get a mentor'
        }
    ]);

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
            edges={[
                'bottom',
                'top'
            ]}
        >
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: 16,
                    justifyContent: stage === 'role' ? 'flex-end' : 'space-between',
                    alignItems: 'center'
                }}
            >
                {stage !== 'role' && (
                    <IconButton
                        containerColor={colors.onPrimary}
                        icon={require('../assets/flat-icons/angle-small-left.png')}
                        size={24}
                        onPress={() => stage === 'motivation' ? setStage('interest') : setStage('role')}
                    />
                )}
                <Button
                    mode='text'
                    textColor='#414042'
                >
                    Skip
                </Button>
            </View>
            {(() => {
                switch (stage) {
                    case 'role':
                        return (
                            <SelectRole
                                roles={roles}
                                selectedRole={selectedRole}
                                onSelect={(value: string) => setSelectedRole(value)}
                                onNextButton={() => setStage('interest')}
                            />
                        );
                    case 'interest':
                        return (
                            <SelectInterest
                                interests={interests}
                                selectedInterests={selectedInterests}
                                onSelect={() => console.log('test')}
                                onNextButton={() => setStage('motivation')}
                            />
                        );
                    case 'motivation':
                        return (
                            <SelectMotivation
                                motivations={motivations}
                                selectedMotivation={selectedMotivation}
                                onSelect={(value: string) => setSelectedMotivation(value)}
                                onNextButton={() => setStage('')}
                            />
                        );
                }
            })()}
        </SafeAreaView>
    );
};