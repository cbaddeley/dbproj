import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
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

  public data: any;
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

  public handleSuccessFormSubmit(v: string) {
    this.actorService.searchActorSuccess().subscribe(data => {
      console.log(data);
      this.searched = true;
      this.data = data;
    });
  }
}
