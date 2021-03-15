import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ActorsComponent } from "./actors.component";

import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from "src/app/material.module";
import { ActorSuccessFormComponent } from "./query-forms/actor-success-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ActorDataService } from "./services/actors-data.service";
import { ActorService } from "./services/actors.service";
import { HttpClientModule } from "@angular/common/http";
import { ActorSuccessResultsComponent } from "./query-results/actor-success-results.component";

const routes: Route[] = [
    {
        path: '',
        component: ActorsComponent
    }
];

export const ActorsUIRoutesModule = RouterModule.forChild(routes);

@NgModule({
    declarations: [ActorsComponent, ActorSuccessFormComponent, ActorSuccessResultsComponent],
    imports: [
      CommonModule,
      ActorsUIRoutesModule,
      MaterialModule,
      ReactiveFormsModule,
      HttpClientModule
    ],
    providers: [ActorService, ActorDataService]
  })
  export class ActorsModule {}