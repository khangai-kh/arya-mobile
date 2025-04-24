import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signIn, SignInPayload } from './actions';

export type AuthState = {
    token: string | null;
    logout : number | null;
    tokenType: string | null;
    role: number | null;
    user_id: number | null;
    message: string | null;
    errorMessage: string | null;
    status: 'idle' | 'pending';
};

const initialState: AuthState = {
    token: null,
    tokenType: null,
    role: null,
    user_id: null,
    message: null,
    errorMessage: null,
    status: 'idle',
    logout: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogout(state, action: PayloadAction<number>) {
            state.logout = action.payload;
            state.token = null;
        },
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
            .addCase(signIn.fulfilled, (state, action: PayloadAction<SignInPayload>) => {
                state.token = action.payload.token;
                state.logout = null;
                state.tokenType = action.payload.token_type;
                state.role = action.payload.roles.length > 0 ? action.payload.roles[0].role_id : null;
                state.user_id = action.payload.user_id;
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

export const { setAuthToken, setErrorMessage, setLogout } = authSlice.actions;

export default authSlice.reducer;
