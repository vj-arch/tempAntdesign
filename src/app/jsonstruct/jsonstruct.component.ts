import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

//import Jdata from "./Jdata.json";

@Component({
  selector: "app-jsonstruct",
  templateUrl: "./jsonstruct.component.html",
  styleUrls: ["./jsonstruct.component.css"]
})
export class JsonstructComponent implements OnInit {
  constructor(private http: HttpClient) {}

  flag = 1;
  expandKeys = ["100", "1001"];
  value: string;
  parent1 = [];
  nodes = [
    {
      title: "parent 1",
      key: "100",
      children: [
        {
          title: "parent 1-0",
          key: "1001",
          children: [
            { title: "leaf 1-0-0", key: "10010", isLeaf: true },
            { title: "leaf 1-0-1", key: "10011", isLeaf: true }
          ]
        },
        {
          title: "parent 1-1",
          key: "1002",
          children: [{ title: "leaf 1-1-0", key: "10020", isLeaf: true }]
        }
      ]
    }
  ];

  onChange($event: string): void {
    console.log($event);
  }

  data: any = [];
  private _url = "../assets/Jdata.json";

  displayData() {
    this.flag = 0;
    let parent = [];
    this.http.get("../assets/Jdata.json").subscribe(d => {
      this.data = d;
      console.log(this.data);
      for (let k in this.data) {
        let keys = Object.keys(this.data[k]);
        //  parent = Object.keys(this.data[k]);
        // this.parent1 = Object.create(Object.keys(this.data[k]));
        console.log("parent", this.parent1);
        for (let h in this.data[k]) {
          if (typeof this.data[k][h] == "string") {
            // console.log("string", Object.keys(this.data[k][h]));
          } else {
            parent.push({ [keys[k]]: Object.keys(this.data[k][h]) });

            for (let p in this.data[k][h]) {
              if (typeof this.data[k][h][p] == "string") {
                //console.log("string", this.data[k][h][p]);
              } else {
                // console.log(
                //"type of values",
                // Object.values(this.data[k][h][p])
                //);
                //if(typeof(Object.values(this.data[k][h][p])) == "Array")
              }
            }
          }
          //console.log("kks", Object.keys(this.data[k][h]));
        }
      }
    });
  }
  ngOnInit() {
    // mock async
    setTimeout(() => {
      this.value = "1001";
    }, 1000);
  }
}
