/**
 * @author songxiwen
 * @date 2020/10/19 14:24
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../common/guard/auth.guard';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserComponent } from './user.component';
import { UserListComponent } from './user.list/user.list.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'userList',
        component: UserListComponent
      },
      {
        path: 'userDetail',
        component: UserDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
