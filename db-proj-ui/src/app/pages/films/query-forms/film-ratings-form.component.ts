import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FilmService } from '../services/film.service';
import { IGenre } from '../services/genre';

export interface IRatingsFormData {
  genreIds: number[];
  range: {
      end: Date;
      start: Date;
  };
}

@Component({
  selector: 'app-film-ratings-form',
  templateUrl: './film-ratings-form.component.html',
})
export class FilmRatingsFormComponent {
  @Output() onSubmitEvent: EventEmitter<IRatingsFormData> = new EventEmitter<IRatingsFormData>();

  get startDateError(): boolean {
    return !!(this.ratingsForm.get('range') as FormGroup).controls.start.errors;
  }

  get endDateError(): boolean {
    return !!(this.ratingsForm.get('range') as FormGroup).controls.end.errors;
  }

  constructor(private service: FilmService) { }

  public genres: Observable<IGenre[]> = this.service.getGenres();

  public ratingsForm = new FormGroup({
    range: new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    }),
    genreIds: new FormControl()
  });

  public onSubmit() {
    this.onSubmitEvent.emit(this.ratingsForm.value);
  }
}
