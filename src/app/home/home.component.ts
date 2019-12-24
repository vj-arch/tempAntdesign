import { Component, NgZone, OnInit } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Data } from "../data.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  //Donut  Chart

  Jdata: Data[] = [];
  listOfOption: Array<{ label: string; value: string }> = [];
  multipleValue = [201.9, 301.9, 201.1, 165.8, 139.9, 128.3];
  allData: any;
  rangeValue = [100, 400];
  fileReaded: any;

  constructor(private zone: NgZone) {}

  //select section
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
      // Chart section after the applying filters
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
  } //SelectedData section ends

  isCollapsed = false;
  private chart: am4charts.XYChart;

  // XY Chart with Zoom effect
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      // Create chart instance
      let chart = am4core.create("chartdiv2", am4charts.XYChart);

      // Add data
      chart.data = [
        {
          year: 2000,
          income: 23.5,
          expenses: 18.1,
          bullet:
            "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBoZWlnaHQ9Ijc5NCIgdmVyc2lvbj0iMSIgdmlld0JveD0iMCAwIDIxMCAyMTAiIHdpZHRoPSI3OTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE4IDZDMTEgNiA2IDExIDYgMTd2MTc1YzAgNyA1IDEyIDEyIDEyaDE3NWM2IDAgMTEtNSAxMS0xMlYxN2MwLTYtNS0xMS0xMS0xMUgxOHoiIGZpbGw9IiMwMDI0N2QiLz48cGF0aCBkPSJNNiAzOXYxN2w4NCA0OS04NCA0OHYxOGw5OS01OCA5OSA1OHYtMThsLTg0LTQ4IDg0LTQ5VjM5bC05OSA1N0w2IDM5eiIgZmlsbD0iI2NmMTQyYiIgcGFpbnQtb3JkZXI9Im1hcmtlcnMgZmlsbCBzdHJva2UiLz48cGF0aCBkPSJNODggNnY4Mkg2djM0aDgydjgyaDM0di04Mmg4MlY4OGgtODJWNkg4OHoiIGZpbGw9IiNjZjE0MmIiIHBhaW50LW9yZGVyPSJtYXJrZXJzIGZpbGwgc3Ryb2tlIi8+PHBhdGggZD0iTTg1IDZ2NzVMNiAzNXY4bDcyIDQySDYyTDYgNTN2N2w0MyAyNUg2djZoODZWNnptMzQgMHY4NWg4NXYtNmgtNDJsNDItMjV2LTdsLTU1IDMyaC0xN2w3Mi00MnYtOGwtNzggNDZWNnpNOTIgMTE5SDZ2Nmg0M0w2IDE0OXY4bDU2LTMyaDE2TDYgMTY3djdsNzktNDV2NzVoN3YtNzl6bTI3IDB2ODVoN3YtNzVsNzggNDV2LTdsLTcyLTQyaDE3bDU1IDMydi04bC00Mi0yNGg0MnYtNmgtODV6IiBzdHlsZT0ibGluZS1oZWlnaHQ6bm9ybWFsO2ZvbnQtdmFyaWFudC1saWdhdHVyZXM6bm9ybWFsO2ZvbnQtdmFyaWFudC1wb3NpdGlvbjpub3JtYWw7Zm9udC12YXJpYW50LWNhcHM6bm9ybWFsO2ZvbnQtdmFyaWFudC1udW1lcmljOm5vcm1hbDtmb250LXZhcmlhbnQtYWx0ZXJuYXRlczpub3JtYWw7Zm9udC1mZWF0dXJlLXNldHRpbmdzOm5vcm1hbDt0ZXh0LWluZGVudDowO3RleHQtYWxpZ246c3RhcnQ7dGV4dC1kZWNvcmF0aW9uLWxpbmU6bm9uZTt0ZXh0LWRlY29yYXRpb24tc3R5bGU6c29saWQ7dGV4dC1kZWNvcmF0aW9uLWNvbG9yOiMwMDA7dGV4dC10cmFuc2Zvcm06bm9uZTt0ZXh0LW9yaWVudGF0aW9uOm1peGVkO3NoYXBlLXBhZGRpbmc6MDtpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWwiIGNvbG9yPSIjMDAwIiBmb250LXdlaWdodD0iNDAwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgd2hpdGUtc3BhY2U9Im5vcm1hbCIgb3ZlcmZsb3c9InZpc2libGUiIGZpbGw9IiNmZmYiIHBhaW50LW9yZGVyPSJtYXJrZXJzIGZpbGwgc3Ryb2tlIi8+PC9zdmc+"
        },
        {
          year: 2001,
          income: 26.2,
          expenses: 22.8,
          bullet:
            "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBoZWlnaHQ9Ijc5NCIgdmVyc2lvbj0iMSIgdmlld0JveD0iMCAwIDIxMCAyMTAiIHdpZHRoPSI3OTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE4IDZDMTEgNiA2IDExIDYgMTd2ODhoMTk4VjE3YzAtNi01LTExLTExLTExSDE4eiIgZmlsbD0iI2RmMTEyYiIvPjxwYXRoIGQ9Ik02IDEwNXY4N2MwIDcgNSAxMiAxMiAxMmgxNzVjNiAwIDExLTUgMTEtMTJ2LTg3SDZ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+"
        },
        {
          year: 2002,
          income: 30.1,
          expenses: 23.9,
          bullet:
            "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBoZWlnaHQ9Ijc5NCIgdmVyc2lvbj0iMSIgdmlld0JveD0iMCAwIDIxMCAyMTAiIHdpZHRoPSI3OTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE4IDZDMTEgNiA2IDExIDYgMTd2NTVoMTk4VjE3YzAtNi01LTExLTExLTExaC04N3pNNiAxMzh2NTRjMCA3IDUgMTIgMTIgMTJoMTc1YzYgMCAxMS01IDExLTEydi01NHoiIGZpbGw9IiNlZDI5MzciLz48cGF0aCBkPSJNNiA3MnY2NmgxOThWNzJINnoiIGZpbGw9IiNmOWY5ZjkiLz48L3N2Zz4="
        },
        {
          year: 2003,
          income: 29.5,
          expenses: 25.1,
          bullet:
            "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBoZWlnaHQ9Ijc5NCIgdmVyc2lvbj0iMSIgdmlld0JveD0iMCAwIDIxMCAyMTAiIHdpZHRoPSI3OTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE4IDZDMTEgNiA2IDExIDYgMTd2ODhoMTk4VjE3YzAtNi01LTExLTExLTExSDE4eiIgZmlsbD0iI2RmMTEyYiIvPjxwYXRoIGQ9Ik02IDEwNXY4N2MwIDcgNSAxMiAxMiAxMmgxNzVjNiAwIDExLTUgMTEtMTJ2LTg3SDZ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+"
        },

        {
          year: 2004,
          income: 23.5,
          expenses: 18.1,
          bullet:
            "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBoZWlnaHQ9Ijc5NCIgdmVyc2lvbj0iMSIgdmlld0JveD0iMCAwIDIxMCAyMTAiIHdpZHRoPSI3OTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE4IDZDMTEgNiA2IDExIDYgMTd2MTc1YzAgNyA1IDEyIDEyIDEyaDE3NWM2IDAgMTEtNSAxMS0xMlYxN2MwLTYtNS0xMS0xMS0xMUgxOHoiIGZpbGw9IiMwMDI0N2QiLz48cGF0aCBkPSJNNiAzOXYxN2w4NCA0OS04NCA0OHYxOGw5OS01OCA5OSA1OHYtMThsLTg0LTQ4IDg0LTQ5VjM5bC05OSA1N0w2IDM5eiIgZmlsbD0iI2NmMTQyYiIgcGFpbnQtb3JkZXI9Im1hcmtlcnMgZmlsbCBzdHJva2UiLz48cGF0aCBkPSJNODggNnY4Mkg2djM0aDgydjgyaDM0di04Mmg4MlY4OGgtODJWNkg4OHoiIGZpbGw9IiNjZjE0MmIiIHBhaW50LW9yZGVyPSJtYXJrZXJzIGZpbGwgc3Ryb2tlIi8+PHBhdGggZD0iTTg1IDZ2NzVMNiAzNXY4bDcyIDQySDYyTDYgNTN2N2w0MyAyNUg2djZoODZWNnptMzQgMHY4NWg4NXYtNmgtNDJsNDItMjV2LTdsLTU1IDMyaC0xN2w3Mi00MnYtOGwtNzggNDZWNnpNOTIgMTE5SDZ2Nmg0M0w2IDE0OXY4bDU2LTMyaDE2TDYgMTY3djdsNzktNDV2NzVoN3YtNzl6bTI3IDB2ODVoN3YtNzVsNzggNDV2LTdsLTcyLTQyaDE3bDU1IDMydi04bC00Mi0yNGg0MnYtNmgtODV6IiBzdHlsZT0ibGluZS1oZWlnaHQ6bm9ybWFsO2ZvbnQtdmFyaWFudC1saWdhdHVyZXM6bm9ybWFsO2ZvbnQtdmFyaWFudC1wb3NpdGlvbjpub3JtYWw7Zm9udC12YXJpYW50LWNhcHM6bm9ybWFsO2ZvbnQtdmFyaWFudC1udW1lcmljOm5vcm1hbDtmb250LXZhcmlhbnQtYWx0ZXJuYXRlczpub3JtYWw7Zm9udC1mZWF0dXJlLXNldHRpbmdzOm5vcm1hbDt0ZXh0LWluZGVudDowO3RleHQtYWxpZ246c3RhcnQ7dGV4dC1kZWNvcmF0aW9uLWxpbmU6bm9uZTt0ZXh0LWRlY29yYXRpb24tc3R5bGU6c29saWQ7dGV4dC1kZWNvcmF0aW9uLWNvbG9yOiMwMDA7dGV4dC10cmFuc2Zvcm06bm9uZTt0ZXh0LW9yaWVudGF0aW9uOm1peGVkO3NoYXBlLXBhZGRpbmc6MDtpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWwiIGNvbG9yPSIjMDAwIiBmb250LXdlaWdodD0iNDAwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgd2hpdGUtc3BhY2U9Im5vcm1hbCIgb3ZlcmZsb3c9InZpc2libGUiIGZpbGw9IiNmZmYiIHBhaW50LW9yZGVyPSJtYXJrZXJzIGZpbGwgc3Ryb2tlIi8+PC9zdmc+"
        },
        {
          year: 2005,
          income: 26.2,
          expenses: 22.8,
          bullet:
            "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBoZWlnaHQ9Ijc5NCIgdmVyc2lvbj0iMSIgdmlld0JveD0iMCAwIDIxMCAyMTAiIHdpZHRoPSI3OTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE4IDZDMTEgNiA2IDExIDYgMTd2ODhoMTk4VjE3YzAtNi01LTExLTExLTExSDE4eiIgZmlsbD0iI2RmMTEyYiIvPjxwYXRoIGQ9Ik02IDEwNXY4N2MwIDcgNSAxMiAxMiAxMmgxNzVjNiAwIDExLTUgMTEtMTJ2LTg3SDZ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+"
        },
        {
          year: 2006,
          income: 24.6,
          expenses: 25,
          bullet:
            "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBoZWlnaHQ9Ijc5NCIgdmVyc2lvbj0iMSIgdmlld0JveD0iMCAwIDIxMCAyMTAiIHdpZHRoPSI3OTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE4IDZDMTEgNiA2IDExIDYgMTd2MTc1YzAgNyA1IDEyIDEyIDEyaDE3NWM2IDAgMTEtNSAxMS0xMlYxN2MwLTYtNS0xMS0xMS0xMUgxOHoiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSIxMDUiIGN5PSIxMDUiIHI9IjM2IiBmaWxsPSIjYmMwMDJkIiBwYWludC1vcmRlcj0ibWFya2VycyBmaWxsIHN0cm9rZSIvPjwvc3ZnPg=="
        },

        {
          year: 2007,
          income: 23.5,
          expenses: 18.1,
          bullet:
            "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBoZWlnaHQ9Ijc5NCIgdmVyc2lvbj0iMSIgdmlld0JveD0iMCAwIDIxMCAyMTAiIHdpZHRoPSI3OTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE4IDZDMTEgNiA2IDExIDYgMTd2MTc1YzAgNyA1IDEyIDEyIDEyaDE3NWM2IDAgMTEtNSAxMS0xMlYxN2MwLTYtNS0xMS0xMS0xMUgxOHoiIGZpbGw9IiMwMDI0N2QiLz48cGF0aCBkPSJNNiAzOXYxN2w4NCA0OS04NCA0OHYxOGw5OS01OCA5OSA1OHYtMThsLTg0LTQ4IDg0LTQ5VjM5bC05OSA1N0w2IDM5eiIgZmlsbD0iI2NmMTQyYiIgcGFpbnQtb3JkZXI9Im1hcmtlcnMgZmlsbCBzdHJva2UiLz48cGF0aCBkPSJNODggNnY4Mkg2djM0aDgydjgyaDM0di04Mmg4MlY4OGgtODJWNkg4OHoiIGZpbGw9IiNjZjE0MmIiIHBhaW50LW9yZGVyPSJtYXJrZXJzIGZpbGwgc3Ryb2tlIi8+PHBhdGggZD0iTTg1IDZ2NzVMNiAzNXY4bDcyIDQySDYyTDYgNTN2N2w0MyAyNUg2djZoODZWNnptMzQgMHY4NWg4NXYtNmgtNDJsNDItMjV2LTdsLTU1IDMyaC0xN2w3Mi00MnYtOGwtNzggNDZWNnpNOTIgMTE5SDZ2Nmg0M0w2IDE0OXY4bDU2LTMyaDE2TDYgMTY3djdsNzktNDV2NzVoN3YtNzl6bTI3IDB2ODVoN3YtNzVsNzggNDV2LTdsLTcyLTQyaDE3bDU1IDMydi04bC00Mi0yNGg0MnYtNmgtODV6IiBzdHlsZT0ibGluZS1oZWlnaHQ6bm9ybWFsO2ZvbnQtdmFyaWFudC1saWdhdHVyZXM6bm9ybWFsO2ZvbnQtdmFyaWFudC1wb3NpdGlvbjpub3JtYWw7Zm9udC12YXJpYW50LWNhcHM6bm9ybWFsO2ZvbnQtdmFyaWFudC1udW1lcmljOm5vcm1hbDtmb250LXZhcmlhbnQtYWx0ZXJuYXRlczpub3JtYWw7Zm9udC1mZWF0dXJlLXNldHRpbmdzOm5vcm1hbDt0ZXh0LWluZGVudDowO3RleHQtYWxpZ246c3RhcnQ7dGV4dC1kZWNvcmF0aW9uLWxpbmU6bm9uZTt0ZXh0LWRlY29yYXRpb24tc3R5bGU6c29saWQ7dGV4dC1kZWNvcmF0aW9uLWNvbG9yOiMwMDA7dGV4dC10cmFuc2Zvcm06bm9uZTt0ZXh0LW9yaWVudGF0aW9uOm1peGVkO3NoYXBlLXBhZGRpbmc6MDtpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWwiIGNvbG9yPSIjMDAwIiBmb250LXdlaWdodD0iNDAwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgd2hpdGUtc3BhY2U9Im5vcm1hbCIgb3ZlcmZsb3c9InZpc2libGUiIGZpbGw9IiNmZmYiIHBhaW50LW9yZGVyPSJtYXJrZXJzIGZpbGwgc3Ryb2tlIi8+PC9zdmc+"
        },
        {
          year: 2008,
          income: 26.2,
          expenses: 22.8,
          bullet:
            "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBoZWlnaHQ9Ijc5NCIgdmVyc2lvbj0iMSIgdmlld0JveD0iMCAwIDIxMCAyMTAiIHdpZHRoPSI3OTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE4IDZDMTEgNiA2IDExIDYgMTd2ODhoMTk4VjE3YzAtNi01LTExLTExLTExSDE4eiIgZmlsbD0iI2RmMTEyYiIvPjxwYXRoIGQ9Ik02IDEwNXY4N2MwIDcgNSAxMiAxMiAxMmgxNzVjNiAwIDExLTUgMTEtMTJ2LTg3SDZ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+"
        },

        {
          year: 2009,
          income: 23.5,
          expenses: 18.1,
          bullet:
            "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBoZWlnaHQ9Ijc5NCIgdmVyc2lvbj0iMSIgdmlld0JveD0iMCAwIDIxMCAyMTAiIHdpZHRoPSI3OTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE4IDZDMTEgNiA2IDExIDYgMTd2MTc1YzAgNyA1IDEyIDEyIDEyaDE3NWM2IDAgMTEtNSAxMS0xMlYxN2MwLTYtNS0xMS0xMS0xMUgxOHoiIGZpbGw9IiMwMDI0N2QiLz48cGF0aCBkPSJNNiAzOXYxN2w4NCA0OS04NCA0OHYxOGw5OS01OCA5OSA1OHYtMThsLTg0LTQ4IDg0LTQ5VjM5bC05OSA1N0w2IDM5eiIgZmlsbD0iI2NmMTQyYiIgcGFpbnQtb3JkZXI9Im1hcmtlcnMgZmlsbCBzdHJva2UiLz48cGF0aCBkPSJNODggNnY4Mkg2djM0aDgydjgyaDM0di04Mmg4MlY4OGgtODJWNkg4OHoiIGZpbGw9IiNjZjE0MmIiIHBhaW50LW9yZGVyPSJtYXJrZXJzIGZpbGwgc3Ryb2tlIi8+PHBhdGggZD0iTTg1IDZ2NzVMNiAzNXY4bDcyIDQySDYyTDYgNTN2N2w0MyAyNUg2djZoODZWNnptMzQgMHY4NWg4NXYtNmgtNDJsNDItMjV2LTdsLTU1IDMyaC0xN2w3Mi00MnYtOGwtNzggNDZWNnpNOTIgMTE5SDZ2Nmg0M0w2IDE0OXY4bDU2LTMyaDE2TDYgMTY3djdsNzktNDV2NzVoN3YtNzl6bTI3IDB2ODVoN3YtNzVsNzggNDV2LTdsLTcyLTQyaDE3bDU1IDMydi04bC00Mi0yNGg0MnYtNmgtODV6IiBzdHlsZT0ibGluZS1oZWlnaHQ6bm9ybWFsO2ZvbnQtdmFyaWFudC1saWdhdHVyZXM6bm9ybWFsO2ZvbnQtdmFyaWFudC1wb3NpdGlvbjpub3JtYWw7Zm9udC12YXJpYW50LWNhcHM6bm9ybWFsO2ZvbnQtdmFyaWFudC1udW1lcmljOm5vcm1hbDtmb250LXZhcmlhbnQtYWx0ZXJuYXRlczpub3JtYWw7Zm9udC1mZWF0dXJlLXNldHRpbmdzOm5vcm1hbDt0ZXh0LWluZGVudDowO3RleHQtYWxpZ246c3RhcnQ7dGV4dC1kZWNvcmF0aW9uLWxpbmU6bm9uZTt0ZXh0LWRlY29yYXRpb24tc3R5bGU6c29saWQ7dGV4dC1kZWNvcmF0aW9uLWNvbG9yOiMwMDA7dGV4dC10cmFuc2Zvcm06bm9uZTt0ZXh0LW9yaWVudGF0aW9uOm1peGVkO3NoYXBlLXBhZGRpbmc6MDtpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWwiIGNvbG9yPSIjMDAwIiBmb250LXdlaWdodD0iNDAwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgd2hpdGUtc3BhY2U9Im5vcm1hbCIgb3ZlcmZsb3c9InZpc2libGUiIGZpbGw9IiNmZmYiIHBhaW50LW9yZGVyPSJtYXJrZXJzIGZpbGwgc3Ryb2tlIi8+PC9zdmc+"
        },
        {
          year: 2010,
          income: 26.2,
          expenses: 22.8,
          bullet:
            "data:image/svg+xml;charset=utf-8;base64,PHN2ZyBoZWlnaHQ9Ijc5NCIgdmVyc2lvbj0iMSIgdmlld0JveD0iMCAwIDIxMCAyMTAiIHdpZHRoPSI3OTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE4IDZDMTEgNiA2IDExIDYgMTd2ODhoMTk4VjE3YzAtNi01LTExLTExLTExSDE4eiIgZmlsbD0iI2RmMTEyYiIvPjxwYXRoIGQ9Ik02IDEwNXY4N2MwIDcgNSAxMiAxMiAxMmgxNzVjNiAwIDExLTUgMTEtMTJ2LTg3SDZ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+"
        }
      ];

      // Create axes
      let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "year";
      categoryAxis.numberFormatter.numberFormat = "#";
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.cellStartLocation = 0.1;
      categoryAxis.renderer.cellEndLocation = 0.9;

      let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.opposite = true;

      // Create series
      function createSeries(field, name, fg) {
        let flag = fg;
        let series = chart.series.push(new am4charts.ColumnSeries());

        if (flag) {
          // let columnTemplate = series.columns.template;
          // columnTemplate.height = am4core.percent(50);
          // columnTemplate.maxHeight = 50;
          // columnTemplate.column.cornerRadius(0, 10, 0, 10);
          // columnTemplate.strokeOpacity = 0;
          // let bullet = columnTemplate.createChild(am4charts.CircleBullet);
          // bullet.align = "left";
          // bullet.valign = "middle";
          // bullet.isMeasured = true;
          // bullet.interactionsEnabled = false;
          // bullet.horizontalCenter = "right";
          // bullet.marginLeft = 15;
          // bullet.paddingTop = 15;
          // let image = bullet.createChild(am4core.Image);
          // image.propertyFields.href = "bullet";
          // image.width = 30;
          // image.height = 30;
          // image.marginLeft = 30;
          // image.horizontalCenter = "middle";
          // image.verticalCenter = "middle";
        } else {
          let columnTemplate = series.columns.template;
          columnTemplate.height = am4core.percent(50);
          columnTemplate.maxHeight = 50;

          columnTemplate.strokeOpacity = 0;

          let bullet = columnTemplate.createChild(am4charts.CircleBullet);
          bullet.align = "left";
          bullet.valign = "middle";
          bullet.isMeasured = true;
          bullet.interactionsEnabled = false;
          bullet.horizontalCenter = "right";
          bullet.marginLeft = 13;
          bullet.paddingBottom = 23;
          // bullet.marginLeft = -23;

          let image = bullet.createChild(am4core.Image);
          image.propertyFields.href = "bullet";
          image.width = 30;
          image.height = 30;
          image.marginLeft = 30;
          image.horizontalCenter = "middle";
          image.verticalCenter = "middle";
        }

        series.dataFields.valueX = field;
        series.dataFields.categoryY = "year";
        series.name = name;
        series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
        series.columns.template.height = am4core.percent(100);
        series.sequencedInterpolation = true;

        let valueLabel = series.bullets.push(new am4charts.LabelBullet());

        valueLabel.label.verticalCenter = "middle";
        valueLabel.label.dx = 10;
        valueLabel.label.hideOversized = false;
        valueLabel.label.truncate = false;
      }

      createSeries("income", "Income", 1);
      createSeries("expenses", "Expenses", 0);

      // Create chart instanc
    });

    // Different type of charts
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
      // Chart after loading the CSV file
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
      //Category as image

      // let categoryAxis = pieSeries.slices.push(
      //   new am4charts.PieSeriesDataItem()
      // );
      // categoryAxis.renderer.grid.template.location = 0;
      // categoryAxis.dataFields.category = "Name";
      // categoryAxis.renderer.minGridDistance = 40;
      // categoryAxis.fontSize = 11;
      // categoryAxis.renderer.labels.template.dy = 5;

      // let image = new am4core.Image();
      // image.horizontalCenter = "middle";
      // image.width = 20;
      // image.height = 20;
      // image.verticalCenter = "middle";
      // image.adapter.add("href", (href, target) => {
      //   let category = target.dataItem.category;
      //   if (category) {
      //     return (
      //       "https://www.amcharts.com/wp-content/uploads/flags/" +
      //       category
      //         .split(" ")
      //         .join("-")
      //         .toLowerCase() +
      //       ".svg"
      //     );
      //   }
      //   return href;
      // });
      // categoryAxis.dataItems.template.bullet = image;
      // Add a legend
      chart.legend = new am4charts.Legend();

      chart.data = chartdata;
    };
  }

  //Chart with Images
  showChartwithImage() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdiv3", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        country: "United States",
        visits: 725
      },
      {
        country: "United Kingdom",
        visits: 625
      },
      {
        country: "China",
        visits: 602
      },
      {
        country: "Japan",
        visits: 509
      },
      {
        country: "Germany",
        visits: 322
      },
      {
        country: "France",
        visits: 214
      },
      {
        country: "India",
        visits: 204
      },
      {
        country: "Spain",
        visits: 198
      },
      {
        country: "Netherlands",
        visits: 165
      },
      {
        country: "Russia",
        visits: 130
      },
      {
        country: "South Korea",
        visits: 93
      },
      {
        country: "Canada",
        visits: 41
      }
    ];

    // let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    // categoryAxis.renderer.grid.template.location = 0;
    // categoryAxis.dataFields.category = "country";
    // categoryAxis.renderer.minGridDistance = 40;
    // categoryAxis.fontSize = 11;
    // categoryAxis.renderer.labels.template.dy = 5;

    // let image = new am4core.Image();
    // image.horizontalCenter = "middle";
    // image.width = 20;
    // image.height = 20;
    // image.verticalCenter = "middle";
    // image.adapter.add("href", (href, target) => {
    //   let category = target.dataItem.category;
    //   if (category) {
    //     return (
    //       "https://www.amcharts.com/wp-content/uploads/flags/" +
    //       category
    //         .split(" ")
    //         .join("-")
    //         .toLowerCase() +
    //       ".svg"
    //     );
    //   }
    //   return href;
    // });
    // categoryAxis.dataItems.template.bullet = image;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.renderer.minGridDistance = 30;
    valueAxis.renderer.baseGrid.disabled = true;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "country";
    series.dataFields.valueY = "visits";
    series.columns.template.tooltipText = "{valueY.value}";
    series.columns.template.tooltipY = 0;
    series.columns.template.strokeOpacity = 0;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });
  } // Chart with Images Ends Here

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

  // Class ends here
}
