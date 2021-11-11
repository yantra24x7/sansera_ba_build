import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OperatorRegistrationComponent, operator } from './operator-registration.component';
import { SharedModule } from '../shared/shared.module';
const routes: Routes = [{ path: '', component: OperatorRegistrationComponent }];


@NgModule({
  declarations: [OperatorRegistrationComponent, operator],
  imports: [RouterModule.forChild(routes),
    CommonModule, SharedModule
  ],
  entryComponents: [operator]
})
export class OperatorRegistrationModule { }
