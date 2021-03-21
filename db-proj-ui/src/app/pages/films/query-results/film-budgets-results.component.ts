import { Component, ElementRef, Input, NgZone, SimpleChanges, ViewChild } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { IFilmBudgets } from '../services/films.model';

@Component({
  selector: 'app-film-budgets-results',
  templateUrl: './film-budgets-results.component.html',
})
export class FilmBudgetsResultsComponent {
  @ViewChild('charRef') charRef!: ElementRef;
  @Input() public data: IFilmBudgets[] = [];

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
