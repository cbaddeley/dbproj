import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { formatDate } from 'src/app/utils/date-util';
import { ICountry, ICountryDTO } from './country';
import { FilmDataService } from './film-data.service';
import {
  IFilmBudgetRatingsDTO,
  IFilmBudgetsDTO,
  IFilmRatingsDTO,
  ISuccessfulSeasonDTO,
} from './films.dto';
import {
  IFilmBudgetRatings,
  IFilmBudgets,
  IFilmRatings,
  ISuccessfulSeason,
  Season,
} from './films.model';
import { IGenre, IGenreDTO } from './genre';

@Injectable()
export class FilmService {
  private _fetching: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public fetching: Observable<boolean> = this._fetching.asObservable();

  constructor(private dataService: FilmDataService) {}

  public getCountries(): Observable<ICountry[]> {
    return this.dataService
      .getCountries()
      .pipe(map((countries) => this.mapCountries(countries)));
  }

  public getGenres(): Observable<IGenre[]> {
    return this.dataService
      .getGenres()
      .pipe(map((genres) => this.mapGenres(genres)));
  }

  public searchSuccessfulSeasons(
    quartile: 'top_roi' | 'bottom_roi' | 'top_rating' | 'bottom_rating', 
    startDate: Date,
    endDate: Date
  ): Observable<ISuccessfulSeason[]> {
    this._fetching.next(true);
    return this.dataService
      .getSuccessfulSeasons(
        quartile,
        formatDate(startDate),
        formatDate(endDate)
      )
      .pipe(
        tap(() => this._fetching.next(false)),
        map((d) => this.mapSuccessfulSeasons(d))
      );
  }

  public searchFilmRatings(
    genres: number[],
    startDate: Date,
    endDate: Date
  ): Observable<IFilmRatings[]> {
    this._fetching.next(true);
    return this.dataService
      .getFilmRatings(genres, formatDate(startDate), formatDate(endDate))
      .pipe(
        tap(() => this._fetching.next(false)),
        map((d) => this.mapFilmRatings(d))
      );
  }

  public searchFilmBudgets(
    countries: string[],
    startDate: Date,
    endDate: Date
  ): Observable<IFilmBudgets[]> {
    this._fetching.next(true);
    return this.dataService
      .getFilmBudgets(countries, formatDate(startDate), formatDate(endDate))
      .pipe(
        tap(() => this._fetching.next(false)),
        map((d) => this.mapFilmBudgets(d))
      );
  }

  public searchFilmBudgetRatings(
    ratings: string[],
    startDate: Date,
    endDate: Date
  ): Observable<IFilmBudgetRatings[]> {
    this._fetching.next(true);
    return this.dataService
      .getFilmBudgetRatings(ratings, formatDate(startDate), formatDate(endDate))
      .pipe(
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

  private mapSuccessfulSeasons(
    data: ISuccessfulSeasonDTO[]
  ): ISuccessfulSeason[] {
    return data.map((d) => {
      let season: Season;
      if (d.season == 1) season = Season.Winter;
      if (d.season == 2) season = Season.Spring;
      if (d.season == 3) season = Season.Summer;
      if (d.season == 4) season = Season.Fall;
      return {
        ...d,
        season: season,
      };
    });
  }

  private mapFilmRatings(data: IFilmRatingsDTO[]): IFilmRatings[] {
    return data.map((d) => {
      const date = new Date(d.releaseDate);
      const isoDate = date.toISOString();
      return {
        releaseDate: isoDate,
        avgRating: d.avgRating,
        genre: d.genre,
        title: d.title
      };
    });
  }

  private mapFilmBudgets(data: IFilmBudgetsDTO[]): IFilmBudgets[] {
    return data;
  }

  private mapFilmBudgetRatings(
    data: IFilmBudgetRatingsDTO[]
  ): IFilmBudgetRatings[] {
    return data;
  }
}
