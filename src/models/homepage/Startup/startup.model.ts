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
    startup_logo?: string | null;
    description?: string | null;
    funding_round_type?: FundingRoundType | null;
    startup_type?: StartupType | null;
    startup_status?: InvestmentStage | null;
    founders?: UserModel[] | null;
    products?: ProductModel[] | null;
    total_investment?: number | null;
    fundings?: UserModel[] | null;
    pitch_decks?: PitchDeckModel[] | null;
    is_favorite: boolean;
    currency?: CurrencyModel | null;
    founder_title?: string | null;
    joined_at?: string | null;

    [key: string]: any;
}

export type StartupBriefModel = Pick<StartupModel,
    'id' |
    'name' |
    'description' |
    'founder_title' |
    'joined_at' |
    'startup_logo'>;
