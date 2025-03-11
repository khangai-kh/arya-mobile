import { BaseEntityModel } from '../../base-entity.model';
import { ContentTypeModel } from '../../general/models';
import { UserModel } from '../../users/User/user.model';

export interface ContentModel extends BaseEntityModel {
    id: number;
    title?: string | null;
    description?: string | null;
    imageUrl: string;
    location?: string | null;
    contentTypeId?: number | null;
    contentType?: ContentTypeModel | null;
    createdUser?: UserModel | null;

    [key: string]: any; // Allows additional properties dynamically
}
