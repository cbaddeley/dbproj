import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { Observable } from 'rxjs';
import {
  debounceTime,
  filter,
  map,
  pairwise,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { ActorService } from '../services/actors.service';
import { ISuccessFormValue } from './success-form.interface';

export const metricValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const dollars = control.get('dollars');
  const ratings = control.get('ratings');

  const invalid = !(dollars?.value as boolean) && !(ratings?.value as boolean);
  return invalid ? { metricRequired: true } : null;
};

export const namesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  let valid = false;
  (control as FormArray).value.forEach((v: string) => {
    if (v && v.length > 0) {
      valid = true;
    }
  });
  return valid ? null : { error: "At least one name is required" };
}

@Component({
  selector: 'app-actor-success-form',
  templateUrl: './actor-success-form.component.html',
})
export class ActorSuccessFormComponent implements OnInit {
  @Output()
  onSubmitEvent: EventEmitter<ISuccessFormValue[]> = new EventEmitter<ISuccessFormValue[]>();

  public suggestions: string[][] = [[]];

  public actorSuccessForm = new FormGroup(
    {
      names: new FormArray([new FormControl('')], namesValidator),
      dollars: new FormControl(),
      ratings: new FormControl(),
    },
    { validators: metricValidator }
  );

  public range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  get names(): FormArray {
    return this.actorSuccessForm.get('names') as FormArray;
  }

  get startDateError(): boolean {
    return !!(this.range as FormGroup).controls.start
      .errors && this.range.touched;
  }

  get endDateError(): boolean {
    return !!(this.range as FormGroup).controls.end
      .errors && this.range.touched;
  }

  get metricError(): boolean {
    return (
      !(this.actorSuccessForm.get('dollars')?.value as boolean) &&
      !(this.actorSuccessForm.get('ratings')?.value as boolean) &&
      ((this.actorSuccessForm.get('dollars')?.touched as boolean) ||
        (this.actorSuccessForm.get('ratings')?.touched as boolean))
    );
  }

  constructor(private actorService: ActorService) {}

  public ngOnInit(): void {
    ((this.actorSuccessForm.get('names') as FormArray)
      .valueChanges as Observable<string[]>)
      .pipe(
        startWith(['']),
        debounceTime(300),
        pairwise(),
        map(([prev, curr]) => {
          let index;
          const diff = curr.find((v, i) => {
            if (v != prev[i]) {
              index = i;
              return true;
            } else {
              return false;
            }
          });
          return {
            index: index,
            value: diff,
          };
        }),
        filter((diff) => diff.value.length > 3),
        switchMap((query) => {
          return this.actorService.searchActors(query.value).pipe(
            map((resp) => {
              return {
                suggestions: resp.map(r => r.name),
                index: query.index,
              };
            })
          );
        })
      )
      .subscribe((v) => {
        this.suggestions[v.index as number] = v.suggestions;
      });
  }

  public displayFn(actor: string): string {
    return actor ? actor : '';
  }

  public onSubmit() {
    const formValues: ISuccessFormValue[] =((this.actorSuccessForm.get('names') as FormArray).value as string[]).map((name) => {
        return {
          ...this.range.value,
          name,
          dollars: this.actorSuccessForm.value.dollars,
          ratings: this.actorSuccessForm.value.ratings,
        }
    }).filter((data) => data?.name.length > 0)
    this.onSubmitEvent.emit(formValues);
  }

  public addActor() {
    (this.actorSuccessForm.get('names') as FormArray).push(new FormControl(''));
  }
}
