/**
 * @author songxiwen
 * @date 2020/09/14 13:10
 */

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../common/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivateChild: [AuthGuard],
    children: [

      {
        path: 'file',
        loadChildren: () =>
          import('./file/file.module').then(module => module.FileModule)
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then(module => module.AuthModule)
      },
      {
        path: 'dashboardGroup',
        loadChildren: () =>
          import('./dashboard.group/dashboard.module').then(
            module => module.DashboardModule
          )
      },
      {
        path: 'domain',
        loadChildren: () =>
          import('./domain/domain.module').then(
            module => module.DomainModule
          )
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then(module => module.UserModule)
      },
      {
        path: 'tag',
        loadChildren: () =>
          import('./tag/tag.module').then(module => module.TagModule)
      },
      {
        path: 'repository',
        loadChildren: () =>
          import('./repository/repository.module').then(module => module.RepositoryModule)
      },
      {
        path: 'requestApi',
        loadChildren: () =>
          import('./request.api/request.api.module').then(module => module.RequestApiModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
