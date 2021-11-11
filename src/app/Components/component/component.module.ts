import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ComponentRoutingModule } from './component-routing.module';
import { ComponentComponent,operator } from './component.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [ComponentComponent,operator],
  imports: [SharedModule,
    CommonModule,
    ComponentRoutingModule
  ],
  entryComponents: [operator],
  providers: [
    DatePipe,
  ],


})
export class ComponentModule { }
