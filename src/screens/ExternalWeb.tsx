import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { default as WebView } from 'react-native-webview';
import { MainStackParams } from '../models/navigation';

type ExternalWebProps = StackScreenProps<MainStackParams, 'ExternalWeb'>;

export const ExternalWeb = (props: ExternalWebProps) => {
    const { url } = props.route.params;

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
            edges={[
                'bottom'
            ]}
        >
            <WebView
                source={{
                    uri: url
                }}
                style={{
                    flex: 1
                }}
            />
        </SafeAreaView>
    );
};
