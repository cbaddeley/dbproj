export interface ISuccessfulSeasonDTO {
    year: number;
    season: number;
    avgRating: number;
    avgROI: number;
}

export interface IFilmRatingsDTO {
    releaseDate: Date;
    avgRating: number;
    genre: string;
}

export interface IFilmBudgetsDTO {
    countryCode: string;
    month: number;
    budgetSum: number;
    countryName: string;
    year: number;
    budgetAvg: number;
}

export interface IFilmBudgetRatingsDTO {
    month: number;
    year: number;
    rating: number;
    budgetAvg: number;
}