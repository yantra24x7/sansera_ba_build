import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SdashboardComponent } from './sdashboard.component';

const routes: Routes = [{ path: '', component: SdashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SdashboardRoutingModule { }
