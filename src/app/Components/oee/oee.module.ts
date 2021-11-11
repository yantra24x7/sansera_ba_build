import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule} from '../shared/shared.module';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { OeeComponent,Add,} from './oee.component';

const routes: Routes = [{ path: '', component: OeeComponent }];

@NgModule({
  declarations: [OeeComponent,Add,],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule,
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
      "showUnits": true
    })
    
  ],
    entryComponents:[Add,]

})
export class OeeModule { }
