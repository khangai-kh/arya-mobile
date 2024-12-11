import { Image } from 'react-native';
import { TextInput as RnpTextInput } from 'react-native-paper';
import { TextInput, TextInputProps } from './TextInput';
import { createUseState } from './UseState';

const UseStateBoolean = createUseState<boolean>();

export const TextInputSecure = (props: Omit<TextInputProps, 'secureTextEntry' | 'right'>) => {
    return (
        <UseStateBoolean defaultValue={false}>
            {(show, setShow) => (
                <TextInput
                    {...props}
                    secureTextEntry={!show}
                    right={
                        <RnpTextInput.Icon
                            onPress={() => setShow(!show)}
                            icon={() => (
                                <Image
                                    source={
                                        show
                                            ? require('../../assets/flat-icons/eye.png')
                                            : require('../../assets/flat-icons/eye-off.png')
                                    }
                                    style={{
                                        width: 24,
                                        height: 24,
                                    }}
                                />
                            )}
                        />
                    }
                />
            )}
        </UseStateBoolean>
    );
};
