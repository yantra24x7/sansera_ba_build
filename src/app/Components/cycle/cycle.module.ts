import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CycleRoutingModule } from './cycle-routing.module';
import { CycleComponent } from './cycle.component';
import { DatePipe } from '@angular/common';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { HighchartsChartModule } from 'highcharts-angular';


const routes: Routes = [{ path: '', component: CycleComponent }];


@NgModule({
  declarations: [CycleComponent],
  imports: [
    CycleRoutingModule,
    RouterModule.forChild(routes), SatDatepickerModule, SatNativeDateModule,
    CommonModule, SharedModule,    HighchartsChartModule

  ],
  providers: [
    DatePipe,
  ]
})
export class CycleModule { }
