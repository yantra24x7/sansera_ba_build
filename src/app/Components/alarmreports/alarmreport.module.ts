import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DatePipe } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

import { AlarmreportsComponent } from './alarmreports.component';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
const routes: Routes = [{ path: '', component: AlarmreportsComponent }];

@NgModule({
  declarations: [AlarmreportsComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule,HighchartsChartModule,SatNativeDateModule,SatDatepickerModule
  ],
  providers: [
    DatePipe
  ]
})
export class AlarmReportModule { }
