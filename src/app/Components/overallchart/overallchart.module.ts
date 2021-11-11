import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HighchartsChartModule } from 'highcharts-angular';
// import { OverallchartRoutingModule } from './overallchart-routing.module';
import { OverallchartComponent } from './overallchart.component';
import { DatePipe } from '@angular/common';

const routes: Routes = [{ path: '', component: OverallchartComponent }];

@NgModule({
  declarations: [OverallchartComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule, SharedModule,
   HighchartsChartModule
  ],
  providers: [
    DatePipe
  ]
})
export class OverallchartModule { }
