import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KpiDashboardComponent } from './kpi-dashboard.component';

const routes: Routes = [{ path: '', component: KpiDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KpiDashboardRoutingModule { }
