import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule} from '../shared/shared.module';

import { LogdetailsComponent } from './logdetails.component';
import { LogService } from 'src/app/Service/app/loghistory.service';


const routes: Routes = [{ path: '', component: LogdetailsComponent }];
@NgModule({
  declarations: [LogdetailsComponent],
  imports: [
    CommonModule,SharedModule,
  RouterModule.forChild(routes),
  ],
  providers:[LogService]
})
export class LogdetailModule { }
