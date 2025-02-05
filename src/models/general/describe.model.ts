import type { BaseEntityModel } from '../base-entity.model';

export interface DescribeModel extends BaseEntityModel {
    [x: string]: any;
    describes_id: number;
    interest_name: string;
    icon: null | string;
}

