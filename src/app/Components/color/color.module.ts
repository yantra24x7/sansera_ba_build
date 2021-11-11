import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';

import { ColorRoutingModule } from './color-routing.module';
import { ColorComponent } from './color.component';


@NgModule({
  declarations: [ColorComponent],
  imports: [
    CommonModule,SharedModule,
    ColorRoutingModule
  ]
})
export class ColorModule { }
