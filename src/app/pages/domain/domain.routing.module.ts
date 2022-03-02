/**
 * @author songxiwen
 * @date 2020/10/19 14:24
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../common/guard/auth.guard';
import { DomainBaseTypeListComponent } from './domain.base.type.list/domain.base.type.list.component';
import { DomainComponent } from './domain.component';
import { DomainConfigComponent } from './domain.config/domain.config.component';

const routes: Routes = [
  {
    path: '',
    component: DomainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'domainBaseTypeList',
        component: DomainBaseTypeListComponent
      },
      {
        path: 'domainConfig',
        component: DomainConfigComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainRoutingModule {}
