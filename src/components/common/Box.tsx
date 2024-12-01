import { DimensionValue, StyleSheet, View, ViewProps } from 'react-native';

export type BoxProps = {
    m?: DimensionValue;
    mx?: DimensionValue;
    my?: DimensionValue;
    mt?: DimensionValue;
    mb?: DimensionValue;
    ml?: DimensionValue;
    mr?: DimensionValue;
    p?: DimensionValue;
    px?: DimensionValue;
    py?: DimensionValue;
    pt?: DimensionValue;
    pb?: DimensionValue;
    pl?: DimensionValue;
    pr?: DimensionValue;
};

const styles = ({
    m,
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
    p,
    px,
    py,
    pt,
    pb,
    pl,
    pr,
}: BoxProps) => StyleSheet.create({
    box: {
        margin: m,
        marginHorizontal: mx,
        marginVertical: my,
        marginTop: mt,
        marginBottom: mb,
        marginLeft: ml,
        marginRight: mr,
        padding: p,
        paddingHorizontal: px,
        paddingVertical: py,
        paddingTop: pt,
        paddingBottom: pb,
        paddingLeft: pl,
        paddingRight: pr
    }
});

export const Box = (props: ViewProps & BoxProps) => {
    const {
        m,
        mx,
        my,
        mt,
        mb,
        ml,
        mr,
        p,
        px,
        py,
        pt,
        pb,
        pl,
        pr,
        style,
        ...otherProps
    } = props;
    const { box } = styles({
        m,
        mx,
        my,
        mt,
        mb,
        ml,
        mr,
        p,
        px,
        py,
        pt,
        pb,
        pl,
        pr,
    });

    return (
        <View
            {...otherProps}
            style={[
                box,
                style
            ]}
        />
    );
};
