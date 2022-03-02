/**
 * @author songxiwen
 * @date 2020/09/14 17:49
 */

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminAuthService } from '../../../api.service';
import { AdminRoleConfigDialogComponent } from './admin.role.config.dialog/admin.role.config.dialog.component';
import { AdminRoleItemType } from '../../../common/type';

@Component({
  selector: 'metagraph-role-list',
  templateUrl: './admin.role.list.component.html',
  styleUrls: ['./admin.role.list.component.scss']
})
export class AdminRoleListComponent implements OnInit {
  adminRouterList: AdminRoleItemType[] = [];

  isLoading = false;

  pageIndex = 1;

  pageSize = 10;

  total = 0;

  constructor(
    private readonly adminAuthService: AdminAuthService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly modalService: NzModalService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  async handlePageIndexChange(page: number): Promise<void> {
    await this.router.navigate(['/pages/auth/adminRoleList'], {
      queryParams: {
        page
      }
    });
    await this.setAdminRoleList(page, 10);
  }

  async openChangeAdminRoleStatusDialog(
    data: AdminRoleItemType,
    status: boolean
  ) {
    const title = status ? '启用' : '停用';
    await this.modalService.confirm({
      nzTitle: `确定要${title}该角色吗？`,
      nzOnOk: async () => {
        if (!data.id) {
          return;
        }
        await this.adminAuthService.changeAdminRoleStatusById({
          id: data.id,
          status
        });
        await this.setAdminRoleList();
      }
    });
  }

  private async setAdminRoleList(page = 1, pageSize = 10): Promise<void> {
    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
    this.pageIndex = page;
    const response: {
      data: {
        list: AdminRoleItemType[];
        total: number;
      };
      code: number;
    } = await this.adminAuthService.getAdminRolePageList({
      pageIndex: this.pageIndex - 1,
      pageSize
    });
    this.adminRouterList = response.data.list;
    this.total = response.data.total;
    this.isLoading = false;
    this.changeDetectorRef.detectChanges();
  }

  async openCreateOrUpdateAdminRoleDialog(
    data?: AdminRoleItemType
  ): Promise<void> {
    let title = '创建';
    if (data) {
      title = '编辑';
    }
    const modalReference = this.modalService.create({
      nzWidth: 750,
      nzTitle: `${title}角色`,
      nzContent: AdminRoleConfigDialogComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        id: data?.id,
        name: data?.name
      }
    });
    await modalReference.afterClose.subscribe(async () => {
      await this.route.queryParams.subscribe(async queryParam => {
        await this.setAdminRoleList(queryParam.page, 10);
      });
    });
  }

  async navigateToConfigAdminRolePage(data: AdminRoleItemType): Promise<void> {
    await this.route.queryParams.subscribe(async queryParam => {
      await this.router.navigate(['/pages/auth/adminRoleConfig'], {
        queryParams: {
          roleId: data.id,
          page: queryParam.page
        }
      });
    });
  }

  async ngOnInit(): Promise<void> {
    await this.router.navigate(['/pages/auth/adminRoleList'], {
      queryParams: {
        page: 1
      }
    });
    await this.setAdminRoleList(1, 10);
  }
}
