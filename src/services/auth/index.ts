import { API } from '../../plugins/axios';
import { SignInDto } from './dto/sign-in.dto';

export const signIn = async (dto: SignInDto): Promise<string> => {
    try {
        console.log('Sending sign-in request:', dto);
        const response = await API.post<{ token: string }>('/api/login', dto);
        console.log('Sign-in response:', response);
        if (response.token) {
            return response.token;
        }
        throw new Error('Token is missing in the response.');
    } catch (error: any) {
        console.error('Error during sign-in:', error.message);
        throw error;
    }
};

