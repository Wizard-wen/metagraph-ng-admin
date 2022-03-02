/**
 * @author songxiwen
 * @date 2020/10/19 14:24
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../common/guard/auth.guard';
import { RepositoryComponent } from './repository.component';
import { RepositoryListComponent } from './repository.list/repository.list.component';

const routes: Routes = [
  {
    path: '',
    component: RepositoryComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'repositoryList',
        component: RepositoryListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoryRoutingModule {}
