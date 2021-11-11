import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { ReasonLmwComponent,User,Edit} from './reason-lmw.component';
const routes: Routes = [{ path: '', component: ReasonLmwComponent }];


@NgModule({
  declarations: [ReasonLmwComponent,User,Edit],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule,MatDialogModule
    
  ],
  entryComponents:[User,Edit],
  
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
]
})
export class ReasonLmwModule { }
