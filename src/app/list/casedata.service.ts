import { Injectable } from "@angular/core";
import { is } from "@amcharts/amcharts4/.internal/core/utils/Type";

@Injectable({
  providedIn: "root"
})
export class CasedataService {
  constructor() {}

  casedata: any = [];
  sendCasedata(data) {
    this.casedata = data;
  }
  getcasedata(id: any) {
    console.log(id);
    let d: any;
    d = this.casedata.filter(c => c.id == id);
    console.log(d);
    return d;
  }
  getdata() {
    console.log("Back", this.casedata);
    return this.casedata;
  }
}
