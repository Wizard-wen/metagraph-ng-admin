/**
 * @author songxiwen
 * @date 2020/09/14 17:49
 */

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { AuthComponent } from './auth.component';
import { AdminRouterAuthListComponent } from './admin.router.auth.list/admin.router.auth.list.component';
import { AuthRoutingModule } from './auth.routing.module';
import { AdminRouterAuthConfigComponent } from './admin.router.auth.list/admin.router.auth.config/admin.router.auth.config.component';
import { AdminAPIAuthListComponent } from './admin.api.auth.list/admin.api.auth.list.component';
import { AdminAPIAuthConfigComponent } from './admin.api.auth.list/admin.api.auth.config/admin.api.auth.config.component';
import { AdminRoleListComponent } from './admin.role.list/admin.role.list.component';
import { AdminRoleConfigDialogComponent } from './admin.role.list/admin.role.config.dialog/admin.role.config.dialog.component';
import { AdminRoleConfigComponent } from './admin.role.config/admin.role.config.component';
import { AdminRouterOperationConfigComponent } from './admin.router.auth.list/admin.router.operation.config/admin.router.operation.config.component';
import { AdminRoleOperationConfigComponent } from './admin.role.config/admin.role.operation.config/admin.role.operation.config.component';
import { AdminListComponent } from './admin.list/admin.list.component';
import { AdminConfigComponent } from './admin.config/admin.config.component';

const nzModules = [
  NzTableModule,
  NzSpaceModule,
  NzSpinModule,
  NzIconModule,
  NzButtonModule,
  NzFormModule,
  NzInputModule,
  NzSwitchModule,
  NzSelectModule,
  NzModalModule,
  NzInputNumberModule,
  NzTreeModule,
  NzCardModule,
  NzListModule,
  NzTransferModule,
  NzPopconfirmModule,
  NzDescriptionsModule,
  NzGridModule,
  NzTagModule
];

@NgModule({
  declarations: [
    AuthComponent,
    AdminRouterAuthListComponent,
    AdminRouterAuthConfigComponent,
    AdminAPIAuthListComponent,
    AdminAPIAuthConfigComponent,
    AdminRoleListComponent,
    AdminRoleConfigDialogComponent,
    AdminRoleConfigComponent,
    AdminRouterOperationConfigComponent,
    AdminRoleOperationConfigComponent,
    AdminListComponent,
    AdminConfigComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AuthRoutingModule,
    ...nzModules
  ]
})
export class AuthModule {}
