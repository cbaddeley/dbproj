import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const metricValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const roi = control.get('roi');
  const ratings = control.get('ratings');

  const invalid = !(roi?.value as boolean) && !(ratings?.value as boolean);
  return invalid ? { metricRequired: true } : null;
};

export interface ISeasonSuccessFormData {
    roi: boolean;
    ratings: boolean;
    range: {
        end: Date;
        start: Date;
    };
    success: 'most' | 'least';
}

@Component({
  selector: 'app-film-seasons-form',
  templateUrl: './film-seasons-form.component.html',
})
export class FilmSeasonsFormComponent {
  @Output() onSubmitEvent: EventEmitter<ISeasonSuccessFormData> = new EventEmitter<ISeasonSuccessFormData>();

  public seasonSuccessForm = new FormGroup({
    range: new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    }),
    roi: new FormControl(),
    ratings: new FormControl(),
    success: new FormControl('most')
  }, { validators: metricValidator });

  get startDateError(): boolean {
    return !!(this.seasonSuccessForm.get('range') as FormGroup).controls.start.errors;
  }

  get endDateError(): boolean {
    return !!(this.seasonSuccessForm.get('range') as FormGroup).controls.end.errors;
  }

  get metricError(): boolean {
    return !(this.seasonSuccessForm.get('roi')?.value as boolean) && 
    !(this.seasonSuccessForm.get('ratings')?.value as boolean) &&
    ((this.seasonSuccessForm.get('roi')?.touched as boolean) || 
    (this.seasonSuccessForm.get('ratings')?.touched) as boolean)
  }

  public onSubmit() {
    this.onSubmitEvent.emit(this.seasonSuccessForm.value);
  }
}
