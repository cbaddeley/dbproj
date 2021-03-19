import { AfterViewInit, Component, ElementRef, Input, NgZone, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IActorSuccess } from '../services/actor-model';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
  selector: 'app-actor-success-results',
  templateUrl: './actor-success-results.component.html'
})
export class ActorSuccessResultsComponent implements AfterViewInit, OnChanges {
  @ViewChild('charRef') charRef!: ElementRef;
  @Input() public data: IActorSuccess[] = [];

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
      const chart = am4core.create(this.charRef?.nativeElement, am4charts.XYChart);
      chart.data = this.data.map((f) => { 
        return {
          date: f.date, rating: f.rating
        }
      });

      chart.dateFormatter.inputDateFormat = 'i';

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = 'rating';
      series.dataFields.dateX = 'date';
      series.tooltipText = "{rating}"
      series.strokeWidth = 2;
      series.minBulletDistance = 15;

      // Make bullets grow on hover
     // Drop-shaped tooltips
// series.tooltip.background.cornerRadius = 20;
// series.tooltip.background.strokeOpacity = 0;
// series.tooltip.pointerOrientation = "vertical";
// series.tooltip.label.minWidth = 40;
// series.tooltip.label.minHeight = 40;
// series.tooltip.label.textAlign = "middle";
// series.tooltip.label.textValign = "middle";

// // Make bullets grow on hover
// let bullet = series.bullets.push(new am4charts.CircleBullet());
// bullet.circle.strokeWidth = 2;
// bullet.circle.radius = 4;
// bullet.circle.fill = am4core.color("#fff");

// let bullethover = bullet.states.create("hover");
// bullethover.properties.scale = 1.3;

// // Make a panning cursor
// chart.cursor = new am4charts.XYCursor();
// chart.cursor.behavior = "panXY";
// chart.cursor.xAxis = dateAxis;
// chart.cursor.snapToSeries = series;

// // Create vertical scrollbar and place it before the value axis
// chart.scrollbarY = new am4core.Scrollbar();
// chart.scrollbarY.parent = chart.leftAxesContainer;
// chart.scrollbarY.toBack();

// // Create a horizontal scrollbar with previe and place it underneath the date axis
// chart.scrollbarX = new am4charts.XYChartScrollbar();
// chart.scrollbarX.series.push(series);
// chart.scrollbarX.parent = chart.bottomAxesContainer;

// dateAxis.start = 0.79;
// dateAxis.keepSelection = true;
  }
}
