import { Children, ReactNode } from 'react';
import { Dimensions, StyleSheet, View, ViewProps } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export type GridProps = {
    containerPadding: number;
    columns: number;
    spacing: number;
    parentWidth?: number;
    children: ReactNode | ReactNode[];
};

const styles = (
    windowWidth: number,
    containerPadding: number,
    columns: number,
    spacing: number
) => StyleSheet.create({
    container: {
        paddingHorizontal: containerPadding
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: -spacing,
        marginStart: -spacing
    },
    gridItem: {
        marginTop: spacing,
        marginStart: spacing,
        width: Math.floor((windowWidth - spacing * (columns - 1) - containerPadding * 2) / columns)
    }
});

export const Grid = (props: ViewProps & GridProps) => {
    const key = uuidv4();
    const width = Dimensions.get('window').width;
    const {
        containerPadding,
        columns,
        spacing,
        parentWidth,
        style,
        ...otherProps
    } = props;
    const {
        container,
        gridContainer,
        gridItem
    } = styles(
        parentWidth ?? width,
        containerPadding,
        columns,
        spacing
    );

    return (
        <View {...otherProps} style={[container, style]}>
            <View style={gridContainer}>
                {Children.map(props.children, (child, index) => (
                    <View key={`${key}-${index}`} style={gridItem}>
                        {child}
                    </View>
                ))}
            </View>
        </View>
    );
};
