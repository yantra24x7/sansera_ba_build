import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ComparechartRoutingModule } from './comparechart-routing.module';
import { ComparechartComponent } from './comparechart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DatePipe } from '@angular/common';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';


const routes: Routes = [{ path: '', component: ComparechartComponent }];


@NgModule({
  declarations: [ComparechartComponent],
  imports: [RouterModule.forChild(routes),SatDatepickerModule, SatNativeDateModule,
    CommonModule, SharedModule, HighchartsChartModule,
    ComparechartRoutingModule,
    NgCircleProgressModule.forRoot({
      backgroundOpacity: 1,
      backgroundStrokeWidth: 15,
      "responsive": true,
      space: -17,
      maxPercent: 100,
      outerStrokeWidth: 15,
      innerStrokeWidth: 15,
      "subtitle": [
        ""
      ],
    })
  ],
  providers: [
    DatePipe
  ]
})
export class ComparechartModule { }
