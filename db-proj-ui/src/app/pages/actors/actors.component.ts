import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { ISuccessFormValue } from './query-forms/success-form.interface';
import { IActorSuccess } from './services/actor-model';
import { ActorService } from './services/actors.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent implements OnInit, OnDestroy {
  private destroyed: Subject<void> = new Subject();

  public fetching: Observable<boolean> = this.actorService.fetching;
  public activeQuery: Observable<string> = this.route.queryParams.pipe(
    map((q) => q.query),
    shareReplay()
  );

  public actorSuccessData: IActorSuccess[] = [];
  public searched = false;

  constructor(
    private route: ActivatedRoute,
    private actorService: ActorService
  ) { }

  public ngOnInit(): void {

  }

  public ngOnDestroy(): void {
    this.destroyed.next();
  }

  public handleSuccessFormSubmit(formData: ISuccessFormValue) {
    this.actorService.searchActorSuccess(formData.name.name, formData.range.start, formData.range.end).subscribe(data => {
      this.searched = true;
      this.actorSuccessData = data;
    });
  }
}
