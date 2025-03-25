import type { BaseEntityModel } from '../base-entity.model';

export interface DescribeModel extends BaseEntityModel {
    describes_id: number;
    interest_ame: string;
    icon?: string | null;

    [key: string]: any; // Allows additional properties dynamically
}

export interface InterestModel extends BaseEntityModel {
    id: number;
    interes_name: string;
    title: string;
    category_id: number;
    icon?: string | null;

    [key: string]: any;
}

export interface MotivationModel extends BaseEntityModel {
    id: number;
    name: string;

    [key: string]: any;
}

export interface Sector {
    id: number;
    name: string;

    [key: string]: any;
}

export interface Industry {
    id: number;
    name: string;

    [key: string]: any;
}

export interface Phase {
    id: number;
    name: string;

    [key: string]: any;
}

export interface InvestmentStage {
    id: number;
    name: string;
    is_active: boolean;
    description: string;

    [key: string]: any;
}

export interface FundingRoundType extends BaseEntityModel {
    id: number;
    name: string;
    description: string;

    [key: string]: any;
}

export interface StartupType {
    id: number;
    name: string;

    [key: string]: any;
}

export interface CurrencyModel {
    id: number;
    name: string;
    symbol: string;

    [key: string]: any;
}

export interface ProfileModel {
    id: number;
    name: string;

    [key: string]: any;
}

export interface Image {
    image_url?: string | null;
    alt_text?: string | null;

    [key: string]: any;
}

export interface ContentTypeModel extends BaseEntityModel {
    id: string;
    name?: string | null;

    [key: string]: any;
}
