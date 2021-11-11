import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReportComponent, DialogOverviewDialog } from './report.component';
import { DatePipe } from '@angular/common';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
const routes: Routes = [{ path: '', component: ReportComponent }];

@NgModule({
  entryComponents: [ReportComponent, DialogOverviewDialog],
  declarations: [ReportComponent, DialogOverviewDialog],
  imports: [RouterModule.forChild(routes), SatDatepickerModule, SatNativeDateModule,
    CommonModule, SharedModule

  ],
  providers: [
    DatePipe,
  ]
})
export class ReportModule { }
