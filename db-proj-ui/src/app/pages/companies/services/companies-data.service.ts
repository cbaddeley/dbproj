import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "src/app/api-token";
import { ICompanyDTO, ICompanySuccessDTO } from "./company-dto";

@Injectable()
export class CompanyDataService {
    constructor(
        private http: HttpClient,
        @Inject(API_URL) private baseUrl: string
        ) { }

    public getCompanySuccessData(name: string, startDate: string, endDate: string): Observable<ICompanySuccessDTO[]> {
        let params = new HttpParams();
        params = params.append('name', name);
        params = params.append('startDate', startDate);
        params = params.append('endDate', endDate);

        return this.http.get<ICompanySuccessDTO[]>(`${this.baseUrl}/companySuccess`, {params: params});
    }

    public getCompanies(name: string): Observable<ICompanyDTO[]> {
        let params = new HttpParams();
        params = params.append('name', name);

        return this.http.get<ICompanyDTO[]>(`${this.baseUrl}/companies`, {params: params});
    }
}