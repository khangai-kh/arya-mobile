import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  accessToken: string | null;
  user: any;
  launched: boolean;
};

const initialState: AuthState = {
  accessToken: null,
  user: null,
  launched: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state: AuthState, { payload }: PayloadAction<string | null>) {
      state.accessToken = payload;
    },
    setUser(state: AuthState, { payload }: PayloadAction<any>) {
      state.user = payload;
    },
    setLaunched(state: AuthState, { payload }: PayloadAction<boolean>) {
      state.launched = payload;
    }
  }
});

export const { setAccessToken, setUser, setLaunched } = authSlice.actions;
export default authSlice.reducer;
