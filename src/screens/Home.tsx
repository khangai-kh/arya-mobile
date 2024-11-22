import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParams } from '../navigation/App';
import { BottomTabStackParams } from '../navigation/BottomTab';

type HomeProps = CompositeScreenProps<BottomTabScreenProps<BottomTabStackParams, 'Home'>, StackScreenProps<AppStackParams>>;

export const Home = (props: HomeProps) => {

    return (
        <SafeAreaView>
            <View>
                <Text style={{
                    color: "#000"
                }}>
                    under development
                </Text>
            </View>
        </SafeAreaView>
    );
};