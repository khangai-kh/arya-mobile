import { StackScreenProps } from '@react-navigation/stack';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParams } from '../navigation/App';

type StartupProps = StackScreenProps<AppStackParams, 'Startup'>;

export const Startup = (props: StartupProps) => {

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
            <View
                style={{
                    flex: 1,
                    marginTop: 24,
                    marginHorizontal: 16
                }}
            >

            </View>
        </SafeAreaView>
    );
};