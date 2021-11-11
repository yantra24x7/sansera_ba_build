import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SdashboardRoutingModule } from './sdashboard-routing.module';
import { SdashboardComponent,Add } from './sdashboard.component';

import { SharedModule} from '../shared/shared.module';
import { DashboardService} from '../../Service/app/dashboard.service';
import { HighchartsChartModule } from 'highcharts-angular';
@NgModule({
  declarations: [SdashboardComponent,Add],
  imports: [
    CommonModule,SharedModule,
    HighchartsChartModule,
    SdashboardRoutingModule
  ],
  providers:[DashboardService],
  entryComponents:[Add]


})
export class SdashboardModule { }
