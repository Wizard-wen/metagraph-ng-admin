/**
 * @author songxiwen
 * @date 2020/09/14 13:23
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
import { FileRoutingModule } from './file.routing.module';
import { FileComponent } from './file.component';
import { FileListComponent } from './list/file.list.component';
import { FileUploadDialogComponent } from './list/file.upload.dialog/file.upload.dialog.component';
import { FilePreviewDialogComponent } from './list/file.preview.dialog/file.preview.dialog.component';

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
  imports: [FileRoutingModule, ...nzModules, CommonModule, NgxJsonViewModule],
  declarations: [
    FileComponent,
    FileListComponent,
    FileUploadDialogComponent,
    FilePreviewDialogComponent
  ]
})
export class FileModule {}
