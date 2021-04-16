import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const yearRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const startYear = control.get('startYear');
  const endYear = control.get('endYear');

  const invalid = (startYear.value < 1850 || startYear.value > 2021) || 
                  (endYear.value < 1850 || endYear.value > 2021) ||
                  startYear.value >= endYear.value;
  return invalid ? { invalidYears: true } : null;
};
export interface IBudgetRatingsFormData {
  ratings: string[];
  startYear: number;
  endYear: number;
}

@Component({
  selector: 'app-film-buget-ratings-form',
  templateUrl: './film-budget-ratings-form.component.html',
})
export class FilmBudgetRatingsFormComponent {
  @Output() onSubmitEvent: EventEmitter<IBudgetRatingsFormData> = new EventEmitter<IBudgetRatingsFormData>();

  public budgetRatingsForm = new FormGroup({
    startYear: new FormControl(),
    endYear: new FormControl(),
    ratings: new FormControl()
  }, { validators: yearRangeValidator });

  get startYearError(): boolean {
    return ((this.budgetRatingsForm.get('startYear') as FormControl).value < 1850 || (this.budgetRatingsForm.get('startYear') as FormControl).value > 2021) && (this.budgetRatingsForm.get('startYear') as FormControl).touched;
  }

  get endYearError(): boolean {
    return (this.budgetRatingsForm.get('endYear') as FormControl).value < 1850 || (this.budgetRatingsForm.get('endYear') as FormControl).value > 2021 && (this.budgetRatingsForm.get('endYear') as FormControl).touched;
  }

  get yearsError(): boolean {
    return (this.budgetRatingsForm.get('endYear') as FormControl).value <= (this.budgetRatingsForm.get('endYear') as FormControl).value && (this.budgetRatingsForm.get('startYear') as FormControl).touched && (this.budgetRatingsForm.get('endYear') as FormControl).touched;
  }

  public onSubmit() {
    this.onSubmitEvent.emit(this.budgetRatingsForm.value);
  }
}
