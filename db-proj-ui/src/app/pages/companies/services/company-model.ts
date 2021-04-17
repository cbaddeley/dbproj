export interface ICompany {
    name: string;
}

export interface ICompanySuccess {
    releaseDate: string | Date;
    title: string;
    avgRating: number;
    roi: number;
    budget: number;
    revenue: number;
    companyName: string;
}