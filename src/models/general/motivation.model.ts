import type { BaseEntityModel } from '../base-entity.model';

export interface MotivationModel extends BaseEntityModel {
    [x: string]: any;
    interest_id: number;
    interest_name: string;
}

