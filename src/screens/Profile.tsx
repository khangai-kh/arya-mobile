import { StackScreenProps } from '@react-navigation/stack';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { AppStackParams } from '../navigation/App';
import { setAccessToken, setUser } from '../redux/auth/slice';

type ProfileProps = StackScreenProps<AppStackParams, 'Profile'> & {
    setAccessToken: (accessToken: string | null) => void;
    setUser: (user: any) => void;
};

const mapDispatchToProps = {
    setAccessToken,
    setUser,
};

export const Profile = connect(null, mapDispatchToProps)((props: ProfileProps) => {
    const { navigation, setAccessToken, setUser } = props;

    const handleLogout = () => {
        setAccessToken(null);
        setUser(null);

        navigation.navigate('SplashScreen');
    };

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
            edges={['top']}
        >
            <Button
                mode="contained"
                onPress={handleLogout}
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
