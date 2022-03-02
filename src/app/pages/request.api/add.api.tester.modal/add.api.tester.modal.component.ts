/**
 * @author songxiwen
 * @date 2020/10/19 15:56
 */

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomainBaseTypeModelType } from 'metagraph-constant';
import { NzModalRef } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiTesterApiService, DomainApiService, RequestApiService } from '../../../api.service';
import { PublicApiResponseType } from '../../../api.service/config/api.type';

@Component({
  selector: 'metagraph-domain-config',
  templateUrl: './add.api.tester.modal.component.html',
  styleUrls: ['./add.api.tester.modal.component.scss']
})
export class AddApiTesterModalComponent implements OnInit {
  @Input()
  apiTesterId?: string;

  kitForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private readonly apiTesterApiService: ApiTesterApiService,
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
    if (this.apiTesterId) {
      await this.updateKit();
    } else {
      await this.createKit();
    }
    this.closeDialog();
  }

  private async createKit() {
    const response = await this.apiTesterApiService.create({
      ...this.kitForm.getRawValue()
    });
    if (response.code === 0) {
      this.messageService.create('success', '创建成功！');
    } else {
      this.messageService.create('error', response.message || '创建时出错');
    }
  }

  private async updateKit() {
    // if (!this.apiTesterId) {
    //   return;
    // }
    // const response = await this.apiTesterApiService.u({
    //   ...this.kitForm.getRawValue(),
    //   key: this.params.key,
    //   requestApiId: this.requestApiId
    // });
    // if (response.code === 0) {
    //   this.messageService.create('success', '编辑成功！');
    // } else {
    //   this.messageService.create('error', response.message || '编辑时出错');
    // }
  }

  async ngOnInit(): Promise<void> {
    if (this.apiTesterId) {
      // this.kitForm.patchValue({
      //   fieldName: this.params.fieldName,
      //   fieldType: this.params.fieldType,
      //   required: this.params.required,
      //   description: this.params.description
      // });
    }
  }
}
