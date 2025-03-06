import type { BaseEntityModel } from '../base-entity.model';

export interface DescribeModel extends BaseEntityModel {
    [x: string]: any;
    describes_id: number;
    interest_name: string;
    icon: null | string;
}

export interface InteresteModel extends BaseEntityModel {
    [x: string]: any;
    id: number;
    interest_name: string;
    title : string;
    category_id: number;
    icon: null | string;
}

export interface MotivationModel extends BaseEntityModel {
    [x: string]: any;
    id: number;
    name: string;
}

export interface Sector{
    [x: string]: any;
    sector_id: number;
    sector_name: string;
}

export interface Phase{
    [x: string]: any;
    id: number;
    name: string;
}

export interface InvestmentStage {
    [x: string]: any;
    id: number;
    name: string;
    is_active: boolean;
    description: string;
}

export interface FundingRoundType {
    [x: string]: any;
    id: number;
    name: string;
    is_active: boolean;
    description: string;
}

export interface StartupType{
    [x: string]: any;
    id: number;
    name: string;
}

export interface CurrencyModel{
    [x: string]: any;
    id: number;
    name: string;
    symbol: string;
}
