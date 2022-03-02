/**
 * @author songxiwen
 * @date 2020/10/19 15:56
 */

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomainBaseTypeModelType } from 'metagraph-constant';
import { NzModalRef } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DomainApiService, TagApiService } from '../../../api.service';
import { PublicApiResponseType } from '../../../api.service/config/api.type';

@Component({
  selector: 'metagraph-tag-add-modal',
  templateUrl: './tag.add.modal.component.html',
  styleUrls: ['./tag.add.modal.component.scss']
})
export class TagAddModalComponent implements OnInit {
  @Input()
  id?: string;

  kitForm = this.formBuilder.group({
    name: ['', [Validators.required]]
  });

  constructor(
    private readonly tagApiService: TagApiService,
    private readonly formBuilder: FormBuilder,
    private readonly modalReference: NzModalRef,
    private readonly messageService: NzMessageService
  ) {
  }

  closeDialog(): void {
    this.modalReference.destroy();
  }

  async submitKitFormThenCloseDialog(): Promise<void> {
    Object.keys(this.kitForm.controls)
      .forEach((item: string) => {
        this.kitForm.controls[item].markAsDirty();
        this.kitForm.controls[item].updateValueAndValidity();
      });
    const invalidFormItem = Object.keys(this.kitForm.controls)
      .find(
        (item: string) => this.kitForm.controls[item].status === 'INVALID'
      );
    if (invalidFormItem) {
      this.messageService.create('error', '请补全表单');
      return;
    }
    await this.createOrUpdateKit();
    this.closeDialog();
  }

  private async createOrUpdateKit() {
    const response = await this.tagApiService.create({
      ...this.kitForm.getRawValue()
    });
    if (response.code === 0) {
      this.messageService.create('success', '创建成功！');
    } else {
      this.messageService.create('error', response.message || '创建时出错');
    }
  }

  private async updateKit() {
    if (!this.id) {
      return;
    }
    const response = await this.tagApiService.update({
      ...this.kitForm.getRawValue(),
      id: this.id
    });
    if (response.code === 0) {
      this.messageService.create('success', '编辑成功！');
    } else {
      this.messageService.create('error', response.message || '编辑时出错');
    }
  }

  async getTag() {
    if (!this.id) {
      return;
    }
    const response = await this.tagApiService.getById({
      id: this.id
    });
    if (response.data) {
      this.kitForm.patchValue({
        name: response.data.name
      });
    }
  }

  async ngOnInit(): Promise<void> {
    await this.getTag();
  }
}
