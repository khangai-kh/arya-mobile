export type AgeRestriction = 'all-ages' | 'adults' | 'teenagers' | 'children';

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type Gender = 'male' | 'female';

export type Pagination<T, C = boolean> = C extends true ? { count: number; edges: T[]; } : { edges: T[]; };

export type ValidationError = {
    children: ValidationError[];
    constraints?: any;
    property: string;
    target: any;
    value?: any;
};
