import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';



@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmsComponent {
  public activeQuery: Observable<string> = this.route.queryParams.pipe(
    map((q) => q.query),
    shareReplay()
  );
  
  constructor(
    private route: ActivatedRoute,
  ) { }

  public handleSuccessFormSubmit(v: string) {
    console.log(v)
  }
}
