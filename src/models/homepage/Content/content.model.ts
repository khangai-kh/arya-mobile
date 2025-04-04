import { BaseEntityModel } from '../../base-entity.model';
import { ContentTypeModel, EventModel, Image } from '../../general/models';
import { UserModelWithoutContent } from '../../users/User/user.model';

export interface ContentModel extends BaseEntityModel {
    id: number;
    title?: string;
    description?: string | null;
    image_url: string;
    location?: string | null;
    content_type_id?: number | null;
    content_type?: ContentTypeModel | null;
    created_user?: UserModelWithoutContent | null;

    [key: string]: any;
}

export interface ContentDetailModel extends BaseEntityModel {
    id: number;
    title?: string;
    description?: string;
    content_type?: ContentTypeModel;
    event?: EventModel;
    images?: Image[];
    created_user: UserModelWithoutContent;

    [key: string]: any;
  }
