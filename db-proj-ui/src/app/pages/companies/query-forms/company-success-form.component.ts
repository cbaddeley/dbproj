import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
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
import { CompaniesService } from '../services/companies.service';
import { ICompanySuccessFormValue } from './company-form.interface';

export const namesValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let valid = false;
  (control as FormArray).value.forEach((v: string) => {
    if (v && v.length > 0) {
      valid = true;
    }
  });
  return valid ? null : { error: 'At least one company is required' };
};

@Component({
  selector: 'app-company-success-form',
  templateUrl: './company-success-form.component.html',
})
export class CompaniesSuccessFormComponent implements OnInit {
  @Output()
  onSubmitEvent: EventEmitter<ICompanySuccessFormValue[]> = new EventEmitter<
    ICompanySuccessFormValue[]
  >();

  public suggestions: string[][] = [[]];

  public companySuccessForm = new FormGroup(
    {
      names: new FormArray([new FormControl('')], namesValidator),
      metric: new FormControl()
    }
  );

  public range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  get names(): FormArray {
    return this.companySuccessForm.get('names') as FormArray;
  }

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

  constructor(private companyService: CompaniesService) {}

  public ngOnInit(): void {
    ((this.companySuccessForm.get('names') as FormArray)
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
          return this.companyService.searchCompanies(query.value).pipe(
            map((resp) => {
              return {
                suggestions: resp.map((r) => r.name),
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

  public displayFn(company: string): string {
    return company ? company : '';
  }

  public onSubmit() {
    const formValues: ICompanySuccessFormValue[] = ((this.companySuccessForm.get(
      'names'
    ) as FormArray).value as string[])
      .map((name) => {
        return {
          ...this.range.value,
          name,
          metric: this.companySuccessForm.value.metric
        };
      })
      .filter((data) => data?.name.length > 0);
    this.onSubmitEvent.emit(formValues);
  }

  public addCompany() {
    (this.companySuccessForm.get('names') as FormArray).push(
      new FormControl('')
    );
  }
}
