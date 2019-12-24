import { Component, NgZone, OnInit } from "@angular/core";
import * as XLSX from "xlsx";
import { CasedataService } from "../casedata.service";
//import { readFile, IWorkBook, IWorkSheet, IUtils } from '@types/xlsx';
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  fileReaded: any;
  today: Date = new Date();
  flag = 1;
  //
  data1: any = [];
  data: any = [];
  d: any = [];

  constructor(private casedataservice: CasedataService) {}

  convertfile(csv: any) {
    let jsondatamain = [];
    let jsondata = [];

    this.fileReaded = csv.target.files[0];
    console.log(this.fileReaded);

    let reader: FileReader = new FileReader();
    reader.readAsText(this.fileReaded);

    reader.onload = e => {
      let csv: any = reader.result;
      // console.log(csv);
      let allTextLines = csv.split(/\r|\n|\r/);
      let headers = allTextLines[0].split(",");
      //console.log("all", allTextLines);
      // console.log("headers", headers);
      let lines = [];

      for (let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(",");
        console.log("data", data);
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
          //  console.log(jsondata);

          if (i != 0) jsondatamain.push({ jsondata });

          lines.push(tarr);
        }
      }
      // console.log(jsondatamain);
      for (let i = 0; i < jsondatamain.length; i++) {
        this.data1.push({
          Title: jsondatamain[i].jsondata[1]["title"],
          linkButton: jsondatamain[i].jsondata[2]["linkButton"],
          content: jsondatamain[i].jsondata[3]["content"],
          logoIcon: jsondatamain[i].jsondata[4]["logoIcon"],
          url: jsondatamain[i].jsondata[5]["url"]
        });
      }
      console.log(this.data1);

      this.flag = 0;
    };
  }

  arrayBuffer: any;
  file: File;

  Upload(event) {
    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = e => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.d = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      this.data = this.d;
      this.casedataservice.sendCasedata(this.d);
      this.flag = 0;
    };
    fileReader.readAsArrayBuffer(this.file);
  }

  ngOnInit() {
    this.data = this.casedataservice.getdata();
    console.log("after service", this.data);
  }
}
