import { BaseEntityModel } from '../../base-entity.model';
import { UserModel } from '../../users/User/user.model';
import { ContentTypeModel } from './content-type.model';

export interface ContentModel extends BaseEntityModel {
    id : number;
    title: null | string;
    description: null | string;
    image_url: string;
    location: null | string;
    content_type_id : null | number;
    content_type : null | ContentTypeModel
    createdUser : null | UserModel;
}
