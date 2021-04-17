import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { formatDate } from "src/app/utils/date-util";
import { ICompanyDTO, ICompanySuccessDTO } from "./company-dto";
import { ICompany, ICompanySuccess } from "./company-model";
import { CompanyDataService } from "./companies-data.service";

@Injectable()
export class CompaniesService {
    private _fetching: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public fetching: Observable<boolean> = this._fetching.asObservable();
    
    constructor(private dataService: CompanyDataService) { }

    public searchCompanies(name: string): Observable<ICompany[]> {
        return this.dataService.getCompanies(name).pipe(
            map((companies) => this.mapCompanies(companies))
        )
    }
    
    public searchCompanySuccess(name: string, startDate: Date, endDate: Date) {
        this._fetching.next(true);
        return this.dataService.getCompanySuccessData(name, formatDate(startDate), formatDate(endDate)).pipe(
            tap(() => this._fetching.next(false)),
            map((d) => this.mapCompanySuccessData(d))
        );
    }

    private mapCompanySuccessData(companySuccessData: ICompanySuccessDTO[]): ICompanySuccess[] {
        return companySuccessData.map(d => {
            const date = new Date(d.releaseDate);
            const isoDate = date.toISOString();
            return {
                releaseDate: isoDate,
                title: d.title,
                roi: d.roi,
                avgRating: d.avgRating,
                companyName: d.companyName,
                budget: d.budget,
                revenue: d.revenue
            }
        })
    }

    private mapCompanies(companies: ICompanyDTO[]): ICompany[] {
        return companies;
    }
}