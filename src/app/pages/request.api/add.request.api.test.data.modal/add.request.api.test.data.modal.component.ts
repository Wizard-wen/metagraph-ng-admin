/**
 * @author songxiwen
 * @date 2020/10/19 15:56
 */

import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiTesterModelType, DomainBaseTypeModelType } from 'metagraph-constant';
import { NzModalRef } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiTesterApiService, DomainApiService, RequestApiService } from '../../../api.service';
import { PublicApiResponseType } from '../../../api.service/config/api.type';

@Component({
  selector: 'metagraph-domain-config',
  templateUrl: './add.request.api.test.data.modal.component.html',
  styleUrls: ['./add.request.api.test.data.modal.component.scss']
})
export class AddRequestApiTestDataModalComponent implements OnInit {
  @Input()
  params!: {
    key: string;
    required: boolean;
    fieldName: string;
    fieldType: 'string' | 'Date' | 'number' | 'array' | 'object'
  }[];

  @Input()
  path!: string;

  @Input()
  requestApiId!: string;

  @Input()
  isAuth!: boolean;

  @Input()
  role!: 'user' | 'admin';

  @Input()
  type!: 'post' | 'get' | 'put' | 'delete';

  accountId = '';

  // kitForm = this.formBuilder.group({
  //   json: ['', [Validators.required]]
  // });

  form = this.formBuilder.group({});

  baseUrl = 'http://localhost:7250';

  // isJSONData?: boolean;

  responseData: any;

  accountList: ApiTesterModelType[] = [];

  constructor(
    private readonly requestApiService: RequestApiService,
    private readonly apiTesterApiService: ApiTesterApiService,
    private readonly formBuilder: FormBuilder,
    private readonly http: HttpClient,
    private readonly modalReference: NzModalRef,
    private readonly messageService: NzMessageService
  ) {
  }

  closeDialog(): void {
    this.modalReference.destroy();
  }

  async getAccountList() {
    const result = await this.apiTesterApiService.getList({
      type: this.role
    });
    if (result.data) {
      this.accountList = result.data;
    }
  }

  async submitKitFormThenCloseDialog(): Promise<boolean> {
    Object.keys(this.form.controls)
      .forEach((item: string) => {
        this.form.controls[item].markAsDirty();
        this.form.controls[item].updateValueAndValidity();
      });
    const invalidFormItem = Object.keys(this.form.controls)
      .find(
        (item: string) => this.form.controls[item].status === 'INVALID'
      );
    if (invalidFormItem) {
      this.messageService.create('error', '请补全表单');
      return false;
    }
    return true;
  }

  async saveAsTestData() {
    const result = this.submitKitFormThenCloseDialog();
    if (!result) {
      return;
    }
    const response = await this.requestApiService.addTestData({
      requestApiId: this.requestApiId,
      data: this.form.getRawValue()
    });
    if (response.code === 0) {
      this.messageService.create('success', '编辑成功！');
    } else {
      this.messageService.create('error', response.message || '编辑时出错');
    }
  }

  async testApi() {
    const result = this.submitKitFormThenCloseDialog();
    if (!result) {
      return;
    }
    const response = await this.requestApiService.testApi({
      apiTesterId: this.accountId,
      testData: this.form.getRawValue(),
      requestApiId: this.requestApiId
    });
    if (response.data) {
      this.responseData = response.data;
      this.messageService.create('success', '编辑成功！');
    } else {
      this.messageService.create('error', response.message || '编辑时出错');
    }
  }

  test() {
    const js = JSON.stringify(this.form.getRawValue())
      .replace(/\n/g, '')
      .replace(/\r/g, '')
      .replace(/\s|\xA0/g, '');
    // this.isJSONData = this.isJSON(js);
  }

  isJSON(str: string): boolean {
    if (typeof str === 'string') {
      try {
        const js = str.replace(/\n/g, '')
          .replace(/\r/g, '')
          .replace(/\s|\xA0/g, '');
        const obj = JSON.parse(js);
        return !!(typeof obj === 'object' && obj);
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  async ngOnInit(): Promise<void> {
    this.params.forEach((item) => {
      let value;
      if (item.fieldType === 'string') {
        value = '';
      }
      if (item.fieldType === 'Date') {
        value = new Date();
      }
      if (item.fieldType === 'number') {
        value = 0;
      }
      if (item.fieldType === 'object' || item.fieldType === 'array') {
        value = '';
      }
      this.form.addControl(
        item.fieldName,
        this.formBuilder.control(value, item.required ? [Validators.required] : [])
      );
    });
    if (this.isAuth) {
      await this.getAccountList();
    }
  }
}
