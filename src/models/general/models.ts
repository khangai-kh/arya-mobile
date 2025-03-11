import type { BaseEntityModel } from '../base-entity.model';

export interface DescribeModel extends BaseEntityModel {
    describesId: number;
    interestName: string;
    icon?: string | null;

    [key: string]: any; // Allows additional properties dynamically
}

export interface InterestModel extends BaseEntityModel {
    id: number;
    interestName: string;
    title: string;
    categoryId: number;
    icon?: string | null;

    [key: string]: any;
}

export interface MotivationModel extends BaseEntityModel {
    id: number;
    name: string;

    [key: string]: any;
}

export interface Sector {
    sectorId: number;
    sectorName: string;

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
    isActive: boolean;
    description: string;

    [key: string]: any;
}

export interface FundingRoundType {
    id: number;
    name: string;
    isActive: boolean;
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

export interface Image {
    imageUrl: string;
    altText?: string | null;

    [key: string]: any;
}

export interface ContentTypeModel extends BaseEntityModel {
    id: string;
    name?: string | null;

    [key: string]: any;
}
