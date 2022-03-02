/**
 * @author songxiwen
 * @date 2020/10/19 14:24
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../common/guard/auth.guard';
import { ApiTesterListComponent } from './api.tester.list/api.tester.list.component';
import { RequestApiComponent } from './request.api.component';
import { RequestApiEditComponent } from './request.api.edit/request.api.edit.component';
import { RequestApiListComponent } from './request.api.list/request.api.list.component';

const routes: Routes = [
  {
    path: '',
    component: RequestApiComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'requestApiList',
        component: RequestApiListComponent
      },
      {
        path: 'requestApiEdit',
        component: RequestApiEditComponent
      },
      {
        path: 'apiTesterList',
        component: ApiTesterListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestApiRoutingModule {
}
