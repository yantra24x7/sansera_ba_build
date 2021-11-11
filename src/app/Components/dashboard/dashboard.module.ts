import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SharedModule} from '../shared/shared.module';
import { DashboardService} from '../../Service/app/dashboard.service';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgCircleProgressModule } from 'ng-circle-progress';

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  declarations: [DashboardComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule,
    HighchartsChartModule,
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
    providers:[DashboardService]
})
export class DashboardModule { 
  closeSideNav() {
    // if (this.drawer._mode=='over') {
    //   this.drawer.close();
    // }
  }

}
