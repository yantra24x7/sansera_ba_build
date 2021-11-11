import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffReportRoutingModule } from './eff-report-routing.module';
import { EffReportComponent } from './eff-report.component';
import { SharedModule } from '../shared/shared.module';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [EffReportComponent],
  imports: [
    CommonModule,SharedModule,
    EffReportRoutingModule
  ],
  providers: [
    DatePipe, 
  ]
})
export class EffReportModule { }
