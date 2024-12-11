import { StyleProp, View, ViewStyle } from 'react-native';
import { HelperText, TextInput as RnpTextInput, TextInputProps as RnpTextInputProps } from 'react-native-paper';

export type TextInputProps = Omit<RnpTextInputProps, 'style' | 'outlineColor'> & {
    helperText?: string;
    style?: StyleProp<ViewStyle>;
    required?: boolean;
};

export const TextInput = (props: TextInputProps) => {
    const {
        required = false,
        helperText,
        label,
        style,
        ...otherProps
    } = props;

    return (
        <View style={style}>
            <RnpTextInput
                {...otherProps}
                label={required ? `${label} *` : label}
                outlineColor="#fff"
                style={{
                    backgroundColor: '#fff'
                }}
            />
            {Boolean(helperText) && (
                <HelperText type={otherProps.error ? 'error' : 'info'}>
                    {helperText}
                </HelperText>
            )}
        </View>
    );
};
