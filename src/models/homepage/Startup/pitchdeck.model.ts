import { BaseEntityModel } from '../../base-entity.model';

export interface PitchDeckModel extends BaseEntityModel {
    id: number;
    file_url?: string | null;
    file_name?: string | null;

    [key: string]: any;
}
