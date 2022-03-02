/**
 * @author songxiwen
 * @date 2020/10/19 15:56
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestApiModelType } from 'metagraph-constant';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  FormBuilder, Validators
} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RequestApiService } from '../../../api.service';
import { PublicApiResponseType } from '../../../api.service/config/api.type';
import { AddRequestApiParamModalComponent } from '../add.request.api.param.modal/add.request.api.param.modal.component';
import { AddRequestApiTestDataModalComponent } from '../add.request.api.test.data.modal/add.request.api.test.data.modal.component';

@Component({
  selector: 'metagraph-request-api-edit',
  templateUrl: './request.api.edit.component.html',
  styleUrls: ['./request.api.edit.component.scss']
})
export class RequestApiEditComponent implements OnInit {
  kitForm = this.formBuilder.group({
    path: ['', [Validators.required]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    type: ['get', [Validators.required]],
    isAuth: [true, [Validators.required]],
    role: ['user', [Validators.required]]
  });

  requestApiParams: {
    key: string;
    required: boolean;
    fieldName: string;
    description: string;
    fieldType: 'string' | 'Date' | 'number' | 'array' | 'object'
  }[] = [];

  testData: { [key: string]: any }[] = [];

  requestApiId?: string;

  constructor(
    private readonly requestApiService: RequestApiService,
    private readonly formBuilder: FormBuilder,
    private readonly modalService: NzModalService,
    private readonly messageService: NzMessageService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
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
    if (this.requestApiId) {
      await this.updateKit();
    } else {
      await this.createKit();
    }
  }

  async goBack() {
    await this.router.navigate(['/pages/requestApi/requestApiList']);
  }

  private async createKit() {
    const response = await this.requestApiService.create(this.kitForm.getRawValue());
    if (response.code === 0) {
      this.messageService.create('success', '创建成功！');
    } else {
      this.messageService.create('error', response.message || '创建时出错');
    }
  }

  private async updateKit() {
    if (!this.requestApiId) {
      return;
    }
    const response = await this.requestApiService.update({
      requestApiId: this.requestApiId,
      ...this.kitForm.getRawValue()
    });
    if (response.code === 0) {
      this.messageService.create('success', '编辑成功！');
    } else {
      this.messageService.create('error', response.message || '编辑时出错');
    }
  }

  async addRequestApiField(item?: {
    key: string;
    required: boolean;
    description: string;
    fieldName: string;
    fieldType: 'string' | 'Date' | 'number' | 'array' | 'object'
  }) {
    let title = '创建';
    if (item) {
      title = '编辑';
    }
    const modalReference = this.modalService.create({
      nzWidth: 750,
      nzTitle: `${title}字段`,
      nzContent: AddRequestApiParamModalComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        requestApiId: this.requestApiId,
        params: item
      }
    });
    await modalReference.afterClose.subscribe(async () => {
      await this.route.queryParams.subscribe(async (queryParam) => {
        if (queryParam.id) {
          this.requestApiId = queryParam.id;
          await this.getDetail();
        }
      });
    });
  }

  removeRequestApi(item: {
    key: string;
    required: boolean;
    description: string;
    fieldName: string;
    fieldType: 'string' | 'Date' | 'number' | 'array' | 'object'
  }) {
    this.modalService.confirm({
      nzTitle: '确定要删除这个字段吗?',
      nzOnOk: async () => {
        if (!item.key || !this.requestApiId) {
          return;
        }
        await this.requestApiService.removeField({
          key: item.key,
          requestApiId: this.requestApiId
        });
        await this.route.queryParams.subscribe(async (queryParam) => {
          await this.getDetail();
        });
      }
    });
  }

  async testRequestApi() {
    const modalReference = this.modalService.create({
      nzWidth: 750,
      nzTitle: '测试接口',
      nzContent: AddRequestApiTestDataModalComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        requestApiId: this.requestApiId,
        path: this.kitForm.value.path,
        params: this.requestApiParams,
        type: this.kitForm.value.type,
        role: this.kitForm.value.role,
        isAuth: this.kitForm.value.isAuth
      }
    });
    await modalReference.afterClose.subscribe(async () => {
      await this.route.queryParams.subscribe(async (queryParam) => {
        if (queryParam.id) {
          this.requestApiId = queryParam.id;
          await this.getDetail();
        }
      });
    });
  }

  async getDetail() {
    if (!this.requestApiId) {
      return;
    }
    const response: PublicApiResponseType<RequestApiModelType> = await this.requestApiService.getById(this.requestApiId);
    if (!response.data) {
      return;
    }
    this.kitForm.patchValue({
      name: response.data.name,
      type: response.data.type,
      isAuth: response.data.isAuth,
      path: response.data.path,
      description: response.data.description,
      role: response.data.role
    });
    this.requestApiParams = response.data.params || [];
    this.testData = response.data.testData || [];
  }

  testApi() {

  }

  async ngOnInit(): Promise<void> {
    await this.route.queryParams.subscribe(async (queryParam) => {
      if (queryParam.id) {
        this.requestApiId = queryParam.id;
        await this.getDetail();
      }
    });
  }
}
