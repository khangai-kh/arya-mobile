import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { default as WebView } from 'react-native-webview';
import { AppStackParams } from '../navigation/App';

type ExternalWebProps = StackScreenProps<AppStackParams, 'ExternalWeb'>;

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
