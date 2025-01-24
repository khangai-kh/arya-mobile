import type { BaseEntityModel } from '../../base-entity.model';

export interface UserModel extends BaseEntityModel {
    [x: string]: any;
    userId: number;
    fullName: string;
    password: null | string;
    phoneNumber: string;
    picture: null | string;
    birthDate: null |string;
    address: null | string;
}

export type UserModelWithoutContent = Pick<UserModel, 'userId' | 'fullName'>;
