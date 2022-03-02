/**
 * @author songxiwen
 * @date 2020/09/24 15:08
 */

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminItemType, AdminRoleItemType } from '../../../common/type';
import { AdminAuthService } from '../../../api.service';

@Component({
  selector: 'metagraph-admin-config',
  templateUrl: './admin.config.component.html',
  styleUrls: ['./admin.config.component.scss']
})
export class AdminConfigComponent implements OnInit {
  type = '';

  adminId = '';

  adminForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    isEnabled: [true, [Validators.required]],
    password: ['', [Validators.required]],
    roleList: [[], [Validators.required]]
  });

  adminRoleList: AdminRoleItemType[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly adminAuthService: AdminAuthService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly modalService: NzModalService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly messageService: NzMessageService
  ) {}

  private setTypeAndAdminId() {
    this.route.queryParams.subscribe(queryParam => {
      this.type = queryParam.type;
      this.adminId = queryParam.adminId || '';
    });
  }

  async goBack() {
    this.route.queryParams.subscribe(async queryParam => {
      await this.router.navigate(['/pages/auth/adminList'], {
        queryParams: {
          page: queryParam.page
        }
      });
    });
  }

  async setAdmin() {
    if (!this.adminId) {
      return;
    }
    const response: {
      data: AdminItemType;
      code: number;
    } = await this.adminAuthService.getAdminById({ id: this.adminId });
    this.adminForm.patchValue({
      name: response.data.name,
      isEnabled: response.data.isEnabled,
      password: response.data.password,
      roleList: response.data.roleList.map(item => item.id)
    });
  }

  async setAdminRoleList(): Promise<void> {
    const response: {
      data: AdminRoleItemType[];
      code: number;
    } = await this.adminAuthService.getAdminRoleList();
    this.adminRoleList = response.data.map(item => ({
      id: item.id,
      name: item.name
    }));
  }

  async submitAdminFormThenRefreshPage(): Promise<void> {
    Object.keys(this.adminForm.controls).forEach((item: string) => {
      this.adminForm.controls[item].markAsDirty();
      this.adminForm.controls[item].updateValueAndValidity();
    });
    const invalidFormItem = Object.keys(this.adminForm.controls).find(
      (item: string) => this.adminForm.controls[item].status === 'INVALID'
    );
    if (invalidFormItem) {
      this.messageService.create('error', '请补全表单');
      return;
    }
    let response: { code: number; message?: string };
    if (this.adminId) {
      response = await this.adminAuthService.updateAdmin({
        id: this.adminId,
        roleList: this.adminForm.value.roleList,
        name: this.adminForm.value.name,
        password: this.adminForm.value.password,
        isEnabled: this.adminForm.value.isEnabled
      });
    } else {
      response = await this.adminAuthService.createAdmin({
        roleList: this.adminForm.value.roleList,
        name: this.adminForm.value.name,
        password: this.adminForm.value.password,
        isEnabled: this.adminForm.value.isEnabled
      });
    }
    if (response.code === 0) {
      this.messageService.create('success', '编辑成功！');
    } else {
      this.messageService.create('error', response.message || '编辑时出错！');
    }
    await this.setAdmin();
  }

  async ngOnInit(): Promise<void> {
    await this.setTypeAndAdminId();
    await this.setAdminRoleList();
    await this.setAdmin();
  }
}
