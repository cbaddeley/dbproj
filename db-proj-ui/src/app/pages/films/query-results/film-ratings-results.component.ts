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

  private chart!: am4charts.XYChart;
  private genres: Set<string>;

  constructor(private zone: NgZone) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && !changes.data.firstChange) {
      this.zone.runOutsideAngular(() => {
        this.createChart();
        this.createMetricAxisAndSeries();
        this.chart.legend = new am4charts.Legend();
        this.chart.cursor = new am4charts.XYCursor();
      });
    }
  }

  public ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.createChart();
      this.createMetricAxisAndSeries();
      this.chart.legend = new am4charts.Legend();
      this.chart.cursor = new am4charts.XYCursor();
    });
  }

  private createChart() {
    this.genres = new Set();
    if (this.chart) this.chart.dispose();
    this.chart = am4core.create(this.charRef?.nativeElement, am4charts.XYChart);

    this.chart.colors.step = 2;
    console.log(this.data)
    this.chart.data = this.data.map((f) => {
      this.genres.add(f.genre);
      return {
        date: f.releaseDate,
        [`${f.genre}`]: f.avgRating
      };
    });
    this.chart.dateFormatter.inputDateFormat = 'i';
    let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.skipEmptyPeriods = true;
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.renderer.grid.template.location = 0;
  }

  private createMetrixAxis(axisTitle: string) {
    let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.line.strokeOpacity = 1;
    valueAxis.renderer.line.strokeWidth = 2;
    valueAxis.title.text = axisTitle;
  }

  private createMetricAxisAndSeries() {

      this.createMetrixAxis('Average Rating');
      for (let genre of this.genres.keys()) {
        this.createSeries(`${genre}`);
      }
  }

  private createSeries(field: string) {
    let series = this.chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    series.dataFields.dateX = 'date';
    series.name = field;
    series.cursorTooltipEnabled = false;
    series.showOnInit = true;
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.tooltipText = '{name}: [bold]{valueY}[/]';
    bullet.circle.stroke = am4core.color('#fff');
    bullet.circle.strokeWidth = 2;
  }
}
