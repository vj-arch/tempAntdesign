import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IconsProviderModule } from "./icons-provider.module";
import { NgZorroAntdModule, NZ_I18N, en_US } from "ng-zorro-antd";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { NzButtonModule } from "ng-zorro-antd/button";
import {
  NzGridModule,
  NzTreeSelectModule,
  NzSelectModule,
  NzIconModule,
  NzInputModule,
  NzUploadModule,
  NzDatePickerModule,
  NzSliderModule
} from "ng-zorro-antd";
import { JsonstructComponent } from "./jsonstruct/jsonstruct.component";
import { HomeComponent } from "./home/home.component";
import { EditorModule } from "primeng/editor";
import { AccordionModule } from "primeng/accordion"; //accordion and accordion tab
import { MenuItem } from "primeng/api";
import { D3chartComponent } from './d3chart/d3chart.component';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, JsonstructComponent, HomeComponent, D3chartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    EditorModule,
    AccordionModule,
    NzInputModule,
    NzDatePickerModule,
    NgZorroAntdModule,
    NzSliderModule,
    NzUploadModule,
    NzTreeSelectModule,
    FormsModule,
    HttpClientModule,
    NzGridModule,
    NzButtonModule,
    NzSelectModule,
    NzIconModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {}
