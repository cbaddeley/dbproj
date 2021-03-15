import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-film-buget-ratings-form',
  templateUrl: './film-budget-ratings-form.component.html',
})
export class FilmBudgetRatingsFormComponent {
  @Output() onSubmitEvent: EventEmitter<string> = new EventEmitter<string>();

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  public onSubmit() {
    this.onSubmitEvent.emit('form submitted');
  }
}
