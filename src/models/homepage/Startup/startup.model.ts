import { ForceTouchGestureChangeEventPayload } from 'react-native-gesture-handler';
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
import { FundingModel } from './funding.model';

export interface StartupModel extends BaseEntityModel {
    id: number;
    name?: string | null;
    logo?: string | null;
    description?: string | null;
    funding_round_type?: FundingRoundType | null;
    startup_investment_status?: InvestmentStage | null;
    startup_type?: StartupType | null;
    startup_status?: InvestmentStage | null;
    founders?: UserModel[] | null;
    investors?: UserModel[] | null;
    products?: ProductModel[] | null;
    total_investment?: number | null;
    fundings?: FundingModel[] | null;
    pitch_decks?: PitchDeckModel[] | null;
    is_favorite: boolean;
    currency?: CurrencyModel | null;
    founder_title?: string | null;
    joined_at?: string | null;
    valuation?: number | null;
    target_amount?: number | null;
    amount_collected?: number | null;
    created_user?: number | null;
    
    [key: string]: any;
}

export type StartupBriefModel = Pick<StartupModel,
    'id' |
    'name' |
    'description' |
    'founder_title' |
    'joined_at' |
    'startup_logo'>;
