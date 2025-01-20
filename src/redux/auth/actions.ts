import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/auth';
import { SignInDto } from '../../services/auth/dto/sign-in.dto';

export const signIn = createAsyncThunk<string, SignInDto, { rejectValue: string; }>('api/login', async (dto, { rejectWithValue }) => {
    try {
        return await authService.signIn(dto);
    } catch (err: any) {
        return rejectWithValue('The email address or password is incorrect.');
    }
});
