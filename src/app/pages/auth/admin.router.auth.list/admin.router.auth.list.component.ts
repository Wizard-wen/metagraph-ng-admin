/**
 * @author songxiwen
 * @date 2020/09/14 17:49
 */

import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminAuthService } from '../../../api.service';
import { AdminRouterAuthConfigComponent } from './admin.router.auth.config/admin.router.auth.config.component';
import { AdminRouterAuthType } from '../../../common/type';
import { AdminRouterOperationConfigComponent } from './admin.router.operation.config/admin.router.operation.config.component';

@Component({
  selector: 'metagraph-role-auth-list',
  templateUrl: './admin.router.auth.list.component.html',
  styleUrls: ['./admin.router.auth.list.component.scss']
})
export class AdminRouterAuthListComponent implements AfterViewInit {
  adminRouterList: AdminRouterAuthType[] = [];

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
    await this.router.navigate(['/pages/auth/adminRouterAuthList'], {
      queryParams: {
        page
      }
    });
    await this.setAdminRouterList(page, 10);
  }

  async openChangeAdminRouterAuthStatusDialog(
    data: AdminRouterAuthType,
    status: boolean
  ): Promise<void> {
    const title = status ? '启用' : '停用';
    this.modalService.confirm({
      nzTitle: `确定要${title}该路由权限吗？`,
      nzOnOk: async () => {
        if (!data.id) {
          return;
        }
        await this.adminAuthService.changeAdminRouterAuthStatusById({
          id: data.id,
          status
        });
        await this.route.queryParams.subscribe(async queryParam => {
          await this.setAdminRouterList(queryParam.page, 10);
        });
      }
    });
  }

  private async setAdminRouterList(page = 1, pageSize = 10): Promise<void> {
    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
    this.pageIndex = page;
    const response: {
      data: {
        list: AdminRouterAuthType[];
        total: number;
      };
      code: number;
    } = await this.adminAuthService.getAdminRouterAuthPageList({
      pageIndex: this.pageIndex - 1,
      pageSize
    });
    this.adminRouterList = response.data.list;
    this.total = response.data.total;
    this.isLoading = false;
    this.changeDetectorRef.detectChanges();
  }

  async openConfigAdminRouterOperationAuthDialog(
    data: AdminRouterAuthType
  ): Promise<void> {
    const modalReference = this.modalService.create({
      nzWidth: 750,
      nzTitle: 'Config Router Operation Auth',
      nzContent: AdminRouterOperationConfigComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        routeId: data.id,
        name: data.name,
        route: data.route
      }
    });
    await modalReference.afterClose.subscribe(async () => {
      await this.route.queryParams.subscribe(async queryParam => {
        await this.setAdminRouterList(queryParam.page, 10);
      });
    });
  }

  async openCreateOrUpdateAdminRouterAuthDialog(
    data?: AdminRouterAuthType
  ): Promise<void> {
    let title = '创建';
    if (data) {
      title = '编辑';
    }
    const modalReference = this.modalService.create({
      nzWidth: 750,
      nzTitle: `${title}路由权限`,
      nzContent: AdminRouterAuthConfigComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        id: data?.id
      }
    });
    await modalReference.afterClose.subscribe(async () => {
      await this.route.queryParams.subscribe(async queryParam => {
        await this.setAdminRouterList(queryParam.page, 10);
      });
    });
  }

  async ngAfterViewInit(): Promise<void> {
    await this.router.navigate(['/pages/auth/adminRouterAuthList'], {
      queryParams: {
        page: 1
      }
    });
    await this.setAdminRouterList(1, 10);
  }
}
