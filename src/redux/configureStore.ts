import { default as storage } from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';
import authReducer, { AuthState } from './auth/reducer';
import filterReducer, { FilterState } from './filter/reducer';
import { StartupState } from './startup/reducer';

export type RootState = {
  auth: AuthState;
  filter: FilterState;
  startup: StartupState;
};

const authPersistConfig: PersistConfig<AuthState> = {
  key: 'auth',
  storage: storage,
  whitelist: ['token', 'role', 'user_id'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export const persistor = persistStore(store);
