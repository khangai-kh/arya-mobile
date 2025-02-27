import { API } from '../../plugins/axios';
import { SignInDto } from './dto/sign-in.dto';
import { SignInPayload } from '../../redux/auth/actions';

export const signIn = async (dto: SignInDto): Promise<SignInPayload> => {
    try {
        console.log('Sending sign-in request:', dto);

        const response = await API.post<SignInPayload>('/api/login', dto);
        console.log('Sign-in response:', response);

        if (response.token && response.roles) {
            return {
                message: response.message,
                token: response.token,
                token_type: response.token_type,
                roles: response.roles,
                user_id: response.user_id,
            };
        }

        throw new Error('Token or roles are missing in the response.');

    } catch (error: any) {
        console.error('Error during sign-in:', error.message);
        throw error;
    }
};
