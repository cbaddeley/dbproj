import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { API_URL } from "src/app/api-token";
import { ICountryDTO } from "./country";
import { IFilmBudgetRatingsDTO, IFilmBudgetsDTO, IFilmRatingsDTO, ISuccessfulSeasonDTO } from "./films.dto";
import { IGenreDTO } from "./genre";

@Injectable()
export class FilmDataService {
    constructor(
        private http: HttpClient,
        @Inject(API_URL) private baseUrl: string
        ) { }

    public getCountries(): Observable<ICountryDTO[]> {
        return this.http.get<ICountryDTO[]>(`${this.baseUrl}/countries`);
    }

    public getGenres(): Observable<IGenreDTO[]> {
        return this.http.get<IGenreDTO[]>(`${this.baseUrl}/genres`);
    }

    public getSuccessfulSeasons(quartile: 'top_roi' | 'bottom_roi', startDate: string, endDate: string): Observable<ISuccessfulSeasonDTO[]> {
        let params = new HttpParams();
        params = params.append('quartile', quartile);
        params = params.append('startDate', startDate);
        params = params.append('endDate', endDate);
        return this.http.get<ISuccessfulSeasonDTO[]>(`${this.baseUrl}/seasons`, {params: params});
    }

    public getFilmRatings(): Observable<IFilmRatingsDTO[]> {
        return of([]).pipe(delay(2000))
    }

    public getFilmBudgets(): Observable<IFilmBudgetsDTO[]> {
        return of([]).pipe(delay(2000))
    }

    public getFilmBudgetRatings(): Observable<IFilmBudgetRatingsDTO[]> {
        return of([]).pipe(delay(2000))
    }
}