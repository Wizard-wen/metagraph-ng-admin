/**
 * @author songxiwen
 * @date 2020/10/19 14:09
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule, NzDescriptionsModule, NzInputNumberModule } from 'ng-zorro-antd';
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
import { NgxJsonViewModule } from 'ng-json-view';
import { AddApiTesterModalComponent } from './add.api.tester.modal/add.api.tester.modal.component';
import { AddRequestApiParamModalComponent } from './add.request.api.param.modal/add.request.api.param.modal.component';
import { AddRequestApiTestDataModalComponent } from './add.request.api.test.data.modal/add.request.api.test.data.modal.component';
import { ApiTesterListComponent } from './api.tester.list/api.tester.list.component';
import { RequestApiEditComponent } from './request.api.edit/request.api.edit.component';
import { RequestApiListComponent } from './request.api.list/request.api.list.component';
import { RequestApiRoutingModule } from './request.api.routing.module';
import { RequestApiComponent } from './request.api.component';

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
  NzDatePickerModule
];

@NgModule({
  imports: [
    RequestApiRoutingModule,
    ...nzModules,
    CommonModule,
    ReactiveFormsModule,
    NzInputNumberModule,
    NgxJsonViewModule,
    NzDescriptionsModule,
    FormsModule
  ],
  declarations: [
    RequestApiComponent,
    RequestApiListComponent,
    RequestApiEditComponent,
    AddRequestApiParamModalComponent,
    AddRequestApiTestDataModalComponent,
    ApiTesterListComponent,
    AddApiTesterModalComponent
  ]
})
export class RequestApiModule {
}
