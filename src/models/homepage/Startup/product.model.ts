import { BaseEntityModel } from '../../base-entity.model';
import { Image, Phase } from '../../general/models';

export interface ProductModel extends BaseEntityModel {
    id: number;
    name?: string | null;
    description?: string | null;
    images?: Image[] | null;
    phase?: Phase | null;

    [key: string]: any;
}
