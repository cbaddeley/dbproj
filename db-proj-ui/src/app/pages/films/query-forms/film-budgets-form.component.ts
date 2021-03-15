import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-film-budgets-form',
  templateUrl: './film-budgets-form.component.html',
})
export class FilmBudgetsFormComponent {
  @Output() onSubmitEvent: EventEmitter<string> = new EventEmitter<string>();

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  public onSubmit() {
    this.onSubmitEvent.emit('form submitted');
  }
}
