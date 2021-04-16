import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FilmService } from '../services/film.service';
import { IGenre } from '../services/genre';

export interface IRatingsFormData {
  genreIds: number[];
  end: Date;
  start: Date;
}

@Component({
  selector: 'app-film-ratings-form',
  templateUrl: './film-ratings-form.component.html',
})
export class FilmRatingsFormComponent {
  @Output()
  onSubmitEvent: EventEmitter<IRatingsFormData> = new EventEmitter<IRatingsFormData>();

  constructor(private service: FilmService) {}

  public genres: Observable<IGenre[]> = this.service.getGenres();

  public ratingsForm = new FormGroup({
    genreIds: new FormControl(),
  });

  public range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  get startDateError(): boolean {
    return (
      !!(this.range as FormGroup).controls.start.errors && this.range.touched
    );
  }

  get endDateError(): boolean {
    return (
      !!(this.range as FormGroup).controls.end.errors && this.range.touched
    );
  }

  public onSubmit() {
    this.onSubmitEvent.emit({
      ...this.ratingsForm.value,
      ...this.range.value,
    });
  }
}
