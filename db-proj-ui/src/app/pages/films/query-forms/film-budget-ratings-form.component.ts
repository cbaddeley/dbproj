import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


export interface IBudgetRatingsFormData {
  ratings: string[];
  range: {
      end: Date;
      start: Date;
  };
}

@Component({
  selector: 'app-film-buget-ratings-form',
  templateUrl: './film-budget-ratings-form.component.html',
})
export class FilmBudgetRatingsFormComponent {
  @Output() onSubmitEvent: EventEmitter<IBudgetRatingsFormData> = new EventEmitter<IBudgetRatingsFormData>();

  public budgetRatingsForm = new FormGroup({
    range: new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    }),
    ratings: new FormControl()
  });

  get startDateError(): boolean {
    return !!(this.budgetRatingsForm.get('range') as FormGroup).controls.start.errors;
  }

  get endDateError(): boolean {
    return !!(this.budgetRatingsForm.get('range') as FormGroup).controls.end.errors;
  }

  public onSubmit() {
    this.onSubmitEvent.emit(this.budgetRatingsForm.value);
  }
}
