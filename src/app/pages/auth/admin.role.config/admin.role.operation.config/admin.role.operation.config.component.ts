/**
 * @author songxiwen
 * @date 2020/09/23 16:54
 */

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminAuthService } from '../../../../api.service';
import { AdminRouterOperationAuthType } from '../../../../common/type';

@Component({
  selector: 'metagraph-role-operation-config-dialog',
  templateUrl: './admin.role.operation.config.component.html',
  styleUrls: ['./admin.role.operation.config.component.scss']
})
export class AdminRoleOperationConfigComponent implements OnInit {
  @Input()
  routerId: string | undefined;

  @Input()
  roleId: string | undefined;

  @Input()
  routerOperationList: string[] | undefined;

  adminOperationAuthList: AdminRouterOperationAuthType[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly modalReference: NzModalRef,
    private readonly messageService: NzMessageService,
    private readonly adminAuthService: AdminAuthService
  ) {}

  closeDialog(): void {
    this.modalReference.destroy();
  }

  async setAdminRouterOperationList(): Promise<void> {
    const response: {
      code: number;
      data: AdminRouterOperationAuthType[];
    } = await this.adminAuthService.getOperationAuthList({
      pageRouteId: this.routerId
    });
    this.adminOperationAuthList = response.data.map(
      (item: AdminRouterOperationAuthType) => ({
        ...item,
        isSelected: false
      })
    );
    this.generateOperationAuthSelectList();
  }

  private generateOperationAuthSelectList(): void {
    if (!this.routerOperationList) {
      return;
    }
    const routerOperationMap = this.routerOperationList.reduce(
      (previousValue: { [key: string]: string }, currentValue: string) => ({
        ...previousValue,
        [currentValue]: currentValue
      }),
      {}
    );
    this.adminOperationAuthList = this.adminOperationAuthList.map(
      (item: AdminRouterOperationAuthType) => {
        if (!item.id) {
          return item;
        }
        return {
          ...item,
          isSelected: !!routerOperationMap[item.id]
        };
      }
    );
  }

  async submitAdminRoleOperationThenCloseDialog(): Promise<void> {
    const operationList = this.adminOperationAuthList.reduce(
      (previousValue: string[], currentValue: AdminRouterOperationAuthType) => {
        if (currentValue.isSelected && currentValue.id) {
          return previousValue.concat(currentValue.id);
        }
        return previousValue;
      },
      []
    );
    if (!this.roleId || !this.routerId) {
      return;
    }
    const response: {
      code: number;
    } = await this.adminAuthService.updateRoleOperationAuth({
      roleId: this.roleId,
      routerId: this.routerId,
      operationList
    });
    if (response.code === 0) {
      this.closeDialog();
    }
  }

  async ngOnInit(): Promise<void> {
    await this.setAdminRouterOperationList();
  }
}
