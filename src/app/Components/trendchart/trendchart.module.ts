import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TrendchartComponent } from './trendchart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DatePipe } from '@angular/common';

const routes: Routes = [{ path: '', component: TrendchartComponent }];


@NgModule({
  declarations: [TrendchartComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule, SharedModule, HighchartsChartModule

  ],
  providers: [
    DatePipe
  ]
})
export class TrendchartModule { }
