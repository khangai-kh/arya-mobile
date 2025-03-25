import type { BaseEntityModel } from '../../base-entity.model';
import { BatchModel, DescribeModel, Industry, InterestModel, ProfileModel, Sector } from '../../general/models';
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
        role: ProfileModel;
        batch: BatchModel
        payment_method: string;
        is_agreement_accepted: boolean;
        is_confidentiality_accepted: boolean;
    }
}

export type UserModelWithoutContent = Pick<UserModel, 'id' | 'full_name'>;
