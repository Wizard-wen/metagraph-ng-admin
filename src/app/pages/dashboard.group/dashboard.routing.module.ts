/**
 * @author songxiwen
 * @date 2020/09/14 13:27
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGroupComponent } from './dashboard.group.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../../common/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardGroupComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
