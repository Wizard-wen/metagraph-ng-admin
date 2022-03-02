/**
 * @author songxiwen
 * @date 2020/09/14
 */

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminAuthService } from '../../../../api.service';
import { AdminAPIAuthItemType } from '../../../../common/type';

@Component({
  selector: 'metagraph-api-auth-config-dialog',
  templateUrl: './admin.api.auth.config.component.html',
  styleUrls: ['./admin.api.auth.config.component.scss']
})
export class AdminAPIAuthConfigComponent implements OnInit {
  @Input()
  id?: string;

  @Input()
  name: string | undefined;

  @Input()
  router: string | undefined;

  adminAPIAuthList: AdminAPIAuthItemType[] = [];

  adminAPIAuthForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    router: ['', [Validators.required]]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly modalReference: NzModalRef,
    private readonly messageService: NzMessageService,
    private readonly adminAuthService: AdminAuthService
  ) {}

  closeDialog(): void {
    this.modalReference.destroy();
  }

  async submitAdminAPIAuthForm(): Promise<void> {
    Object.keys(this.adminAPIAuthForm.controls).forEach((item: string) => {
      this.adminAPIAuthForm.controls[item].markAsDirty();
      this.adminAPIAuthForm.controls[item].updateValueAndValidity();
    });
    const invalidFormItem = Object.keys(this.adminAPIAuthForm.controls).find(
      (item: string) =>
        this.adminAPIAuthForm.controls[item].status === 'INVALID'
    );
    if (invalidFormItem) {
      this.messageService.create('error', '请补全表单！');
      return;
    }
    let response: { code: number; message?: string };
    if (this.id) {
      response = await this.adminAuthService.updateAdminAPIAuth({
        ...this.adminAPIAuthForm.value,
        id: this.id
      });
    } else {
      response = await this.adminAuthService.createAdminAPIAuth(
        this.adminAPIAuthForm.value
      );
    }
    if (response.code === 0) {
      this.messageService.create('success', '编辑成功');
    } else {
      this.messageService.create('error', response.message || '编辑时出错');
    }
    this.closeDialog();
  }

  async setAdminAPIAuthList(): Promise<void> {
    const response: {
      data: AdminAPIAuthItemType[];
      code: number;
    } = await this.adminAuthService.getAdminAPIAuthList();
    this.adminAPIAuthList = response.data;
  }

  async ngOnInit(): Promise<void> {
    this.adminAPIAuthForm.patchValue({
      id: this.id ? this.id : '',
      name: this.name,
      router: this.router
    });
    await this.setAdminAPIAuthList();
  }
}
