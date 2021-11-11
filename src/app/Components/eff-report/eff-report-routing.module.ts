import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EffReportComponent } from './eff-report.component';

const routes: Routes = [{ path: '', component: EffReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EffReportRoutingModule { }
