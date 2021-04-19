export interface ISuccessfulSeason {
    year: number;
    season: Season;
    avgRating: number;
    avgROI: number;
}

export enum Season {
    Winter = 'Winter',
    Spring = 'Spring',
    Summer = 'Summer',
    Fall = 'Fall'
}

export interface IFilmRatings {
    releaseDate: string;
    avgRating: number;
    genre: string;
    title: string;
}

export interface IFilmBudgets {
    countryCode: string;
    month: number;
    budgetSum: number;
    countryName: string;
    year: number;
    budgetAvg: number;
}

export interface IFilmBudgetRatings {
    month: number;
    year: number;
    rating: number;
    budgetAvg: number;
}