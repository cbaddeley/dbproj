import { AfterViewInit, Component, ElementRef, Input, NgZone, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { IFilmBudgets } from '../services/films.model';

@Component({
  selector: 'app-film-budgets-results',
  templateUrl: './film-budgets-results.component.html',
})
export class FilmBudgetsResultsComponent implements OnChanges, AfterViewInit {
  @ViewChild('charRef') charRef!: ElementRef;
  @Input() public data: IFilmBudgets[] = [];
  @Input() public budgetCompareAverage!: boolean;

  private chart!: am4charts.XYChart;
  private countryMap: Map<string, string>;

  constructor(private zone: NgZone) { }

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
    this.countryMap = new Map();
    if (this.chart) this.chart.dispose();
    this.chart = am4core.create(this.charRef?.nativeElement, am4charts.XYChart);

    this.chart.colors.step = 2;

    this.chart.data = this.data.map((f) => {
      this.countryMap.set(f.countryCode, f.countryName);
      return {
        date: new Date(f.year, f.month),
        [`${f.countryCode}budgetSum`]: f.budgetSum,
        [`${f.countryCode}budgetAvg`]: f.budgetAvg
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
    if (this.budgetCompareAverage) {
      this.createMetrixAxis('Average Budget ($)');
      for (let [code, name] of this.countryMap.entries()) {
        this.createSeries(`${code}budgetAvg`, name);
      }
    } else {
      this.createMetrixAxis('Budget ($)');
      for (let [code, name] of this.countryMap.entries()) {
        this.createSeries(`${code}budgetSum`, name);
      }
    }
  }

  private createSeries(field: string, name: string) {
    let series = this.chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    series.dataFields.dateX = 'date';
    series.name = name;
    series.cursorTooltipEnabled = false;
    series.showOnInit = true;
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.tooltipText = '{name}: [bold]{valueY}[/]';
    bullet.circle.stroke = am4core.color('#fff');
    bullet.circle.strokeWidth = 2;
  }
}
