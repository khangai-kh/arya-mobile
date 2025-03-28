import { BaseEntityModel } from '../../base-entity.model';
import { ContentTypeModel } from '../../general/models';
import { UserModelWithoutContent } from '../../users/User/user.model';

export interface ContentModel extends BaseEntityModel {
    id: number;
    title?: string | null;
    description?: string | null;
    image_url: string;
    location?: string | null;
    content_type_id?: number | null;
    content_type?: ContentTypeModel | null;
    created_user?: UserModelWithoutContent | null;

    [key: string]: any;
}
