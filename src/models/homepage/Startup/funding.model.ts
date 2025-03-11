import { BaseEntityModel } from '../../base-entity.model';

export interface FundingModel extends BaseEntityModel {
    id: number;
    startupId?: number | null;
    fundingDeadline?: string | null;
    fundingRoundType?: string | null;
    useOfFunds?: string | null;
    equityOffered?: number | null;
    investmentType?: string | null;
    discountOnFutureRounds?: number | null;
    maturityDate?: string | null;

    [key: string]: any; // Allows additional properties dynamically
}
