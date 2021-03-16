import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { IActor } from '../services/actor-model';
import { ActorService } from '../services/actors.service';

@Component({
  selector: 'app-actor-success-form',
  templateUrl: './actor-success-form.component.html',
})
export class ActorSuccessFormComponent implements OnInit {
  @Output() onSubmitEvent: EventEmitter<string> = new EventEmitter<string>();

  public actorSuccessForm = new FormGroup({
    name: new FormControl(),
    range: new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    }),
    metric: new FormControl()
  });

  public filteredOptions: Observable<IActor[]> = (this.actorSuccessForm.get('name')?.valueChanges as Observable<string>).pipe(
    debounceTime(300),
    switchMap((query: string) => {
      if ((query && query.length < 4) || !query) return of([]);
      else return this.actorService.searchActors(query);
    })
  )

  get range(): FormGroup {
    return this.actorSuccessForm.get('range') as FormGroup;
  }

  constructor(private actorService: ActorService) { }

  public ngOnInit() {
    this.actorSuccessForm.valueChanges.subscribe(f => console.log(this.actorSuccessForm.get('range')?.errors, (this.actorSuccessForm.get('range') as FormGroup).controls.start.errors))
    console.log((this.actorSuccessForm.get('range') as FormGroup).get('start'))

   }
  
  public displayFn(actor: IActor): string {
    return actor && actor.name ? actor.name : '';
  }

  public onSubmit() {
    this.onSubmitEvent.emit('form submitted');
  }
}
