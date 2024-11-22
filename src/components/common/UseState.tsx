import { useState } from 'react';

type UseStateProps<T> = {
    defaultValue: T;
    children: (value: T, setValue: (value: T) => void) => JSX.Element;
};

export function createUseState<T>(): (props: UseStateProps<T>) => JSX.Element {
    return (props: UseStateProps<T>) => {
        const {
            defaultValue,
            children
        } = props;

        const [
            value,
            setValue
        ] = useState(defaultValue);

        return children(
            value,
            setValue
        );
    };
}
