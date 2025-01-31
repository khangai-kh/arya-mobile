import React from 'react';
import { TouchableOpacity, Text} from 'react-native';
import { useTheme } from 'react-native-paper';

type CustomCheckboxProps = {
  checked: boolean;
  onToggle: () => void;
};

const CustomCheckbox = ({ checked, onToggle }: CustomCheckboxProps) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
        onPress={onToggle}
        activeOpacity={0.7}
        style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            borderWidth: 2,
            borderColor: checked ? colors.primary : colors.primary,
            backgroundColor: checked ? colors.primary  : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
        {checked && <Text style={{ color: '#fff', fontSize: 14 }}>✔</Text>}
        </TouchableOpacity>
    );
};

export default CustomCheckbox;
