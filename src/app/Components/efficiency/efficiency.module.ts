import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EfficiencyRoutingModule } from './efficiency-routing.module';
import { EfficiencyComponent } from './efficiency.component';
import { SharedModule } from '../shared/shared.module';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [EfficiencyComponent],
  imports: [
    CommonModule,SharedModule,
    EfficiencyRoutingModule
  ],
  providers: [
    DatePipe, 
  ]
})
export class EfficiencyModule { }
 