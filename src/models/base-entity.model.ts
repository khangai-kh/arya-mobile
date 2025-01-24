
export interface BaseEntityModel {
    readonly createdAt: string;
    readonly modifiedAt: string | null;
    readonly modifiedId: number | null;
    readonly isValid: boolean;
}
