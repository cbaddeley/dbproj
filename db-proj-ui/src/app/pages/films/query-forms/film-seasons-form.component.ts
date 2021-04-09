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

export interface ISeasonSuccessFormData {
    startYear: number;
    endYear: number;
    metric: 'roi' | 'ratings';
    success: 'top_roi' | 'bottom_roi';
}

@Component({
  selector: 'app-film-seasons-form',
  templateUrl: './film-seasons-form.component.html',
})
export class FilmSeasonsFormComponent {
  @Output() onSubmitEvent: EventEmitter<ISeasonSuccessFormData> = new EventEmitter<ISeasonSuccessFormData>();

  public seasonSuccessForm = new FormGroup({
    startYear: new FormControl(),
    endYear: new FormControl(),
    metric: new FormControl('roi'),
    success: new FormControl('top_roi')
  }, { validators: yearRangeValidator });

  get startYearError(): boolean {
    return ((this.seasonSuccessForm.get('startYear') as FormControl).value < 1850 || (this.seasonSuccessForm.get('startYear') as FormControl).value > 2021) && (this.seasonSuccessForm.get('startYear') as FormControl).touched;
  }

  get endYearError(): boolean {
    return (this.seasonSuccessForm.get('endYear') as FormControl).value < 1850 || (this.seasonSuccessForm.get('endYear') as FormControl).value > 2021 && (this.seasonSuccessForm.get('endYear') as FormControl).touched;
  }

  get yearsError(): boolean {
    return (this.seasonSuccessForm.get('endYear') as FormControl).value <= (this.seasonSuccessForm.get('endYear') as FormControl).value && (this.seasonSuccessForm.get('startYear') as FormControl).touched && (this.seasonSuccessForm.get('endYear') as FormControl).touched;
  }

  public onSubmit() {
    this.onSubmitEvent.emit(this.seasonSuccessForm.value);
  }
}
