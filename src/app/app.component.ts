import { Component, NgZone, OnInit } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Data } from "./data.model";

am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  //Donut  Chart
  displayflag = 0;
  Jdata: Data[] = [];
  //select section
  listOfOption: Array<{ label: string; value: string }> = [];
  multipleValue = [201.9, 301.9, 201.1, 165.8, 139.9, 128.3];
  //this.selectedData(multipleValue);
  allData: any;
  rangeValue = [100, 400];
  fileReaded: any;

  changedisplay() {
    this.displayflag = 1;
  }
  selectedData(filter) {
    let tempData: any = [];

    for (let i = 0; i < this.allData.length; i++) {
      for (let j = 0; j < this.multipleValue.length; j++) {
        if (this.allData[i].value == this.multipleValue[j]) {
          tempData.push({
            country: this.allData[i].label,
            litres: this.allData[i].value
          });
        }
      }
    }
    if (filter == "range") {
      tempData = [];
      console.log(this.multipleValue);
      for (let i = 0; i < this.allData.length; i++) {
        if (
          this.allData[i].value >= this.rangeValue[0] &&
          this.allData[i].value <= this.rangeValue[1]
        ) {
          tempData.push({
            country: this.allData[i].label,
            litres: this.allData[i].value
          });
        }
      }
    }

    console.log(tempData);
    if (tempData != []) {
      this.zone.runOutsideAngular(() => {
        //Pie Charts
        let chart2 = am4core.create("chartdivpie", am4charts.PieChart);
        chart2.data = tempData;

        // Add and configure Series
        let pieSeries = chart2.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";

        // disabling the elements
        // pieSeries.labels.template.disabled = true;
        //pieSeries.ticks.template.disabled = true;

        //align lables in pie charts
        pieSeries.alignLabels = false;
        pieSeries.labels.template.bent = true;
        //XY Charts
      });
    }
  }

  isCollapsed = false;
  private chart: am4charts.XYChart;
  constructor(private zone: NgZone) {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      //Pie Charts

      let chart = am4core.create("chartdiv", am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      for (let i = 1; i < 366; i++) {
        visits += Math.round(
          (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
        );
        data.push({
          date: new Date(2018, 0, i),
          name: "name" + i,
          value: visits
        });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";

      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
    });
  }

  // Convert the csv document to json

  // You are passing File to csvJSON method instead of file's text. You can use FileReader to read its content. Here's an example

  convertFile(csv: any) {
    let chartdata: any = [];

    let chart: any;
    this.fileReaded = csv.target.files[0];
    console.log(this.fileReaded);
    let jsondatamain = [];
    let jsondata = [];
    let reader: FileReader = new FileReader();
    reader.readAsText(this.fileReaded);

    reader.onload = e => {
      let csv: any = reader.result;
      // console.log(csv);
      let allTextLines = csv.split(/\r|\n|\r/);
      let headers = allTextLines[0].split(",");
      // console.log("all", allTextLines);
      //console.log("headers", headers);
      let lines = [];

      for (let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(",");
        if (data.length === headers.length) {
          let tarr = [];
          jsondata = [];
          for (let j = 0; j < headers.length; j++) {
            tarr.push(data[j]);
            let head = headers[j];

            if (i != 0) {
              jsondata.push({
                [head]: data[j]
              });
            }
          }
          // console.log(jsondata);
          if (i != 0) jsondatamain.push({ jsondata });

          lines.push(tarr);
        }
      }
      console.log(jsondatamain);
      for (let i = 0; i < jsondatamain.length; i++) {
        chartdata.push({
          Name: jsondatamain[i].jsondata[1]["name"],
          Age: jsondatamain[i].jsondata[2]["age"]
        });
      }
      console.log(chartdata);

      am4core.useTheme(am4themes_animated);

      // Create chart instance
      chart = am4core.create("chartdivdonut", am4charts.PieChart);

      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "Age";
      pieSeries.dataFields.category = "Name";

      // Let's cut a hole in our Pie chart the size of 30% the radius
      chart.innerRadius = am4core.percent(30);

      // Put a thick white border around each Slice
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;
      // change the cursor on hover to make it apparent the object can be interacted with
      pieSeries.slices.template.cursorOverStyle = [
        {
          property: "cursor",
          value: "pointer"
        }
      ];
      pieSeries.colors.list = [
        am4core.color("#218c74"),
        am4core.color("#40407a"),
        am4core.color("#fed330"),
        am4core.color("#4b6584"),
        am4core.color("#FD7272"),
        am4core.color("#58B19F")
      ];
      pieSeries.alignLabels = false;
      pieSeries.labels.template.bent = true;
      pieSeries.labels.template.radius = -10;
      pieSeries.labels.template.padding(0, 0, 0, 0);
      pieSeries.labels.template.fill = am4core.color("#fff");
      pieSeries.labels.template.text = "{category}";

      pieSeries.ticks.template.disabled = true;

      // Create a base filter effect (as if it's not there) for the hover to return to
      let shadow = pieSeries.slices.template.filters.push(
        new am4core.DropShadowFilter()
      );
      shadow.opacity = 0;

      // Create hover state
      let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

      // Slightly shift the shadow and make it more prominent on hover
      let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
      hoverShadow.opacity = 0.7;
      hoverShadow.blur = 5;

      // Add a legend
      chart.legend = new am4charts.Legend();

      chart.data = chartdata;
    };
  }

  ngOnInit() {
    const children: Array<{ label: string; value: any }> = [
      {
        label: "Lithuania",
        value: 201.9
      },
      {
        label: "Czech Republic",
        value: 301.9
      },
      {
        label: "Ireland",
        value: 201.1
      },
      {
        label: "Germany",
        value: 165.8
      },
      {
        label: "Australia",
        value: 139.9
      },
      {
        label: "Austria",
        value: 128.3
      }
    ];

    this.listOfOption = children;
    this.allData = this.listOfOption;
    this.selectedData("default");
  }
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
