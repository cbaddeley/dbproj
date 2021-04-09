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
import { IActorSuccess } from '../services/actor-model';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'app-actor-success-results',
  templateUrl: './actor-success-results.component.html',
})
export class ActorSuccessResultsComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('charRef') charRef!: ElementRef;
  @Input() public data: IActorSuccess[][] = [[]];
  @Input() public metricToDisplay!: 'ratings' | 'roi' | 'both';

  private chart!: am4charts.XYChart;

  constructor(private zone: NgZone) { }
  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && !changes.data.firstChange) {
      this.zone.runOutsideAngular(() => {
        this.createChart();
        this.createMetricAxesAndSeries();
        this.chart.legend = new am4charts.Legend();
        this.chart.cursor = new am4charts.XYCursor();
      });
    }
  }

  public ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.createChart();
      this.createMetricAxesAndSeries();
      this.chart.legend = new am4charts.Legend();
      this.chart.cursor = new am4charts.XYCursor();
    });
  }

  public ngOnDestroy(): void {
    if (this.chart) this.chart.dispose();
  }

  private createMetricAxesAndSeries() {
    if (this.metricToDisplay == 'both') {
      this.createAxisAndSeries('rating', 'Rating', false, 'Rating');
      this.createAxisAndSeries('roi', 'ROI', true, 'ROI (%)', 'triangle');
    } else if (this.metricToDisplay == 'ratings') {
      this.createAxisAndSeries('rating', 'Rating', false, 'Rating');
    } else {
      this.createAxisAndSeries('roi', 'ROI', false, 'ROI (%)');
    }
  }

  private createChart() {
    if (this.chart) this.chart.dispose();
    this.chart = am4core.create(this.charRef?.nativeElement, am4charts.XYChart);

    this.chart.colors.step = 2;

    this.chart.data = this.data[0].map((f) => {
      return {
        date: f.releaseDate,
        rating: f.avgRating,
        title: f.title,
        roi: f.avgROI,
        actorName: f.actorName
      };
    });

    this.chart.dateFormatter.inputDateFormat = 'i';

    let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;
  }

  private createAxisAndSeries(
    field: string,
    name: string,
    opposite: boolean,
    axisTitle: string,
    bulletType?: string
  ) {
    let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = axisTitle;

    let series = this.chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    series.dataFields.dateX = 'date';
    series.strokeWidth = 2;
    series.yAxis = valueAxis;
    series.name = name;
    series.tooltipText = '[bold]{title}[/] \n {name}: [bold]{valueY}[/]';
    series.tensionX = 0.8;
    series.showOnInit = true;

    let interfaceColors = new am4core.InterfaceColorSet();

    switch (bulletType) {
      case 'triangle':
        let triangleBullet = series.bullets.push(new am4charts.Bullet());
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
        circleBullet.circle.stroke = interfaceColors.getFor('background');
        circleBullet.circle.strokeWidth = 2;
        break;
    }
    valueAxis.renderer.line.strokeOpacity = 1;
    valueAxis.renderer.line.strokeWidth = 2;
    valueAxis.renderer.line.stroke = series.stroke;
    valueAxis.renderer.labels.template.fill = series.stroke;
    valueAxis.renderer.opposite = opposite;
  }
}
