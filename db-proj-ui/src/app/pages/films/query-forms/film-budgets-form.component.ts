import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICountry } from '../services/country';
import { FilmService } from '../services/film.service';

export interface IBudgetFormData {
  compare: boolean;
  countries: string[];
  range: {
      end: Date;
      start: Date;
  };
}

@Component({
  selector: 'app-film-budgets-form',
  templateUrl: './film-budgets-form.component.html',
})
export class FilmBudgetsFormComponent {
  @Output() onSubmitEvent: EventEmitter<IBudgetFormData> = new EventEmitter<IBudgetFormData>();

  public budgetForm = new FormGroup({
    range: new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    }),
    countries: new FormControl(),
    compare: new FormControl(false)
  });

  public countries: Observable<ICountry[]> = this.service.getCountries();

  get startDateError(): boolean {
    return !!(this.budgetForm.get('range') as FormGroup).controls.start.errors;
  }

  get endDateError(): boolean {
    return !!(this.budgetForm.get('range') as FormGroup).controls.end.errors;
  }

  constructor(private service: FilmService) { }

  public onSubmit() {
    this.onSubmitEvent.emit(this.budgetForm.value);
  }
}
