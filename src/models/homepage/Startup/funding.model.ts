import { BaseEntityModel } from '../../base-entity.model';

export interface FundingModel extends BaseEntityModel {
    id: number;
    startup_Id?: number | null;
    funding_deadline?: string | null;
    use_of_funds?: string | null;
    equity_offered?: number | null;
    investment_type?: string | null;
    discount_on_future_rounds?: number | null;
    maturity_date?: string | null;

    [key: string]: any; // Allows additional properties dynamically
}
