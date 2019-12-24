import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { JsonstructComponent } from "./jsonstruct/jsonstruct.component";
import { HomeComponent } from "./home/home.component";
import { D3chartComponent } from "./d3chart/d3chart.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/home" },
  { path: "home", component: HomeComponent },
  { path: "json", component: JsonstructComponent },
  { path: "d3", component: D3chartComponent },
  {
    path: "welcome",
    loadChildren: () =>
      import("./pages/welcome/welcome.module").then(m => m.WelcomeModule)
  },
  { path: "list", loadChildren: "./list/list.module#ListModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
