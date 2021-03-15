import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";

const routes: Route[] = [
    {
        path: '',
        component: HomeComponent
    }
];

export const HomeUIRoutesModule = RouterModule.forChild(routes);

@NgModule({
    declarations: [HomeComponent],
    imports: [
      CommonModule,
      RouterModule,
      HomeUIRoutesModule
    ],
  })
  export class HomeModule {}