import type { BaseEntityModel } from '../../base-entity.model';
import { StartupModel } from '../../homepage/Startup';
import { StartupBriefModel } from '../../homepage/Startup/startup.model';

export interface UserModel extends BaseEntityModel {
    [x: string]: any;
    id: number;
    full_name: string;
    email: null | string;
    linkedin_url: string;
    date_of_birth: null | string;
    address: null | string;
    roles: {
        role_id: number;
        role_name: string
    }[];
    photo: string;
    interests: {
        id: number;
        name: string
    }[];
    describes: {
        id: number;
        name: string
    }[];
    received_references: {
        id: number;
        name: string
    }[];
    given_references: {
        id: number;
        name: string
    }[];
    startups: StartupBriefModel[];
    carrier:{
        id: number;
        is_company_owner: boolean ;
        company_name: string;
        industry:{
            id: number;
            name: string;
        };
        sector:{
            id: number;
            name: string;
        };
        title: string;
        area_of_expertise: string;
    };
}

export type UserModelWithoutContent = Pick<UserModel, 'id' | 'full_name'>;
