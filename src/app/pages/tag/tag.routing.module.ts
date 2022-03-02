/**
 * @author songxiwen
 * @date 2020/10/19 14:24
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../common/guard/auth.guard';
import { TagComponent } from './tag.component';
import { TagListComponent } from './tag.list/tag.list.component';

const routes: Routes = [
  {
    path: '',
    component: TagComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tagList',
        component: TagListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule {}
