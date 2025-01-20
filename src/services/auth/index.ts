import { API } from '../../plugins/axios';
import { SignInDto } from './dto/sign-in.dto';

const endpoint = '/api/login';

export const signIn = async (dto: SignInDto): Promise<string> => {
    return await API.post<{ token: string; }>(`${endpoint}/token`, dto)
        .then(async ({ data }) => data.token);
};
