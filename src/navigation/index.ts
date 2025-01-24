import { useSelector } from 'react-redux';
import { RootState } from './../redux/configureStore';
import { Guest } from './guest';
import { User } from './user';

export const Navigation = () => {
    if (useSelector((state: RootState) => state.auth.token)) {
        return (
            User()
        );
    } else {
        return (
           Guest()
        );
    }
};
