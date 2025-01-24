import { BaseEntityModel } from '../../base-entity.model';
import { UserModel } from '../../users/User/user.model';
import { ContentTypeModel } from './content-type.model';

export interface ContentModel extends BaseEntityModel {
    id : number;
    title: null | string;
    description: null | string;
    imageURL: string;
    contentType : null | ContentTypeModel;
    createdUser : null | UserModel;
}
