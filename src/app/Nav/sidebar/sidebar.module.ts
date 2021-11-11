import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule} from '../../Components/shared/shared.module';

// const routes: Routes = [{ path: '', component: SidebarComponent }];


@NgModule({
  declarations: [],
  imports: [
    // RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    // MatToolbarModule
    
  ]
})
export class SidebarModule { }
