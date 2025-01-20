import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signIn } from './actions';

export type AuthState = {
    authToken: string | null;
    errorMessage: string | null;
    status: 'idle' | 'pending';
};

const initialState: AuthState = {
    authToken: null,
    errorMessage: null,
    status: 'idle',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthToken(state, { payload }: PayloadAction<string | null>) {
            state.authToken = payload;
        },
        setErrorMessage(state, { payload }: PayloadAction<string | null>) {
            state.errorMessage = payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(signIn.pending, state => {
                state.errorMessage = null;
                state.status = 'pending';
            })
            .addCase(signIn.fulfilled, (state, { payload }) => {
                state.authToken = payload;
                state.errorMessage = null;
                state.status = 'idle';
            })
            .addCase(signIn.rejected, (state, { payload }) => {
                state.authToken = null;
                state.errorMessage = payload ?? null;
                state.status = 'idle';
            });
    },
});


export const { setAuthToken, setErrorMessage } = authSlice.actions;

export default authSlice.reducer;
