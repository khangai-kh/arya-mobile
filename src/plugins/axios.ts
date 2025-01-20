import { default as axios } from 'axios';
import { baseURL } from '../constants/env';
import { setAuthToken } from '../redux/auth/reducer';
import { store } from '../redux/configureStore';
//import { setProfile } from '../redux/profile/reducer';

export type CustomResponse<T> = {
    resultStatus: boolean;
    resultObject?: T;
    languageKeyword?: string;
};

export const API = axios.create({
    baseURL: baseURL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});

const onFulfilled = async (config: any) => {
    const { auth } = store.getState();
    if (auth?.authToken) {
        config.headers.authorization = `Bearer ${auth.authToken}`;
    }
    return config;
};

const onRejected = (error: any) => {
    if (error?.response?.status === 401) {
        store.dispatch(setAuthToken(null));
        //store.dispatch(setProfile(null));
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