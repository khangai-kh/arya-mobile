import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, IconButton, useTheme, ActivityIndicator, Modal, Portal, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Image } from 'react-native';
import { SelectInterest } from '../components/SelectInterest';
import { SelectMotivation } from '../components/SelectMotivation';
import { SelectRole } from '../components/SelectRole';
import { MainStackParams } from '../models/navigation';
import { DescribeModel } from '../models/general/describe.model';
import { RootState } from '../redux/configureStore';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { API } from '../plugins/axios';
import { InteresteModel } from '../models/general/interest.model';
import { MotivationModel } from '../models/general/motivation.model';
import { AddReference } from '../components/AddReference';

type CreateProfileProps = StackScreenProps<MainStackParams, 'CreateProfile'>;

export const CreateProfile = ({ navigation, route }: CreateProfileProps) => {

    let userId = route.params?.userId;

    const { colors } = useTheme();
    const { token } = useSelector((state: RootState) => state.auth);
    const [stage, setStage] = useState<'role' | 'interest' | 'motivation' | 'refenence'>('role');
    const [interests, setInterests] = useState<InteresteModel[]>([]);
    const [describes, setDescribes] = useState<DescribeModel[]>([]);
    const [motivations, setMotivations] = useState<MotivationModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false);

    const [selectedRole, setSelectedRole] = useState<number>();
    const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
    const [selectedMotivation, setSelectedMotivation] = useState<number[]>([]);
    const [selectedReferences, setSelectedReferences] = useState<number[]>([]);

    useQuery(['describes', token], async () => {
        const { data } = await API.get('/api/describes');
        setDescribes(data || []);
    });

    useQuery(['interests', token], async () => {
        const { data } = await API.get('/api/interests');
        setInterests(data || []);
    });

    useQuery(['motivations', token], async () => {
        const { data } = await API.get('/api/motivations');
        setMotivations(data || []);
    });

    const handleSelectInterest = (interest: InteresteModel) => {
        setSelectedInterests((prev) =>
            prev.includes(interest.interest_id)
                ? prev.filter((id) => id !== interest.interest_id)
                : [...prev, interest.interest_id]
        );
    };

    const handleReference = async () => {

        if (!userId || !selectedReferences) {
            console.log('Error: User ID or role selection is missing.');
            return;
        }

        if(selectedReferences.length === 0){
            setSuccessModalVisible(true);
            return;
        }

        setLoading(true);
        try {

            await API.post('/api/user-references', {
                user_id: userId,
                reference_user_ids: selectedReferences,
            });

            console.log('User reference saved successfully.');
        } catch (error) {
            console.error('Error saving user info:', error);
        } finally {
            setLoading(false);
            setSuccessModalVisible(true);
        }
    };

    const handleSkip = () => {
      if (stage === 'role') {
        setStage('interest');
      } else if (stage === 'interest') {
        setStage('motivation');
      } else if (stage === 'motivation') {
        navigation.navigate('SignIn');
      }
    };

    const handleUserInfo = async () => {
        if (!userId || !selectedRole) {
            console.error('Error: User ID or role selection is missing.');
            return;
        }
        setLoading(true);
        try {

            await API.post('/api/user-describes', {
                user_id: userId,
                describe_id: selectedRole,
            });

            await API.post('/api/user-interests', {
                user_id: userId,
                interest_ids: selectedInterests,
            });

            await API.post('/api/user-motivations', {
                user_id: userId,
                motivation_ids: selectedMotivation,
            });

            console.log('All user data saved successfully.');
          //  setSuccessModalVisible(true);
            setStage('refenence');
        } catch (error) {
            console.error('Error saving user info:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'top']}>
               <View style={stage === 'role' ? styles.headerContainerRole : styles.headerContainer}>
                {stage !== 'role' && (
                    <IconButton
                        containerColor={colors.onPrimary}
                        icon={require('../assets/flat-icons/angle-small-left.png')}
                        size={24}
                        onPress={() => setStage(stage === 'motivation' ? 'interest' : 'role')}
                        disabled={loading}
                    />
                )}
                    <Button mode="text" textColor="#414042" disabled={loading} onPress={handleSkip}>Skip</Button>
                </View>

            <View style={styles.contentContainer}>
                {loading ? (
                    <ActivityIndicator animating={true} size="large" color={colors.primary} />
                ) : (
                    <>
                        {stage === 'role' && (
                            <SelectRole
                                roles={describes}
                                selectedRole={selectedRole}
                                onSelect={setSelectedRole}
                                onNextButton={() => setStage('interest')}
                            />
                        )}
                        {stage === 'interest' && (
                            <SelectInterest
                                interests={interests}
                                selectedInterests={selectedInterests}
                                onSelect={handleSelectInterest}
                                onNextButton={() => setStage('motivation')}
                            />
                        )}
                        {stage === 'motivation' && (
                            <SelectMotivation
                                motivations={motivations}
                                selectedMotivations={selectedMotivation}
                                onSelect={setSelectedMotivation}
                                onNextButton={handleUserInfo}
                            />
                        )}
                         {stage === 'refenence' && (
                            <AddReference
                                selectedReferences={selectedReferences}
                                onSelect={setSelectedReferences}
                                onNextButton={handleReference}
                            />
                        )}
                    </>
                )}
            </View>

            {/* Success Modal */}
            <Portal>
                <Modal
                    visible={successModalVisible} onDismiss={() => setSuccessModalVisible(false)}
                    dismissable={false}
                    >
                    <View style={styles.modalContainer}>
                    {selectedReferences.length === 0 ? (
                        <View>
                        <Text variant="titleLarge" style={styles.modalText}>Thank you for registering</Text>
                        <Text style={styles.modalText}>
                            Your account has been successfully created. 
                            To apply for premium membership, please schedule an appointment through the calendar.
                        </Text>
                        </View>
                    ) : (
                        <View>
                        <Text variant="titleLarge">Sent for Confirmation</Text>
                        <Text style={styles.modalText}>
                            Once one of your references has confirmed, we will send you a membership form.
                            Until then, you can enjoy the free version of the app.
                        </Text>
                        </View>
                    )}

                    <Image 
                        source={require('../assets/confirmation-sent.png')} 
                        style={styles.image} />
                     {selectedReferences.length === 0 && (
                        <Button
                            mode="contained"
                            style={styles.scheduleButton}
                            onPress={() => {
                            setSuccessModalVisible(false);
                            navigation.navigate('CalendarlyScreen');
                            }}>
                            Schedule a meeting
                        </Button>
                    )}
                    <Button
                        style={styles.signInButton}
                        mode="contained"
                        onPress={() => {
                        setSuccessModalVisible(false);
                        navigation.navigate('SignIn');
                        }}>
                        <Text style={styles.singButtonText}>
                            Sign in
                        </Text>
                    </Button>
                    </View>
                </Modal>
            </Portal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginVertical: 10,
    },
    headerContainerRole: {
      flexDirection: 'row',
      justifyContent:'flex-end',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginVertical: 10,
  },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        marginHorizontal: '10%',
        alignItems: 'center',
    },
    image: {
        width: 250,
        height:250,
        marginVertical: 20,
    },
    modalText: {
        marginVertical: 10,
        textAlign: 'center',
    },
    scheduleButton: {
        width: '100%',
    },
    signInButton: {
        marginTop: 10,
        backgroundColor: '#e7c4e1',
        textAlign: 'center',
        width: '100%',
    },
    singButtonText: {
        color: '#b2469d',
    },
});

export default CreateProfile;
