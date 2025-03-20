import { StyleProp, View, ViewStyle } from 'react-native';
import { HelperText, TextInput as RnpTextInput, TextInputProps as RnpTextInputProps } from 'react-native-paper';

export type TextInputProps = Omit<RnpTextInputProps, 'style' | 'outlineColor'> & {
    helperText?: string;
    style?: StyleProp<ViewStyle>;  // Container style
    inputStyle?: StyleProp<RnpTextInputProps['style']>;  // Input-specific style
    required?: boolean;
};

export const TextInput = (props: TextInputProps) => {
    const {
        required = false,
        helperText,
        label,
        style,
        inputStyle,
        ...otherProps
    } = props;

    // Default input styles
    const defaultInputStyle = {
        backgroundColor: '#fff'
    };

    return (
        <View style={style}>
            <RnpTextInput
                {...otherProps}
                label={required ? `${label} *` : label}
                outlineColor="#fff"
                style={[defaultInputStyle, inputStyle as RnpTextInputProps['style']]}  // Merge default and custom styles
            />
            {Boolean(helperText) && (
                <HelperText type={otherProps.error ? 'error' : 'info'}>
                    {helperText}
                </HelperText>
            )}
        </View>
    );
};