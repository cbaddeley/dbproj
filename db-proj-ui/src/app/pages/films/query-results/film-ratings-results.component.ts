import { Component, ElementRef, Input, NgZone, SimpleChanges, ViewChild } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { IFilmRatings } from '../services/films.model';

@Component({
  selector: 'app-film-ratings-results',
  templateUrl: './film-ratings-results.component.html',
})
export class FilmRatingsResultsComponent {
  @ViewChild('charRef') charRef!: ElementRef;
  @Input() public data: IFilmRatings[] = [];

  private chart!: am4charts.Chart;

  constructor(private zone: NgZone) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && !changes.data.firstChange) {
      this.zone.runOutsideAngular(() => {
        this.createChart();
      });
    }
  }

  public ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.createChart();
    });
  }

  private createChart() {
    
  }
}
