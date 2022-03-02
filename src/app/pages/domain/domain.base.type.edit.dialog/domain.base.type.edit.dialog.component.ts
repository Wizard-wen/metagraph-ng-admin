/**
 * @author songxiwen
 * @date 2020/10/19 15:56
 */

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomainBaseTypeModelType } from 'metagraph-constant';
import { NzModalRef } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DomainApiService } from '../../../api.service';
import { PublicApiResponseType } from '../../../api.service/config/api.type';

@Component({
  selector: 'metagraph-domain-base-type-config',
  templateUrl: './domain.base.type.edit.dialog.component.html',
  styleUrls: ['./domain.base.type.edit.dialog.component.scss']
})
export class DomainBaseTypeEditDialogComponent implements OnInit {
  @Input()
  id: string | undefined;

  kitForm = this.formBuilder.group({
    name: ['', [Validators.required]]
  });

  constructor(
    private readonly domainApiService: DomainApiService,
    private readonly formBuilder: FormBuilder,
    private readonly modalReference: NzModalRef,
    private readonly messageService: NzMessageService
  ) {}

  closeDialog(): void {
    this.modalReference.destroy();
  }

  async submitKitFormThenCloseDialog(): Promise<void> {
    Object.keys(this.kitForm.controls).forEach((item: string) => {
      this.kitForm.controls[item].markAsDirty();
      this.kitForm.controls[item].updateValueAndValidity();
    });
    const invalidFormItem = Object.keys(this.kitForm.controls).find(
      (item: string) => this.kitForm.controls[item].status === 'INVALID'
    );
    if (invalidFormItem) {
      this.messageService.create('error', '请补全表单');
      return;
    }
    await this.createOrUpdateKit();
    this.closeDialog();
  }

  async setKitFormById(): Promise<void> {
    if (!this.id) {
      return;
    }
    const response: PublicApiResponseType<DomainBaseTypeModelType> = await this.domainApiService.getDomainBaseTypeById({ id: this.id });
    if (response.data) {
      this.kitForm.setValue({
        name: response.data.name
      });
    } else {
      this.messageService.create('error', response.message || '数据请求时出错');
    }
  }

  private async createOrUpdateKit() {
    let response: { code: number; message?: string };
    const document = {
      name: this.kitForm.value.name || ''
    };
    if (this.id) {
      response = await this.domainApiService.updateDomainBaseType({
        id: this.id,
        ...document
      });
    } else {
      response = await this.domainApiService.createDomainBaseType(document);
    }
    if (response.code === 0) {
      this.messageService.create('success', '编辑成功！');
    } else {
      this.messageService.create('error', response.message || '编辑时出错');
    }
  }

  handleOriginalCoverIconChange(event: any) {
    this.kitForm.patchValue({
      originalCover: event
    });
  }

  async ngOnInit(): Promise<void> {
    await this.setKitFormById();
  }
}
