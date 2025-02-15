import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/auth';
import { SignInDto } from '../../services/auth/dto/sign-in.dto';

export type SignInPayload = {
    message: string;
    token: string;
    token_type: string;
    roles: { role_id: number; role_name: string }[];
};

export const signIn = createAsyncThunk<SignInPayload, SignInDto, { rejectValue: string; }>('api/login', async (dto, { rejectWithValue }) => {
    try {
        return await authService.signIn(dto);
    } catch (err: any) {
        return rejectWithValue('The email address or password is incorrect.');
    }
});
