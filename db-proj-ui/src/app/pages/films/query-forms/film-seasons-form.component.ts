import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-film-seasons-form',
  templateUrl: './film-seasons-form.component.html',
})
export class FilmSeasonsFormComponent {
  @Output() onSubmitEvent: EventEmitter<string> = new EventEmitter<string>();

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  public onSubmit() {
    this.onSubmitEvent.emit('form submitted');
  }
}
