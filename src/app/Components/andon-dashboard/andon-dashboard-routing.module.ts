import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AndonDashboardComponent } from './andon-dashboard.component';

const routes: Routes = [{ path: '', component: AndonDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AndonDashboardRoutingModule { }
