import { default as axios } from 'axios';
import config from '../config/config';
import { setAuthToken } from '../redux/auth/reducer';
import { store } from '../redux/configureStore';
//import { setProfile } from '../redux/profile/reducer';

export type CustomResponse<T> = {
    resultStatus: boolean;
    resultObject?: T;
    languageKeyword?: string;
};

export const API = axios.create({
    baseURL: config.apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

const onFulfilled = async (config: any) => {
    const { auth } = store.getState();
    if (auth?.token) {
        config.headers.authorization = `Bearer ${auth.token}`;
    }
    return config;
};

const onRejected = (error: any) => {
    if (error.response) {
        if (error.response.status === 401) {
            console.log('Unauthorized, clearing auth token.');
            store.dispatch(setAuthToken(null));
        }
        console.error('API Error Response:', error.response.data);
        //throw new Error(error.response.data.detail || 'An error occurred.');
    } else if (error.request) {
        console.error('Network Error: No response received.', error.request);
    } else {
        console.error('Unexpected Error:', error.message);
    }
    return Promise.reject(error.response || 'An error occurred.');
};

API.interceptors.request.use(
    onFulfilled,
    onRejected
);

API.interceptors.response.use(
    ({ data }) => data,
    onRejected
);
