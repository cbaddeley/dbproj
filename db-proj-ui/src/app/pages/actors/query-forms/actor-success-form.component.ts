import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { IActor } from '../services/actor-model';
import { ActorService } from '../services/actors.service';
import { ISuccessFormValue } from './success-form.interface';

export const metricValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const dollars = control.get('dollars');
  const ratings = control.get('ratings');

  const invalid = !(dollars?.value as boolean) && !(ratings?.value as boolean);
  return invalid ? { metricRequired: true } : null;
};

@Component({
  selector: 'app-actor-success-form',
  templateUrl: './actor-success-form.component.html',
})
export class ActorSuccessFormComponent {
  @Output() onSubmitEvent: EventEmitter<ISuccessFormValue> = new EventEmitter<ISuccessFormValue>();

  public actorSuccessForm = new FormGroup({
    name: new FormControl(),
    range: new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    }),
    dollars: new FormControl(),
    ratings: new FormControl(),
  }, { validators: metricValidator });

  public filteredOptions: Observable<IActor[]> = (this.actorSuccessForm.get('name')?.valueChanges as Observable<string>).pipe(
    debounceTime(300),
    switchMap((query: string) => {
      if ((query && query.length < 4) || !query) return of([]);
      else return this.actorService.searchActors(query);
    })
  )

  get startDateError(): boolean {
    return !!(this.actorSuccessForm.get('range') as FormGroup).controls.start.errors;
  }

  get endDateError(): boolean {
    return !!(this.actorSuccessForm.get('range') as FormGroup).controls.end.errors;
  }

  get metricError(): boolean {
    return !(this.actorSuccessForm.get('dollars')?.value as boolean) && 
    !(this.actorSuccessForm.get('ratings')?.value as boolean) &&
    ((this.actorSuccessForm.get('dollars')?.touched as boolean) || 
    (this.actorSuccessForm.get('ratings')?.touched) as boolean)
  }

  constructor(private actorService: ActorService) { }
  
  public displayFn(actor: IActor): string {
    return actor && actor.name ? actor.name : '';
  }

  public onSubmit() {
    this.onSubmitEvent.emit(this.actorSuccessForm.value as ISuccessFormValue);
  }
}
