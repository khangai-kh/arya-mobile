import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signIn } from './actions';

export type AuthState = {
    token: string | null;
    tokenType: string | null;
    role: number | null;
    message: string | null;
    errorMessage: string | null;
    status: 'idle' | 'pending';
};

const initialState: AuthState = {
    token: null,
    tokenType: null,
    role: null,
    message: null,
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
            .addCase(signIn.fulfilled, (state, action: PayloadAction<{ token: string; token_type: string; roles: { role_id: number }[]; message: string }>) => {
                console.log('Sign-in Payload:', action.payload);
                state.token = action.payload.token;
                state.tokenType = action.payload.token_type;
                state.role = action.payload.roles.length > 0 ? action.payload.roles[0].role_id : null;
                state.message = action.payload.message;
                state.errorMessage = null;
                state.status = 'idle';
            })
            .addCase(signIn.rejected, (state, { payload }) => {
                state.token = null;
                state.tokenType = null;
                state.role = null;
                state.message = null;
                state.errorMessage = (payload as string) ?? null;
                state.status = 'idle';
            });
    },
});

export const { setAuthToken, setErrorMessage } = authSlice.actions;

export default authSlice.reducer;
