import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { DashboardlineRoutingModule } from './dashboardline-routing.module';
import { DashboardlineComponent,Dialog, Dialogs } from './dashboardline.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HighchartsChartModule } from 'highcharts-angular';

const routes: Routes = [{ path: '', component: DashboardlineComponent }];

@NgModule({
  declarations: [DashboardlineComponent,Dialog,Dialogs],
  imports: [
    CommonModule,RouterModule.forChild(routes),
    DashboardlineRoutingModule, SharedModule,HighchartsChartModule,
    NgCircleProgressModule.forRoot({
      radius: 35,
      backgroundOpacity: 1,
      // backgroundStrokeWidth: 15,
      // "responsive": false,
      //space: -17,
      //maxPercent: 100,
      //outerStrokeWidth: 15,
     // innerStrokeWidth: 15,

    //  "showTitle": true,
    //  "showSubtitle": false,
      backgroundStrokeWidth: 0,
      backgroundPadding: 0,
     // "responsive": true,
      space: -8,
      toFixed: 0,
      maxPercent: 100,
      outerStrokeWidth: 8,
      outerStrokeLinecap: "square",
      innerStrokeWidth: 8,
      imageHeight: 20,
      imageWidth: 20,
      // lazy: true,



      "subtitle": [
        ""
      ],
    })
  ],
  entryComponents:[Dialog,Dialogs]

})
export class DashboardlineModule { }

