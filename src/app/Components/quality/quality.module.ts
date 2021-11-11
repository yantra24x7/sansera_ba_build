import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DatePipe } from '@angular/common';

import { QualityRoutingModule } from './quality-routing.module';
import { QualityComponent,Add,Edit,Sedit,Sadd} from './quality.component';

const routes: Routes = [{ path: '', component: QualityComponent }];

@NgModule({
  declarations: [QualityComponent,Add,Edit,Sedit,Sadd],
  imports: [
    CommonModule,RouterModule.forChild(routes),
    QualityRoutingModule, SharedModule
  ],
  providers: [
    DatePipe,
  ],
  entryComponents:[Add,Edit,Sedit,Sadd]

})
export class QualityModule { }
