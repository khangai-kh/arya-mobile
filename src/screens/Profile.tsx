/* eslint-disable react/react-in-jsx-scope */
import { StackScreenProps } from '@react-navigation/stack';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { AppStackParams } from '../navigation/App';
import { setAuthToken } from '../redux/auth/reducer';

type ProfileProps = StackScreenProps<AppStackParams, 'Profile'> & {
    setAuthToken: (accessToken: string | null) => void;
};

const mapDispatchToProps = {
    setAuthToken,
};

export const Profile = connect(null, mapDispatchToProps)((props: ProfileProps) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { navigation, setAuthToken } = props;

    const handleLogout = () => {
        setAuthToken(null);


        navigation.navigate('SplashScreen');
    };

    return (
        <SafeAreaView
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
                flex: 1,
            }}
            edges={['top']}
        >
            <Button
                mode="contained"
                onPress={handleLogout}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                    marginTop: 20,
                    marginHorizontal: 16,
                }}
            >
                Log Out
            </Button>
        </SafeAreaView>
    );
});
