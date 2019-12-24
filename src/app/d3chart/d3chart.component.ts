import { Component, OnInit } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { collapseMotion } from "ng-zorro-antd";

@Component({
  selector: "app-d3chart",
  templateUrl: "./d3chart.component.html",
  styleUrls: ["./d3chart.component.css"]
})
export class D3chartComponent implements OnInit {
  constructor() {}
  flag = 1;
  polarcharts() {
    this.flag = 0;
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdiv", am4charts.RadarChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        category: "One",
        value1: 8,
        value2: 2,
        value3: 4,
        value4: 3
      },
      {
        category: "Two",
        value1: 11,
        value2: 4,
        value3: 2,
        value4: 4
      },
      {
        category: "Three",
        value1: 7,
        value2: 6,
        value3: 6,
        value4: 2
      },
      {
        category: "Four",
        value1: 13,
        value2: 8,
        value3: 3,
        value4: 2
      },
      {
        category: "Five",
        value1: 12,
        value2: 10,
        value3: 5,
        value4: 1
      },
      {
        category: "Six",
        value1: 15,
        value2: 12,
        value3: 4,
        value4: 4
      },
      {
        category: "Seven",
        value1: 9,
        value2: 14,
        value3: 6,
        value4: 2
      },
      {
        category: "Eight",
        value1: 6,
        value2: 16,
        value3: 5,
        value4: 1
      }
    ];

    chart.padding(20, 20, 20, 20);

    chart.colors.list = [
      am4core.color("#218c74"),
      am4core.color("#40407a"),
      am4core.color("#fed330"),
      am4core.color("#4b6584"),
      am4core.color("#FD7272"),
      am4core.color("#58B19F")
    ];

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.renderer.tooltipLocation = 0.5;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis() as any);
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.labels.template.horizontalCenter = "left";
    valueAxis.min = 0;

    let series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.columns.template.tooltipText = "{name}: {valueY.value}";
    series1.columns.template.width = am4core.percent(30);
    series1.name = "Series 1";
    series1.dataFields.categoryX = "category";
    series1.dataFields.valueY = "value2";
    series1.stacked = true;
    let series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.columns.template.tooltipText = "{name}: {valueY.value}";
    series2.columns.template.width = am4core.percent(30);
    series2.name = "Series 2";
    series2.dataFields.categoryX = "category";
    series2.dataFields.valueY = "value3";
    series2.stacked = true;

    chart.seriesContainer.zIndex = -1;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.exportable = false;
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.exportable = false;

    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.xAxis = categoryAxis;
    //chart.cursor.fullWidthXLine = true;
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineX.fillOpacity = 0.1;
    chart.cursor.lineX.fill = am4core.color("#fff");
  }
  // End Polar Chart

  //Start Polar chart 2 inside labels
  polarChartInsideLabels() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartdiv2", am4charts.RadarChart);
    chart.scrollbarX = new am4core.Scrollbar();

    let data = [
      {
        category: "SDG8",
        value: 20,
        bullet: "https://www.amcharts.com/lib/images/faces/E01.png"
      },
      {
        category: "SDG1",
        value: 30,
        bullet: "https://www.amcharts.com/lib/images/faces/D02.png"
      },
      {
        category: "SDG2",
        value: 50,
        bullet: "https://www.amcharts.com/lib/images/faces/C02.png"
      },
      {
        category: "SDG4",
        value: 25,
        bullet: "https://www.amcharts.com/lib/images/faces/D02.png"
      },
      {
        category: "SDG5",
        value: 35,
        bullet: "https://www.amcharts.com/lib/images/faces/E01.png"
      },
      {
        category: "SDG6",
        value: 70,
        bullet: "https://www.amcharts.com/lib/images/faces/E01.png"
      },
      {
        category: "SDG7",
        value: 60,
        bullet: "https://www.amcharts.com/lib/images/faces/D02.png"
      },
      {
        category: "SDG3",
        value: 52,
        bullet: "https://www.amcharts.com/lib/images/faces/D02.png"
      },
      {
        category: "SDG9",
        value: 33,
        bullet: "https://www.amcharts.com/lib/images/faces/D02.png"
      },
      {
        category: "SDG10",
        value: 44,
        bullet: "https://www.amcharts.com/lib/images/faces/D02.png"
      },
      {
        category: "SDG11",
        value: 68,
        bullet: "https://www.amcharts.com/lib/images/faces/D02.png"
      },
      {
        category: "SDG12",
        value: 77,
        bullet: "https://www.amcharts.com/lib/images/faces/D02.png"
      },
      {
        category: "SDG13",
        value: 24,
        bullet: "https://www.amcharts.com/lib/images/faces/D02.png"
      },
      {
        category: "SDG14",
        value: 66,
        bullet: "https://www.amcharts.com/lib/images/faces/D02.png"
      },
      {
        category: "SDG15",
        value: 48,
        bullet: "https://www.amcharts.com/lib/images/faces/D02.png"
      },
      {
        category: "SDG16",
        value: 22,
        bullet: "https://www.amcharts.com/lib/images/faces/D02.png"
      },
      {
        category: "SDG17",
        value: 59,
        bullet: "https://www.amcharts.com/lib/images/faces/D02.png"
      }
    ];

    chart.data = data;
    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(10);

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 5;
    categoryAxis.tooltip.disabled = false;
    categoryAxis.renderer.minHeight = 80;
    categoryAxis.renderer.grid.template.disabled = false;
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.renderer.tooltipLocation = 0.2;

    //categoryAxis.renderer.labels.template.disabled = true;
    let labelTemplate = categoryAxis.renderer.labels.template;
    labelTemplate.radius = am4core.percent(0);

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis() as any);
    valueAxis.renderer.grid.template.disabled = false;
    valueAxis.renderer.labels.template.disabled = false;
    valueAxis.tooltip.disabled = true;

    // Create series
    let series = chart.series.push(new am4charts.RadarColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "category";
    series.columns.template.strokeWidth = 0;
    series.tooltipText = "{valueY}";
    series.columns.template.radarColumn.cornerRadius = 0;
    series.columns.template.radarColumn.innerCornerRadius = 0;

    series.tooltip.pointerOrientation = "vertical";

    let columnTemplate = series.columns.template;

    let bullet = series.bullets.push(new am4charts.CircleBullet());
    //.verticalCenter = "bottom";
    // bullet.isMeasured = true;
    // bullet.interactionsEnabled = false;

    // bullet.marginRight = 80;

    // bullet.paddingTop = -23;

    let image = bullet.createChild(am4core.Image);
    image.propertyFields.href = "bullet";
    image.width = 30;
    image.height = 30;
    image.paddingTop = -23;
    image.marginTop = 35;

    //image.padding = 5;
    image.horizontalCenter = "middle";
    image.verticalCenter = "bottom";
    //categoryAxis.renderer.labels = image;
    // labelTemplate.text = image;image.dy = 20;
    // image.y = am4core.percent(100);

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.radarColumn.states.create("hover");
    hoverState.properties.cornerRadius = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.innerRadius = am4core.percent(10);
    chart.cursor.lineY.disabled = false;
  }
  ngOnInit() {}
}
