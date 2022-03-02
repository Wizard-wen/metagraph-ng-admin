/**
 * @author songxiwen
 * @date 2020/09/14 17:49
 */

import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { TransferChange, TransferItem } from 'ng-zorro-antd/transfer';
import { AdminAuthService } from '../../../api.service';
import {
  AdminAPIAuthItemType,
  AdminRoleItemType,
  AdminRouterAuthTreeNodeItemType
} from '../../../common/type';
import { AdminRoleOperationConfigComponent } from './admin.role.operation.config/admin.role.operation.config.component';

@Component({
  selector: 'metagraph-role-config',
  templateUrl: './admin.role.config.component.html',
  styleUrls: ['./admin.role.config.component.scss']
})
export class AdminRoleConfigComponent implements AfterViewInit {
  adminRouterTree: NzTreeNodeOptions[] = [];

  defaultCheckedKeys: string[] | undefined;

  adminAPIAuthList: TransferItem[] = [];

  roleId = '';

  adminRole: AdminRoleItemType | undefined;

  adminRoleAPIMap: { [key: string]: string } = {};

  isLoading = false;

  constructor(
    private readonly adminAuthService: AdminAuthService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly modalService: NzModalService,
    private readonly route: ActivatedRoute
  ) {}

  private getCheckedRouterIdList(
    adminRouterTree: NzTreeNodeOptions[]
  ): string[] {
    return adminRouterTree.reduce(
      (previousValue: string[], currentValue: NzTreeNodeOptions) => {
        if (currentValue.children) {
          const list = this.getCheckedRouterIdList(currentValue.children);
          return previousValue.concat(list);
        }
        if (currentValue.checked) {
          return previousValue.concat(currentValue.key);
        }
        return previousValue;
      },
      []
    );
  }

  private async requestAndSetAdminRoleTree(): Promise<void> {
    const response: {
      data: AdminRouterAuthTreeNodeItemType[];
      code: number;
    } = await this.adminAuthService.getAdminRouterTree();
    this.adminRouterTree = this.generateAdminRouterUITree(response.data);
    this.changeDetectorRef.detectChanges();
    this.defaultCheckedKeys = this.adminRole?.routeList || [];
  }

  private async setAdminRoleAPIAuthList() {
    const response: {
      data: AdminAPIAuthItemType[];
      code: number;
    } = await this.adminAuthService.getAdminAPIAuthList();
    this.adminAPIAuthList = response.data.map((item: AdminAPIAuthItemType) => {
      const adminAPIAuthItem = {
        ...item,
        router: item.route,
        key: item.id,
        title: item.name,
        checked: false
      };
      if (item.id && this.adminRoleAPIMap[item.id]) {
        return {
          ...adminAPIAuthItem,
          direction: 'right'
        };
      }
      return {
        ...adminAPIAuthItem,
        direction: 'left'
      };
    });
  }

  async changeAdminAPIStatusThenRefreshPage(
    transfer: TransferChange
  ): Promise<void> {
    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
    const apiList = transfer.list.map((item: TransferItem) => item.id);
    this.setRoleId();
    await this.adminAuthService.updateAPIAuthOfRole({
      id: this.roleId,
      apiList,
      type: transfer.from === 'left' ? 'add' : 'remove'
    });
    await this.requestAndSetAdminRole();
    await this.setAdminRoleAPIAuthList();
    this.isLoading = false;
    this.changeDetectorRef.detectChanges();
  }

  async updateRouterAuthOfRoleThenRefreshPage() {
    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
    const checkedRouterIdList = this.getCheckedRouterIdList(
      this.adminRouterTree
    );
    await this.adminAuthService.updateRouterAuthOfRole({
      id: this.roleId,
      routeList: checkedRouterIdList
    });
    await this.requestAndSetAdminRole();
    await this.requestAndSetAdminRoleTree();
    this.isLoading = false;
    this.changeDetectorRef.detectChanges();
  }

  private setRoleId() {
    this.route.queryParams.subscribe(queryParam => {
      this.roleId = queryParam.roleId;
    });
  }

  private generateAdminRouterUITree(
    adminRouterTreeNodes: AdminRouterAuthTreeNodeItemType[]
  ): NzTreeNodeOptions[] {
    // 递归转换格式，暂时没想好怎么标记类型
    return adminRouterTreeNodes.map((item: any) => {
      if (item.children) {
        return {
          ...item,
          title: item.name,
          key: item.id,
          children: this.generateAdminRouterUITree(item.children)
        };
      }
      return {
        ...item,
        title: item.name,
        key: item.id,
        isLeaf: true
      };
    });
  }

  async handleTreeNodeClickEvent(event: NzFormatEmitEvent) {
    if (event.node?.origin.isRouterURL) {
      let operationList: string[] = [];
      if (
        this.adminRole?.operation &&
        this.adminRole.operation[event.node.origin.key]
      ) {
        operationList = this.adminRole.operation[event.node.origin.key];
      }
      if (!this.adminRole) {
        return;
      }
      const modalReference = this.modalService.create({
        nzWidth: 750,
        nzTitle: '编辑操作权限',
        nzContent: AdminRoleOperationConfigComponent,
        nzMaskClosable: false,
        nzClosable: false,
        nzComponentParams: {
          roleId: this.adminRole.id,
          routerId: event.node.origin.key,
          routerOperationList: operationList
        }
      });
      await modalReference.afterClose.subscribe(async () => {
        await this.requestAndSetAdminRole();
      });
    }
  }

  private async requestAndSetAdminRole() {
    const response: {
      data: AdminRoleItemType;
      code: number;
    } = await this.adminAuthService.getAdminRoleById({ id: this.roleId });
    this.adminRole = response.data;
    if (this.adminRole.apiList) {
      this.adminRoleAPIMap = this.adminRole.apiList.reduce(
        (previousValue: { [key: string]: string }, currentValue: string) => ({
          ...previousValue,
          [currentValue]: currentValue
        }),
        {}
      );
    }
  }

  async ngAfterViewInit(): Promise<void> {
    this.setRoleId();
    await this.requestAndSetAdminRole();
    await this.setAdminRoleAPIAuthList();
    await this.requestAndSetAdminRoleTree();
  }
}
