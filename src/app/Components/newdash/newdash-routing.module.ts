import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewdashComponent } from './newdash.component';

const routes: Routes = [{ path: '', component: NewdashComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewdashRoutingModule { }
