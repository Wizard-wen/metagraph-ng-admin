/**
 * @author songxiwen
 * @date 2020/09/14 13:22
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../common/guard/auth.guard';
import { AdminRouterAuthListComponent } from './admin.router.auth.list/admin.router.auth.list.component';
import { AdminAPIAuthListComponent } from './admin.api.auth.list/admin.api.auth.list.component';
import { AdminRoleListComponent } from './admin.role.list/admin.role.list.component';
import { AdminRoleConfigComponent } from './admin.role.config/admin.role.config.component';
import { AuthComponent } from './auth.component';
import { AdminListComponent } from './admin.list/admin.list.component';
import { AdminConfigComponent } from './admin.config/admin.config.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'adminRouterAuthList',
        component: AdminRouterAuthListComponent
      },
      {
        path: 'adminAPIAuthList',
        component: AdminAPIAuthListComponent
      },
      {
        path: 'adminRoleList',
        component: AdminRoleListComponent
      },
      {
        path: 'adminRoleConfig',
        component: AdminRoleConfigComponent
      },
      {
        path: 'adminList',
        component: AdminListComponent
      },
      {
        path: 'adminConfig',
        component: AdminConfigComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
