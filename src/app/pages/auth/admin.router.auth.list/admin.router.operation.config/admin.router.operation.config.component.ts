/**
 * @author songxiwen
 * @date 2020/09/23 17:02
 */

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminAuthService } from '../../../../api.service';
import { AdminRouterOperationAuthType } from '../../../../common/type';

@Component({
  selector: 'metagraph-router-operation-config-dialog',
  templateUrl: './admin.router.operation.config.component.html',
  styleUrls: ['./admin.router.operation.config.component.scss']
})
export class AdminRouterOperationConfigComponent implements OnInit {
  @Input()
  routeId?: string;

  @Input()
  name?: string;

  @Input()
  route?: string;

  adminRouterOperationAuthList: AdminRouterOperationAuthType[] = [];

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
      data: AdminRouterOperationAuthType[];
      code: number;
    } = await this.adminAuthService.getOperationAuthList({
      pageRouteId: this.routeId
    });
    this.adminRouterOperationAuthList = response.data;
  }

  addAdminRouterOperationItem(): void {
    if (!this.routeId) {
      return;
    }
    this.adminRouterOperationAuthList = [
      ...this.adminRouterOperationAuthList,
      {
        key: '',
        name: '',
        pageRouteId: this.routeId
      }
    ];
  }

  async changeAdminRouterOperationStatusAndRefreshList(
    data: AdminRouterOperationAuthType,
    status: boolean
  ): Promise<void> {
    if (data.id) {
      await this.adminAuthService.changeOperationAuthStatusById({
        id: data.id,
        status
      });
      await this.setAdminRouterOperationList();
    }
  }

  async saveAdminRouterOperationItemAndRefreshList(
    data: AdminRouterOperationAuthType
  ): Promise<void> {
    await this.adminAuthService.updateOperationAuth(data);
    await this.setAdminRouterOperationList();
  }

  async createAdminRouterOperationItemAndRefreshList(
    data: AdminRouterOperationAuthType
  ): Promise<void> {
    await this.adminAuthService.createOperationAuth(data);
    await this.setAdminRouterOperationList();
  }

  async ngOnInit(): Promise<void> {
    await this.setAdminRouterOperationList();
  }
}
