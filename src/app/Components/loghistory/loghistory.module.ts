import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule} from '../shared/shared.module';

import { LoghistoryComponent } from './loghistory.component';
import { LogService } from 'src/app/Service/app/loghistory.service';


const routes: Routes = [{ path: '', component: LoghistoryComponent }];
@NgModule({
  declarations: [LoghistoryComponent],
  imports: [
    CommonModule,SharedModule,
  RouterModule.forChild(routes),
  ],
  providers:[LogService],
  entryComponents:[]
})
export class LoghistoryModule { }
