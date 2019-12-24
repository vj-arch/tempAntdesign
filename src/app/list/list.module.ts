import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListComponent } from "./list/list.component";
import { EditorModule } from "primeng/editor";
import { ListRoutingModule } from "./list-routing.module";
import {
  NzListModule,
  NzGridModule,
  NzSelectModule,
  NzBreadCrumbModule,
  NzIconModule,
  NzInputModule,
  NzUploadModule,
  NzDatePickerModule,
  NzButtonModule,
  NzDividerModule,
  NzSliderModule
} from "ng-zorro-antd";
import { CasestudyviewComponent } from "./casestudyview/casestudyview.component";

@NgModule({
  declarations: [ListComponent, CasestudyviewComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzListModule,
    NzGridModule,
    NzSelectModule,
    EditorModule,
    NzDividerModule,
    NzIconModule,
    NzInputModule,
    NzUploadModule,
    NzDatePickerModule,
    NzSliderModule
  ]
})
export class ListModule {}
