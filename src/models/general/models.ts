import type { BaseEntityModel } from '../base-entity.model';

export interface DescribeModel extends BaseEntityModel {
    describes_id: number;
    interest_ame: string;
    icon?: string | null;

    [key: string]: any; // Allows additional properties dynamically
}

export interface InterestModel extends BaseEntityModel {
    id: number;
    name: string;
    title: string;
    category_id: number;
    icon?: string | null;

    [key: string]: any;
}

export interface MotivationModel extends BaseEntityModel {
    id: number;
    name: string;

    [key: string]: any;
}

export interface Sector {
    id: number;
    name: string;

    [key: string]: any;
}

export interface Industry {
    id: number;
    name: string;

    [key: string]: any;
}

export interface Phase {
    id: number;
    name: string;

    [key: string]: any;
}

export interface InvestmentStage {
    id: number;
    name: string;
    is_active: boolean;
    description: string;

    [key: string]: any;
}

export interface FundingRoundType extends BaseEntityModel {
    id: number;
    name: string;
    description: string;

    [key: string]: any;
}

export interface StartupType {
    id: number;
    name: string;

    [key: string]: any;
}

export interface CurrencyModel {
    id: number;
    name: string;
    symbol: string;

    [key: string]: any;
}

export interface ProfileModel {
    id: number;
    name: string;

    [key: string]: any;
}

export interface BatchModel {
    id: number;
    name: string;

    [key: string]: any;
}

export interface Image  {
    id: number;
    image_url?: string | null;
    alt_text?: string | null;

    [key: string]: any;
}

export interface ContentTypeModel{
    id: number;
    name?: string | null;

    [key: string]: any;
}

export interface EventModel {
    id: number;
    event_date: string | null;
    event_finish_date:  string | null;
    event_sub_title: string | null;
    event_location: string | null;
    event_address: string | null;
    event_coordinates: string | null;
    max_participants: number | null;
    is_better_future_circle_days: boolean;

    [key: string]: any;
}

export interface EventTypeModel {
    id: number;
    type_name: string | null;
    description:  string | null;
    icon_dark: string | null;
    icon_light: string | null;
    is_active: boolean | null;
    is_visible_category: boolean | null;

    [key: string]: any;
}
