/**
 * @author songxiwen
 * @date 2020/09/14 17:33
 */

import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { FileResponseType } from 'metagraph-constant';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FileApiService } from '../../../api.service';
import { FilePreviewDialogComponent } from './file.preview.dialog/file.preview.dialog.component';
import { FileUploadDialogComponent } from './file.upload.dialog/file.upload.dialog.component';
import { FileItemType } from '../../../common/type';

@Component({
  selector: 'metagraph-file-list',
  templateUrl: './file.list.component.html',
  styleUrls: ['./file.list.component.scss']
})
export class FileListComponent implements AfterViewInit {
  fileList: FileResponseType[] = [];

  isLoading = false;

  pageSize = 10;

  pageIndex = 1;

  total = 0;

  totalSize: any;

  constructor(
    private readonly fileService: FileApiService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly modalService: NzModalService,
    private readonly messageService: NzMessageService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
  }

  async setFileList(): Promise<void> {
    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
    const response = await this.fileService.getFilePageList({
      pageIndex: this.pageIndex - 1,
      pageSize: this.pageSize
    });
    if (response.data) {
      this.fileList = response.data.list;
      this.total = response.data.total;
    }
    this.isLoading = false;
    this.changeDetectorRef.detectChanges();
  }

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  async handlePageIndexChange(page: number): Promise<void> {
    this.pageIndex = page;
    // await this.router.navigate(['/pages/file/fileList'], {
    //   queryParams: {
    //     page
    //   }
    // });
    await this.setFileList();
  }

  async openRemoveFileDialog(data: FileItemType): Promise<void> {
    this.modalService.confirm({
      nzTitle: '确定要删除这个文件吗?',
      nzOnOk: async () => {
        await this.fileService.removeFileById({ id: data.id });
        await this.setFileList();
      }
    });
  }

  openTestFileIsExistsDialog(data: FileItemType) {
    this.modalService.confirm({
      nzTitle: '测试这个文件?',
      nzOnOk: async () => {
        const result = await this.fileService.getFileStatusByKey({ key: data.key });
        let message = '';
        if (result.data?.deleted) {
          message = '文件已经被删除';
        } else {
          message = `文件存在，类型为${result.data?.mimeType}`;
        }
        this.messageService.create('info', message);
        await this.setFileList();
      }
    });
  }

  async openCreateFileDialog(): Promise<void> {
    const modalReference = this.modalService.create({
      nzWidth: 750,
      nzTitle: '上传文件',
      nzContent: FileUploadDialogComponent,
      nzMaskClosable: false,
      nzClosable: false
    });
    await modalReference.afterClose.subscribe(async () => {
      await this.setFileList();
    });
  }

  async openPreviewFileDialog(data: FileItemType): Promise<void> {
    const modalReference = this.modalService.create({
      nzWidth: 750,
      nzTitle: '预览文件',
      nzContent: FilePreviewDialogComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        id: data?.id || ''
      }
    });
    await modalReference.afterClose.subscribe(async () => {
      await this.setFileList();
    });
  }

  async getTotalSize() {
    const response = await this.fileService.getTotalSize();
    if (response.data) {
      this.totalSize = response.data.total;
    }
  }

  async ngAfterViewInit(): Promise<void> {
    this.pageIndex = 1;
    await this.setFileList();
    await this.getTotalSize();
  }
}
