import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RabwinDashboardComponent } from './rabwin-dashboard.component';

const routes: Routes = [{ path: '', component: RabwinDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RabwinDashboardRoutingModule { }
