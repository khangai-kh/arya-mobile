import type { BaseEntityModel } from '../../base-entity.model';
import { DescribeModel, Industry, InterestModel, MotivationModel, Sector } from '../../general/models';
import { StartupBriefModel } from '../../homepage/Startup/startup.model';

export interface UserModel extends BaseEntityModel {
    [x: string]: any;
    id: number;
    full_name: null | string;
    email: null | string;
    linkedin_url: null | string;
    date_of_birth: null | string;
    phone : null | string;
    address: null | string;
    roles: {
        id: number;
        role_name: string
    }[];
    photo: string;
    interests: InterestModel[];
    describes: DescribeModel[];
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
        industry: Industry
        sector: Sector;
        title: string;
        area_of_expertise: string;
    };
    additional:{
        id: number;
        introduction_paragraph: string;
        motivation: MotivationModel;
        payment_method: string;
        is_agreement_accepted: boolean;
        is_confidentiality_accepted: boolean;
    }
}

export type UserModelWithoutContent = Pick<UserModel, 'id' | 'full_name'>;
