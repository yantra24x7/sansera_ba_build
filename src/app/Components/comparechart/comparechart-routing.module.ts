import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComparechartComponent } from './comparechart.component';

const routes: Routes = [{ path: '', component: ComparechartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComparechartRoutingModule { }
 