/**
 * @author songxiwen
 * @date 2020/10/19 14:24
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../common/guard/auth.guard';
import { RepositoryDetailComponent } from './repository-detail/repository-detail.component';
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
      },
      {
        path: 'detail',
        component: RepositoryDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoryRoutingModule {}
