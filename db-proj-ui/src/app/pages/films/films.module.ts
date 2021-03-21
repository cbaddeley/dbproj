import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilmsComponent } from './films.component';

import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FilmBudgetRatingsFormComponent } from './query-forms/film-budget-ratings-form.component';
import { FilmBudgetsFormComponent } from './query-forms/film-budgets-form.component';
import { FilmRatingsFormComponent } from './query-forms/film-ratings-form.component';
import { FilmSeasonsFormComponent } from './query-forms/film-seasons-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilmBudgetRatingsResultsComponent } from './query-results/film-budget-ratings-results.component';
import { FilmBudgetsResultsComponent } from './query-results/film-budgets-results.component';
import { FilmRatingsResultsComponent } from './query-results/film-ratings-results.component';
import { FilmSeasonsResultsComponent } from './query-results/film-seasons-results.component';
import { FilmService } from './services/film.service';
import { FilmDataService } from './services/film-data.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Route[] = [
  {
    path: '',
    component: FilmsComponent,
  },
];

export const FilmsUIRoutesModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    FilmsComponent,
    FilmBudgetRatingsFormComponent,
    FilmBudgetsFormComponent,
    FilmRatingsFormComponent,
    FilmSeasonsFormComponent,
    FilmBudgetRatingsResultsComponent,
    FilmBudgetsResultsComponent,
    FilmRatingsResultsComponent,
    FilmSeasonsResultsComponent
  ],
  imports: [
    CommonModule,
    FilmsUIRoutesModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [FilmService, FilmDataService]
})
export class FilmsModule {}
