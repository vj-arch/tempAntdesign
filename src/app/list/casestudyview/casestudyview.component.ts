import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CasedataService } from "../casedata.service";

@Component({
  selector: "app-casestudyview",
  templateUrl: "./casestudyview.component.html",
  styleUrls: ["./casestudyview.component.css"]
})
export class CasestudyviewComponent implements OnInit {
  constructor(
    private activatedroute: ActivatedRoute,
    private casedataservice: CasedataService
  ) {}
  id;
  text: string;
  caseData: any = [];

  ngOnInit() {
    this.id = this.activatedroute.snapshot.paramMap.get("id");
    this.caseData = this.casedataservice.getcasedata(this.id);
    console.log(this.caseData);
  }
}
