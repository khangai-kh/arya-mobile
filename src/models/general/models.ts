import type { BaseEntityModel } from '../base-entity.model';

export interface DescribeModel extends BaseEntityModel {
    [x: string]: any;
    describes_id: number;
    interest_name: string;
    icon: null | string;
}

export interface InteresteModel extends BaseEntityModel {
    [x: string]: any;
    interest_id: number;
    interest_name: string;
    title : string;
    category_id: number;
    icon: null | string;
}

export interface MotivationModel extends BaseEntityModel {
    [x: string]: any;
    interest_id: number;
    interest_name: string;
}

export interface Sector{
    [x: string]: any;
    sector_id: number;
    sector_name: string;
}
