import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { CasestudyviewComponent } from "./casestudyview/casestudyview.component";

const routes: Routes = [
  { path: "", component: ListComponent },
  { path: "casestudy/:id", component: CasestudyviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule {}
