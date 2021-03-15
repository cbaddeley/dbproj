import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-film-ratings-form',
  templateUrl: './film-ratings-form.component.html',
})
export class FilmRatingsFormComponent {
  @Output() onSubmitEvent: EventEmitter<string> = new EventEmitter<string>();

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  public onSubmit() {
    this.onSubmitEvent.emit('form submitted');
  }
}
