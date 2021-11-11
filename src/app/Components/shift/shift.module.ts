import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShiftComponent,Add } from './shift.component';
import { SharedModule} from '../shared/shared.module';
import { DatePipe } from '@angular/common';

const routes: Routes = [{ path: '',component: ShiftComponent }];

@NgModule({
  declarations: [ShiftComponent,Add],
  imports: [RouterModule.forChild(routes),
  CommonModule,SharedModule,
  ],
  providers: [
    DatePipe,
  ],
  entryComponents:[Add]
})
export class ShiftModule { }
