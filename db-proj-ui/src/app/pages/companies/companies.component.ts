import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ICompanySuccessFormValue } from './query-forms/company-form.interface';
import { ICompanySuccess } from './services/company-model';
import { CompaniesService } from './services/companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnDestroy {
  public fetching: Observable<boolean> = this.actorService.fetching;
  public activeQuery: Observable<string> = this.route.queryParams.pipe(
    map((q) => q.query),
    shareReplay()
  );

  public companySuccessData: ICompanySuccess[] = [];
  public searched = false;
  public metricToDisplay!: string;

  constructor(
    private route: ActivatedRoute,
    private actorService: CompaniesService
  ) { }

  public ngOnDestroy(): void {
    this.companySuccessData = [];
  }

  public handleSuccessFormSubmit(formData: ICompanySuccessFormValue[]) {
    const requests: Observable<ICompanySuccess[]>[] = formData.map((data) => {
      return this.actorService.searchCompanySuccess(data.name, data.start, data.end)
    });
    forkJoin(requests).pipe(
      map((data) => {
        let returnedData: ICompanySuccess[] = [];
        for (let i = 0; i < data.length; i++) {
          returnedData = returnedData.concat(data[i].map(d => {
            return {
              ...d,
              releaseDate: new Date(d.releaseDate)
            }
          }));
        }
        returnedData = returnedData.sort((a, b) => (a.releaseDate as any) - (b.releaseDate as any))
        returnedData = returnedData.map(d => {
          const date = new Date(d.releaseDate);
          const isoDate = date.toISOString();
          return {
            ...d,
            releaseDate: isoDate
          }
        })
        return returnedData;
      })
    ).subscribe(data => {
      this.searched = true;
      this.metricToDisplay = formData[0].metric;
      this.companySuccessData = data;
    })
  }
}
