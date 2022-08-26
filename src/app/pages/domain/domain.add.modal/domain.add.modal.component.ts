/**
 * @author songxiwen
 * @date 2020/10/19 15:56
 */

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomainBaseTypeModelType, DomainModelType } from 'metagraph-constant';
import { NzModalRef } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DomainApiService } from '../../../api.service';
import { PublicApiResponseType } from '../../../api.service/config/api.type';

@Component({
  selector: 'metagraph-domain-config',
  templateUrl: './domain.add.modal.component.html',
  styleUrls: ['./domain.add.modal.component.scss']
})
export class DomainAddModalComponent implements OnInit {
  @Input()
  parentId?: string;

  @Input()
  parentName!: string;

  @Input()
  domainBaseTypeId!: string;

  @Input()
  domainId?: string;

  @Input()
  domain?: DomainModelType;

  @Input()
  type!: 'edit' | 'create';

  kitForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    code: ['', [Validators.required]]
  });

  constructor(
    private readonly domainApiService: DomainApiService,
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
    if (this.type === 'edit') {
      await this.updateKit();
    } else {
      await this.createKit();
    }

    this.closeDialog();
  }

  private async createKit() {
    const response = await this.domainApiService.createDomain({
      parentId: this.parentId,
      domainBaseTypeId: this.domainBaseTypeId,
      ...this.kitForm.getRawValue()
    });
    if (response.code === 0) {
      this.messageService.create('success', '创建成功！');
    } else {
      this.messageService.create('error', response.message || '创建时出错');
    }
  }

  private async updateKit() {
    if (!this.domainId) {
      return;
    }
    const response = await this.domainApiService.updateDomain({
      domainId: this.domainId,
      ...this.kitForm.getRawValue()
    });
    if (response.code === 0) {
      this.messageService.create('success', '编辑成功！');
    } else {
      this.messageService.create('error', response.message || '编辑时出错');
    }
  }

  async ngOnInit(): Promise<void> {
    if (this.domainId && this.domain && this.type === 'edit') {
      this.kitForm.patchValue({
        name: this.domain.name,
        description: this.domain.description,
        code: this.domain.code
      });
    }
  }
}
