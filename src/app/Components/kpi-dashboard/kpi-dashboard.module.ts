import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { KpiDashboardRoutingModule } from './kpi-dashboard-routing.module';
import { KpiDashboardComponent } from './kpi-dashboard.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [KpiDashboardComponent],
  imports: [CarouselModule,
    CommonModule,SharedModule,ScrollingModule,
    KpiDashboardRoutingModule,
    NgCircleProgressModule.forRoot({
      "radius": 50,
      "space": -12,
      "outerStrokeWidth": 12,
      "innerStrokeWidth": 12,
      "showSubtitle": true,
      "subtitle": 'OEE',
      
    })
  ]
})
export class KpiDashboardModule { }
