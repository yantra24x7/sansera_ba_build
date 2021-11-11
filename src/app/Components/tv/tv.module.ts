import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';

import { TvRoutingModule } from './tv-routing.module';
import { TvComponent } from './tv.component';
import { CountUpModule } from 'ngx-countup';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DashboardService} from '../../Service/app/dashboard.service';

@NgModule({

declarations: [TvComponent],
imports: [    TvRoutingModule,
  CommonModule,SharedModule,
  CountUpModule,HighchartsChartModule,
  NgCircleProgressModule.forRoot({
    "backgroundColor": "#0e121b",
    backgroundOpacity: 1,
    "backgroundStroke": "#0e121b",
    backgroundStrokeWidth: 12,
    backgroundPadding: 0,
    radius: 36,
    space: -17,
    "subtitle": [
      "OEE"
    ],
    "titleFontSize": "30",
    "subtitleFontSize": "20",
    "subtitleFontWeight": "800",
"titleFontWeight": "500",
"titleColor": "#ffffff",
    toFixed: 0,
    maxPercent: 100,
    outerStrokeWidth: 17,
    innerStrokeWidth: 17,
    "showSubtitle": true,
    "showUnits": false
  })

],
providers:[DashboardService]

})

export class TvModule { }
