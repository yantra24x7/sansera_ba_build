import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachineRegistrationComponent,Edit,Add,Sedit,Sadd } from './machine-registration.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule} from '../shared/shared.module';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

const routes: Routes = [{ path: '', component: MachineRegistrationComponent }];

@NgModule({
  declarations: [MachineRegistrationComponent,Edit,Add,Sedit,Sadd],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule
    
  ],
  entryComponents:[Edit,Add,Sedit,Sadd],

})
export class MachineRegistrationModule { }
