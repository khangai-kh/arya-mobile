import { BaseEntityModel } from '../../base-entity.model';

export interface PitchDeckModel extends BaseEntityModel {
    id: number;
    fileUrl?: string | null;
    fileName?: string | null;

    [key: string]: any; // Allows additional properties dynamically
}
