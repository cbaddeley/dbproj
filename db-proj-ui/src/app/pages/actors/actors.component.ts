import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ISuccessFormValue } from './query-forms/success-form.interface';
import { IActorSuccess } from './services/actor-model';
import { ActorService } from './services/actors.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent implements OnDestroy {
  public fetching: Observable<boolean> = this.actorService.fetching;
  public activeQuery: Observable<string> = this.route.queryParams.pipe(
    map((q) => q.query),
    shareReplay()
  );

  public actorSuccessData: IActorSuccess[][] = [[]];
  public searched = false;
  public metricToDisplay!: 'ratings' | 'roi' | 'both';

  constructor(
    private route: ActivatedRoute,
    private actorService: ActorService
  ) { }

  public ngOnDestroy(): void {
    this.actorSuccessData = [[]];
  }

  public handleSuccessFormSubmit(formData: ISuccessFormValue[]) {
    const requests: Observable<IActorSuccess[]>[] = formData.map((data) => {
      return this.actorService.searchActorSuccess(data.name, data.start, data.end)
    });
    forkJoin(requests).pipe(
    ).subscribe(data => {
      this.searched = true;
      this.actorSuccessData = data;
      if (formData[0].dollars && formData[0].ratings) {
        this.metricToDisplay = 'both';
      } else if (formData[0].dollars) {
        this.metricToDisplay = 'roi';
      } else this.metricToDisplay = 'ratings';
    })
  }
}
