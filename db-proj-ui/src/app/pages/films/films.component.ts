import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  public results: ISuccessfulSeason[] | IFilmRatings[] | IFilmBudgetRatings[] | IFilmBudgets[] = [];
  public seasonsMetricToDisplay!: 'ratings' | 'roi';
  public budgetCompareAverage!: boolean;

  constructor(
    private route: ActivatedRoute,
    private service: FilmService
  ) { }

  public handleSuccessFormSubmit(formData: ISeasonSuccessFormData) {
    let quartile: 'top_roi' | 'bottom_roi' | 'top_rating' | 'bottom_rating';
    if (formData.metric == 'roi') {
      quartile = formData.success;
    } else {
      if (formData.success == 'top_roi') {
        quartile = 'top_rating';
      } else {
        quartile = 'bottom_rating';
      }
    }
    this.service.searchSuccessfulSeasons(quartile, new Date(formData.startYear,0,1), new Date(formData.endYear,11,31)).subscribe(data => {
      this.searched = true;
      this.results = data;
      if (formData.metric == 'roi') {
        this.seasonsMetricToDisplay = 'roi';
      } else this.seasonsMetricToDisplay = 'ratings';
    });
  }

  public handleBudgetFormSubmit(formData: IBudgetFormData) {
    this.service.searchFilmBudgets(formData.countries, new Date(formData.startYear,0,1), new Date(formData.endYear,11,31)).subscribe(data => {
      this.searched = true;
      this.results = data;
      this.budgetCompareAverage = formData.compare;
    });
  }

  public handleRatingsFormSubmit(formData: IRatingsFormData) {
    this.service.searchFilmRatings(formData.genreIds, formData.start, formData.end).subscribe(data => {
      this.searched = true;
      this.results = data;
    });
  }

  public handleBudgetRatingsFormSubmit(formData: IBudgetRatingsFormData) {
    this.service.searchFilmBudgetRatings(formData.ratings, new Date(formData.startYear,0,1), new Date(formData.endYear,11,31)).subscribe(data => {
      this.searched = true;
      this.results = data;
    });
  }
}
