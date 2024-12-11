import { default as axios } from 'axios';
import { baseURL } from '../constants/env';
import { setAccessToken, setUser } from '../redux/auth/slice';
import { store } from '../redux/configureStore';

export const API = axios.create({
    baseURL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

const onFulfilled = (config: any) => {
    const { accessToken } = store.getState().auth;
    if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
};

const onRejected = (error: any) => {
    if (error?.graphQLErrors?.some((err: any) => err.extensions.code === 'UNAUTHENTICATED')) {
        store.dispatch(setAccessToken(null));
        store.dispatch(setUser(null));
    }
    return Promise.reject(error);
};

API.interceptors.request.use(
    onFulfilled,
    onRejected
);

API.interceptors.response.use(
    ({ data }) => data,
    onRejected
);