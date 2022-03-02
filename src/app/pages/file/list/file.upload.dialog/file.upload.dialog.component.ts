/**
 * @author songxiwen
 * @date 2020/09/14 17:30
 */

import { Component } from '@angular/core';
import * as qiniu from 'qiniu-js';
import { FileApiService } from '../../../../api.service';

@Component({
  selector: 'metagraph-file-upload',
  templateUrl: './file.upload.dialog.component.html',
  styleUrls: ['./file.upload.dialog.component.scss']
})
export class FileUploadDialogComponent {
  uploadingStatus = false;

  fileImageUrl?: string;

  tokenForUploading?: { fileKey: string; uploadToken: string };

  async customRequestUploadHandler(item: any) {
    const response = await this.fileService.getUploadToken();
    this.tokenForUploading = response.data;
    const componentThis = this;
    const observer = {
      complete(response: { fileUrl: string; mimeType: string }) {
        componentThis.fileImageUrl = response.fileUrl;
        componentThis.uploadingStatus = false;
      }
    };
    if (!this.tokenForUploading) {
      return;
    }
    await qiniu
      .upload(
        item.file,
        this.tokenForUploading.fileKey,
        this.tokenForUploading.uploadToken
      )
      .subscribe(observer);
  };

  constructor(private readonly fileService: FileApiService) {}

  handleUploadChange() {
    this.uploadingStatus = true;
  }
}
