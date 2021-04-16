import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICountry } from '../services/country';
import { FilmService } from '../services/film.service';


export const yearRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const startYear = control.get('startYear');
  const endYear = control.get('endYear');

  const invalid = (startYear.value < 1850 || startYear.value > 2021) || 
                  (endYear.value < 1850 || endYear.value > 2021) ||
                  startYear.value >= endYear.value;
  return invalid ? { invalidYears: true } : null;
};

export interface IBudgetFormData {
  compare: boolean;
  countries: string[];
  startYear: number;
  endYear: number;
}

@Component({
  selector: 'app-film-budgets-form',
  templateUrl: './film-budgets-form.component.html',
})
export class FilmBudgetsFormComponent {
  @Output() onSubmitEvent: EventEmitter<IBudgetFormData> = new EventEmitter<IBudgetFormData>();

  public budgetForm = new FormGroup({
    startYear: new FormControl(),
    endYear: new FormControl(),
    countries: new FormControl(),
    compare: new FormControl(false)
  }, { validators: yearRangeValidator });

  public countries: Observable<ICountry[]> = this.service.getCountries();

  get startYearError(): boolean {
    return ((this.budgetForm.get('startYear') as FormControl).value < 1850 || (this.budgetForm.get('startYear') as FormControl).value > 2021) && (this.budgetForm.get('startYear') as FormControl).touched;
  }

  get endYearError(): boolean {
    return (this.budgetForm.get('endYear') as FormControl).value < 1850 || (this.budgetForm.get('endYear') as FormControl).value > 2021 && (this.budgetForm.get('endYear') as FormControl).touched;
  }

  get yearsError(): boolean {
    return (this.budgetForm.get('endYear') as FormControl).value <= (this.budgetForm.get('endYear') as FormControl).value && (this.budgetForm.get('startYear') as FormControl).touched && (this.budgetForm.get('endYear') as FormControl).touched;
  }

  constructor(private service: FilmService) { }

  public onSubmit() {
    this.onSubmitEvent.emit(this.budgetForm.value);
  }
}
