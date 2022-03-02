/**
 * @author songxiwen
 * @date 2020/09/14 13:22
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../common/guard/auth.guard';
import { FileComponent } from './file.component';
import { FileListComponent } from './list/file.list.component';

const routes: Routes = [
  {
    path: '',
    component: FileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'list',
        component: FileListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileRoutingModule {}
