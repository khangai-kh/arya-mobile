import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signIn } from './actions';

export type AuthState = {
    token: string | null;
    errorMessage: string | null;
    status: 'idle' | 'pending';
};

const initialState: AuthState = {
    token: null,
    errorMessage: null,
    status: 'idle',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthToken(state, { payload }: PayloadAction<string | null>) {
            state.token = payload;
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
                state.token = payload;
                state.errorMessage = null;
                state.status = 'idle';
            })
            .addCase(signIn.rejected, (state, { payload }) => {
                state.token = null;
                state.errorMessage = payload ?? null;
                state.status = 'idle';
            });
    },
});


export const { setAuthToken, setErrorMessage } = authSlice.actions;

export default authSlice.reducer;
