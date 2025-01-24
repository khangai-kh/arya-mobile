import { default as React } from 'react';
import { View as RnView, ViewProps as RnViewProps, ViewStyle } from 'react-native';

export interface ViewProps extends ViewStyle, RnViewProps { }

export const View = ({ children, style, ...props }: ViewProps) => {
    return (
        <RnView {...props} style={[props, style]}>
            {children}
        </RnView>
    );
};