import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CompaniesComponent } from "./companies.component";

import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from "src/app/material.module";
import { CompaniesSuccessFormComponent } from "./query-forms/company-success-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CompanyDataService } from "./services/companies-data.service";
import { CompaniesService } from "./services/companies.service";
import { HttpClientModule } from "@angular/common/http";
import { CompaniesSuccessResultsComponent } from "./query-results/company-success-results.component";

const routes: Route[] = [
    {
        path: '',
        component: CompaniesComponent
    }
];

export const CompaniesUIRoutesModule = RouterModule.forChild(routes);

@NgModule({
    declarations: [CompaniesComponent, CompaniesSuccessFormComponent, CompaniesSuccessResultsComponent],
    imports: [
      CommonModule,
      CompaniesUIRoutesModule,
      MaterialModule,
      ReactiveFormsModule,
      HttpClientModule
    ],
    providers: [CompaniesService, CompanyDataService]
  })
  export class CompaniesModule {}