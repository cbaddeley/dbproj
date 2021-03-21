import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ICountry, ICountryDTO } from "./country";
import { FilmDataService } from "./film-data.service";
import { IFilmBudgetRatingsDTO, IFilmBudgetsDTO, IFilmRatingsDTO, ISuccessfulSeasonDTO } from "./films.dto";
import { IFilmBudgetRatings, IFilmBudgets, IFilmRatings, ISuccessfulSeason } from "./films.model";
import { IGenre, IGenreDTO } from "./genre";

@Injectable()
export class FilmService {
    private _fetching: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public fetching: Observable<boolean> = this._fetching.asObservable();
    
    constructor(private dataService: FilmDataService) { }

    public getCountries(): Observable<ICountry[]> {
        return this.dataService.getCountries().pipe(
            map((countries) => this.mapCountries(countries))
        )
    }

    public getGenres(): Observable<IGenre[]> {
        return this.dataService.getGenres().pipe(
            map((genres) => this.mapGenres(genres))
        )
    }

    public searchSuccessfulSeasons(): Observable<ISuccessfulSeason[]> {
        this._fetching.next(true);
        return this.dataService.getSuccessfulSeasons().pipe(
            tap(() => this._fetching.next(false)),
            map((d) => this.mapSuccessfulSeasons(d))
        );
    }

    public searchFilmRatings(): Observable<IFilmRatings[]> {
        this._fetching.next(true);
        return this.dataService.getFilmRatings().pipe(
            tap(() => this._fetching.next(false)),
            map((d) => this.mapFilmRatings(d))
        );
    }

    public searchFilmBudgets(): Observable<IFilmBudgets[]> {
        this._fetching.next(true);
        return this.dataService.getFilmBudgets().pipe(
            tap(() => this._fetching.next(false)),
            map((d) => this.mapFilmBudgets(d))
        );
    }

    public searchFilmBudgetRatings(): Observable<IFilmBudgetRatings[]> {
        this._fetching.next(true);
        return this.dataService.getFilmBudgetRatings().pipe(
            tap(() => this._fetching.next(false)),
            map((d) => this.mapFilmBudgetRatings(d))
        );
    }

    private mapGenres(genres: IGenreDTO[]): IGenre[] {
        return genres;
    }

    private mapCountries(countries: ICountryDTO[]): ICountry[] {
        return countries;
    }

    private mapSuccessfulSeasons(data: ISuccessfulSeasonDTO[]): ISuccessfulSeason[] {
        return data;
    }

    private mapFilmRatings(data: IFilmRatingsDTO[]): IFilmRatings[] {
        return data;
    }

    private mapFilmBudgets(data: IFilmBudgetsDTO[]): IFilmBudgets[] {
        return data;
    }

    private mapFilmBudgetRatings(data: IFilmBudgetRatingsDTO[]): IFilmBudgetRatings[] {
        return data;
    }

}