/**
 * @author songxiwen
 * @date 2020/09/14 17:30
 */

import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import type { FileModelType } from 'metagraph-constant';
import { FileApiService } from '../../../../api.service';

@Component({
  selector: 'metagraph-file-preview',
  templateUrl: './file.preview.dialog.component.html',
  styleUrls: ['./file.preview.dialog.component.scss']
})
export class FilePreviewDialogComponent implements OnInit {
  @Input()
  id: string | undefined;

  file: FileModelType | undefined;

  isLoading = false;

  constructor(
    private readonly fileService: FileApiService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    if (!this.id) {
      return;
    }
    const result = await this.fileService.getFileById({ id: this.id });
    if (result.data) {
      this.file = result.data;
    }
  }
}
