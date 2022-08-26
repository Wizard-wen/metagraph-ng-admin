/**
 * @author songxiwen
 * @date 2020/10/19 14:09
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzDescriptionsModule, NzInputNumberModule, NzPageHeaderModule } from 'ng-zorro-antd';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { RepositoryDetailComponent } from './repository-detail/repository-detail.component';
import { RepositoryRoutingModule } from './repository.routing.module';
import { RepositoryComponent } from './repository.component';
import { RepositoryListComponent } from './repository.list/repository.list.component';

const nzModules = [
  NzTableModule,
  NzButtonModule,
  NzSpaceModule,
  NzSpinModule,
  NzModalModule,
  NzFormModule,
  NzInputModule,
  NzTagModule,
  NzCardModule,
  NzTreeModule,
  NzIconModule,
  NzGridModule,
  NzSelectModule,
  NzDividerModule,
  NzUploadModule
];

@NgModule({
  imports: [
    RepositoryRoutingModule,
    ...nzModules,
    CommonModule,
    ReactiveFormsModule,
    NzInputNumberModule,
    NzPageHeaderModule,
    NzDescriptionsModule
  ],
  declarations: [
    RepositoryComponent,
    RepositoryDetailComponent,
    RepositoryListComponent
  ]
})
export class RepositoryModule {
}
