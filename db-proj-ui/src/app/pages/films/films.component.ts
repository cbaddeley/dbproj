import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { IBudgetRatingsFormData } from './query-forms/film-budget-ratings-form.component';
import { IBudgetFormData } from './query-forms/film-budgets-form.component';
import { IRatingsFormData } from './query-forms/film-ratings-form.component';
import { ISeasonSuccessFormData } from './query-forms/film-seasons-form.component';
import { FilmService } from './services/film.service';
import { IFilmBudgetRatings, IFilmBudgets, IFilmRatings, ISuccessfulSeason } from './services/films.model';



@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmsComponent {
  public fetching: Observable<boolean> = this.service.fetching;
  public activeQuery: Observable<string> = this.route.queryParams.pipe(
    tap(() => this.searched = false),
    map((q) => q.query),
    shareReplay()
  );
  
  public searched = false;
  // public successfulSeasonsData: ISuccessfulSeason[] = [];
  // public filmRatingsData: IFilmRatings[] = [];
  // public filmBudgetData: IFilmBudgets[] = [];
  // public filmBudgetRatingsData: IFilmBudgetRatings[] = [];
  public results: ISuccessfulSeason[] | IFilmRatings[] | IFilmBudgetRatings[] | IFilmBudgetRatings[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private service: FilmService
  ) { }

  public handleSuccessFormSubmit(formData: ISeasonSuccessFormData) {
    this.service.searchSuccessfulSeasons().subscribe(data => {
      this.searched = true;
      this.results = data;
    });
  }

  public handleBudgetFormSubmit(formData: IBudgetFormData) {
    this.service.searchFilmBudgets().subscribe(data => {
      this.searched = true;
      this.results = data;
    });
  }

  public handleRatingsFormSubmit(formData: IRatingsFormData) {
    this.service.searchFilmRatings().subscribe(data => {
      this.searched = true;
      this.results = data;
    });
  }

  public handleBudgetRatingsFormSubmit(formData: IBudgetRatingsFormData) {
    this.service.searchFilmBudgetRatings().subscribe(data => {
      this.searched = true;
      this.results = data;
    });
  }
}
