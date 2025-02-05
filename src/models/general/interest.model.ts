import type { BaseEntityModel } from '../base-entity.model';

export interface InteresteModel extends BaseEntityModel {
    [x: string]: any;
    interest_id: number;
    interest_name: string;
    title : string;
    category_id: number;
    icon: null | string;
}

