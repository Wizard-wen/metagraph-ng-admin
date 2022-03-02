/**
 * @author songxiwen
 * @date 2020/10/19 14:09
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd';
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
import { DomainAddModalComponent } from './domain.add.modal/domain.add.modal.component';
import { DomainBaseTypeEditDialogComponent } from './domain.base.type.edit.dialog/domain.base.type.edit.dialog.component';
import { DomainBaseTypeListComponent } from './domain.base.type.list/domain.base.type.list.component';
import { DomainRoutingModule } from './domain.routing.module';
import { DomainComponent } from './domain.component';
import { DomainConfigComponent } from './domain.config/domain.config.component';

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
    DomainRoutingModule,
    ...nzModules,
    CommonModule,
    ReactiveFormsModule,
    NzInputNumberModule
  ],
  declarations: [
    DomainComponent,
    DomainConfigComponent,
    DomainBaseTypeListComponent,
    DomainBaseTypeEditDialogComponent,
    DomainAddModalComponent
  ]
})
export class DomainModule {
}
