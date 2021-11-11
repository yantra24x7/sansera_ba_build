import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardlineComponent } from './dashboardline.component';

const routes: Routes = [{ path: '', component: DashboardlineComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardlineRoutingModule { }
