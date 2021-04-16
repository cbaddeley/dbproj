import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { ISuccessfulSeason, Season } from '../services/films.model';

@Component({
  selector: 'app-film-seasons-results',
  templateUrl: './film-seasons-results.component.html',
})
export class FilmSeasonsResultsComponent implements OnChanges, AfterViewInit {
  @ViewChild('charRef') charRef!: ElementRef;
  @Input() public data: ISuccessfulSeason[] = [];
  @Input() public metricToDisplay!: 'ratings' | 'roi' | 'both';

  private chart!: am4charts.XYChart;

  constructor(private zone: NgZone) {}

  public ngOnChanges(changes: SimpleChanges): void {
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
    if (this.chart) this.chart.dispose();
    this.chart = am4core.create(this.charRef?.nativeElement, am4charts.XYChart);

    this.chart.colors.step = 2;

    this.chart.data = this.data.map((f) => {
      return {
        year: new Date(f.year, 0, 1),
        winterRating: f.season == Season.Winter ? f.avgRating : undefined,
        winterRoi: f.season == Season.Winter ? f.avgROI : undefined,
        springRating: f.season == Season.Spring ? f.avgRating : undefined,
        springRoi: f.season == Season.Spring ? f.avgROI : undefined,
        summerRating: f.season == Season.Summer ? f.avgRating : undefined,
        summerRoi: f.season == Season.Summer ? f.avgROI : undefined,
        fallRating: f.season == Season.Fall ? f.avgRating : undefined,
        fallRoi: f.season == Season.Fall ? f.avgROI : undefined,
      };
    });

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
    if (this.metricToDisplay == 'ratings') {
      this.createMetrixAxis('Rating');
      this.createSeries('winterRating', 'Winter');
      this.createSeries('springRating', 'Spring');
      this.createSeries('summerRating', 'Summer');
      this.createSeries('fallRating', 'Fall');
    } else {
      this.createMetrixAxis('ROI (%)');
      this.createSeries('winterRoi', 'Winter');
      this.createSeries('springRoi', 'Spring');
      this.createSeries('summerRoi', 'Summer');
      this.createSeries('fallRoi', 'Fall');
    }
  }

  private createSeries(field: string, name: string) {
    let series = this.chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    series.dataFields.dateX = 'year';
    series.name = name;
    series.cursorTooltipEnabled = false;
    series.showOnInit = true;
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.tooltipText = '{name}: [bold]{valueY}[/]';
    bullet.circle.stroke = am4core.color('#fff');
    bullet.circle.strokeWidth = 2;
  }
}
