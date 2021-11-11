import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule} from '../shared/shared.module';
import { UserManagementComponent,User } from './user-management.component';

const routes: Routes = [{ path: '', component: UserManagementComponent }];

@NgModule({
  declarations: [UserManagementComponent,User],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule,
  ],
   entryComponents:[User]
})
export class UserManagementModule { }
