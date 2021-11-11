import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule,SharedModule,
    ChartRoutingModule,
    NgCircleProgressModule.forRoot({
      "backgroundColor": "#212226",
      backgroundOpacity: 1,
      "backgroundStroke": "#212226",
      backgroundStrokeWidth: 18,
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
})
export class ChartModule { }
