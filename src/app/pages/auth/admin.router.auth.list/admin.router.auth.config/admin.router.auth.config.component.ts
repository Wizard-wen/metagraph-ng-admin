/**
 * @author songxiwen
 * @date 2020/09/14
 */

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminAuthService } from '../../../../api.service';
import { AdminRouterAuthType } from '../../../../common/type';

@Component({
  selector: 'metagraph-router-auth-config-dialog',
  templateUrl: './admin.router.auth.config.component.html',
  styleUrls: ['./admin.router.auth.config.component.scss']
})
export class AdminRouterAuthConfigComponent implements OnInit {
  @Input()
  id: string | undefined;

  adminRouterAuthList: AdminRouterAuthType[] = [];

  iconList = ['file-image', 'user', 'tool', 'setting', 'folder', 'area-chart'];

  adminRouterAuthForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    weight: [0, [Validators.required]],
    parentId: [''],
    route: ['', [Validators.required]],
    iconClass: [''],
    isShow: [false, [Validators.required]],
    isRouteURL: [false, [Validators.required]],
    isMenu: [false, [Validators.required]],
    description: ['']
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

  async submitAdminRouterAuthFormThenCloseDialog(): Promise<void> {
    Object.keys(this.adminRouterAuthForm.controls).forEach((item: string) => {
      this.adminRouterAuthForm.controls[item].markAsDirty();
      this.adminRouterAuthForm.controls[item].updateValueAndValidity();
    });
    const invalidFormItem = Object.keys(this.adminRouterAuthForm.controls).find(
      (item: string) =>
        this.adminRouterAuthForm.controls[item].status === 'INVALID'
    );
    if (invalidFormItem) {
      this.messageService.create('error', 'Admin Router Form not fulled');
      return;
    }
    await this.createOrUpdateAdminRouterAuth();
    this.closeDialog();
  }

  private async createOrUpdateAdminRouterAuth() {
    let response: { code: number; message?: string };
    if (this.id) {
      response = await this.adminAuthService.updateAdminRouterAuth({
        ...this.adminRouterAuthForm.value,
        id: this.id
      });
    } else {
      response = await this.adminAuthService.createAdminRouterAuth(
        this.adminRouterAuthForm.value
      );
    }
    if (response.code === 0) {
      this.messageService.create('success', '编辑成功');
    } else {
      this.messageService.create('error', response.message || '编辑时出错');
    }
  }

  private async setAdminRouterAuthList(): Promise<void> {
    const response: {
      data: AdminRouterAuthType[];
      code: number;
    } = await this.adminAuthService.getAdminRouterAuthList();
    this.adminRouterAuthList = response.data;
  }

  private async setAdminRouterAuthForm() {
    if (!this.id) {
      return;
    }
    const response: {
      code: number;
      data: AdminRouterAuthType;
    } = await this.adminAuthService.getAdminRouterAuthById({ id: this.id });
    if (response.code === 0) {
      this.adminRouterAuthForm.setValue({
        name: response.data.name,
        weight: response.data.weight,
        parentId: response.data.parentId,
        route: response.data.route,
        iconClass: response.data.iconClass,
        isShow: response.data.isShow,
        isRouteURL: response.data.isRouteURL,
        isMenu: response.data.isMenu,
        description: response.data.description
      });
    }
  }

  async ngOnInit(): Promise<void> {
    await this.setAdminRouterAuthForm();
    await this.setAdminRouterAuthList();
  }
}
