import { BaseEntityModel } from '../../base-entity.model';
import {
    CurrencyModel,
    FundingRoundType,
    InvestmentStage,
    StartupType,
} from '../../general/models';
import { UserModel } from '../../users/User/user.model';
import { PitchDeckModel } from './pitchdeck.model';
import { ProductModel } from './product.model';

export interface StartupModel extends BaseEntityModel {
    id: number;
    name?: string | null;
    description?: string | null;
    fundingRoundType?: FundingRoundType | null;
    startupType?: StartupType | null;
    startupStatus?: InvestmentStage | null;
    founders?: UserModel[] | null;
    products?: ProductModel[] | null;
    totalInvestment?: number | null;
    fundings?: UserModel[] | null;
    pitchDecks?: PitchDeckModel[] | null;
    isFavorite: boolean;
    currency?: CurrencyModel | null;

    [key: string]: any;
}
