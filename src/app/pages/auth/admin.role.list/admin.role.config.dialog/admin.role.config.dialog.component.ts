/**
 * @author songxiwen
 * @date 2020/09/14
 */

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminAuthService } from '../../../../api.service';

@Component({
  selector: 'metagraph-role-config-dialog',
  templateUrl: './admin.role.config.dialog.component.html',
  styleUrls: ['./admin.role.config.dialog.component.scss']
})
export class AdminRoleConfigDialogComponent implements OnInit {
  @Input()
  id?: string;

  @Input()
  name: string | undefined;

  adminRoleForm = this.formBuilder.group({
    name: ['', [Validators.required]]
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

  async submitAdminRoleFormThenCloseDialog(): Promise<void> {
    Object.keys(this.adminRoleForm.controls).forEach((item: string) => {
      this.adminRoleForm.controls[item].markAsDirty();
      this.adminRoleForm.controls[item].updateValueAndValidity();
    });
    const invalidFormItem = Object.keys(this.adminRoleForm.controls).find(
      (item: string) => this.adminRoleForm.controls[item].status === 'INVALID'
    );
    if (invalidFormItem) {
      this.messageService.create('error', 'Admin Role Form not fulled');
      return;
    }
    await this.createOrUpdateAdminRole();
    this.closeDialog();
  }

  private async createOrUpdateAdminRole() {
    let response: { code: number; message?: string };
    if (this.id) {
      response = await this.adminAuthService.updateAdminRole({
        ...this.adminRoleForm.value,
        id: this.id
      });
    } else {
      response = await this.adminAuthService.createAdminRole(
        this.adminRoleForm.value
      );
    }
    if (response.code === 0) {
      this.messageService.create('success', '编辑成功！');
    } else {
      this.messageService.create('error', response.message || '编辑时出错');
    }
  }

  async ngOnInit(): Promise<void> {
    this.adminRoleForm.patchValue({
      id: this.id,
      name: this.name
    });
  }
}
