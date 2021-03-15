import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FilmsComponent } from "./films.component";

import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from "src/app/material.module";

const routes: Route[] = [
    {
        path: '',
        component: FilmsComponent
    }
];

export const FilmsUIRoutesModule = RouterModule.forChild(routes);

@NgModule({
    declarations: [FilmsComponent],
    imports: [
      CommonModule,
      FilmsUIRoutesModule,
      MaterialModule
    ],
  })
  export class FilmsModule {}