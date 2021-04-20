import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ICompanySuccess } from '../services/company-model';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'app-company-success-results',
  templateUrl: './company-success-results.component.html',
})
export class CompaniesSuccessResultsComponent
  implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('charRef') charRef!: ElementRef;
  @Input() public data: ICompanySuccess[] = [];
  @Input() public metricToDisplay!: string;

  private chart!: am4charts.XYChart;
  private companySet: Set<string>;

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

  public ngOnDestroy(): void {
    if (this.chart) this.chart.dispose();
  }

  private createMetricAxis(axisTitle: string) {
    let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.line.strokeOpacity = 1;
    valueAxis.renderer.line.strokeWidth = 2;
    valueAxis.title.text = axisTitle;
    return valueAxis;
  }

  private createMetricAxisAndSeries() {
    if (this.metricToDisplay == 'ratings') {
      let ratingAxis = this.createMetricAxis('Rating');
      for (let name of this.companySet.keys()) {
        this.createSeries(
          `${name.replace(/\s/g, '')}Rating`,
          `${name}`,
          ratingAxis,
          `${name.replace(/\s/g, '')}`
        );
      }
    }

    if (this.metricToDisplay == 'roi') {
      let roiAxis = this.createMetricAxis('ROI (%)');
      for (let name of this.companySet.keys()) {
        this.createSeries(
          `${name.replace(/\s/g, '')}Roi`,
          `${name}`,
          roiAxis,
          `${name.replace(/\s/g, '')}`
        );
      }
    }

    if (this.metricToDisplay == 'budget') {
      let budgetAxis = this.createMetricAxis('Budget');
      for (let name of this.companySet.keys()) {
        this.createSeries(
          `${name.replace(/\s/g, '')}Budget`,
          `${name}`,
          budgetAxis,
          `${name.replace(/\s/g, '')}`
        );
      }
    }

    if (this.metricToDisplay == 'revenue') {
      let revAxis = this.createMetricAxis('Revenue');
      for (let name of this.companySet.keys()) {
        this.createSeries(
          `${name.replace(/\s/g, '')}Revenue`,
          `${name}`,
          revAxis,
          `${name.replace(/\s/g, '')}`
        );
      }
    }
  }

  private createChart() {
    this.companySet = new Set();
    if (this.chart) this.chart.dispose();
    this.chart = am4core.create(this.charRef?.nativeElement, am4charts.XYChart);
    this.chart.colors.step = 5;

    this.chart.data = this.data.map((f) => {
        this.companySet.add(f.companyName);
        return {
          date: f.releaseDate,
          [`${f.companyName.replace(/\s/g, '')}Rating`]: f.avgRating,
          [`${f.companyName.replace(/\s/g, '')}Title`]: f.title,
          [`${f.companyName.replace(/\s/g, '')}Roi`]: f.roi,
          [`${f.companyName.replace(/\s/g, '')}Budget`]: f.budget,
          [`${f.companyName.replace(/\s/g, '')}Revenue`]: f.revenue,
        };
    });
    this.chart.dateFormatter.inputDateFormat = 'i';
    let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.skipEmptyPeriods = true;
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.renderer.grid.template.location = 0;
  }

  private createSeries(
    field: string,
    name: string,
    axis: any,
    movieTitleKey: string,
    bulletType?: string
  ) {
    let series = this.chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    series.dataFields.dateX = 'date';
    series.strokeWidth = 2;
    series.name = name;
    series.yAxis = axis;
    series.cursorTooltipEnabled = false;
    series.showOnInit = true;

    let interfaceColors = new am4core.InterfaceColorSet();

    switch (bulletType) {
      case 'triangle':
        let triangleBullet = series.bullets.push(new am4charts.Bullet());
        triangleBullet.tooltipText = `{${movieTitleKey}Title}: [bold]{valueY}[/]`;
        triangleBullet.width = 12;
        triangleBullet.height = 12;
        triangleBullet.horizontalCenter = 'middle';
        triangleBullet.verticalCenter = 'middle';

        let triangle = triangleBullet.createChild(am4core.Triangle);
        triangle.stroke = interfaceColors.getFor('background');
        triangle.strokeWidth = 2;
        triangle.direction = 'top';
        triangle.width = 12;
        triangle.height = 12;
        break;
      case 'rectangle':
        let bullet = series.bullets.push(new am4charts.Bullet());
        bullet.tooltipText = `{${movieTitleKey}Title}: [bold]{valueY}[/]`;
        bullet.width = 10;
        bullet.height = 10;
        bullet.horizontalCenter = 'middle';
        bullet.verticalCenter = 'middle';

        let rectangle = bullet.createChild(am4core.Rectangle);
        rectangle.stroke = interfaceColors.getFor('background');
        rectangle.strokeWidth = 2;
        rectangle.width = 10;
        rectangle.height = 10;
        break;
      default:
        let circleBullet = series.bullets.push(new am4charts.CircleBullet());
        circleBullet.tooltipText = `{${movieTitleKey}Title}: [bold]{valueY}[/]`;
        circleBullet.circle.stroke = interfaceColors.getFor('background');
        circleBullet.circle.strokeWidth = 2;
        break;
    }
  }
}
