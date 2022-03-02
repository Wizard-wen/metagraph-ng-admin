/**
 * @author songxiwen
 * @date 2020/09/14 15:51
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { DashboardGroupComponent } from './dashboard.group.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';

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
  NzUploadModule,
  NzPopconfirmModule,
  NzMessageModule,
  NzInputNumberModule,
  NzStatisticModule
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ...nzModules,
    CommonModule,
    // RouterModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardGroupComponent, DashboardComponent]
})
export class DashboardModule {}
