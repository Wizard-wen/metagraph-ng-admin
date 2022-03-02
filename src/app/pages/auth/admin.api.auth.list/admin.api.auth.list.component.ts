/**
 * @author songxiwen
 * @date 2020/09/14 17:49
 */

import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminAuthService } from '../../../api.service';
import { AdminAPIAuthConfigComponent } from './admin.api.auth.config/admin.api.auth.config.component';
import { AdminAPIAuthItemType } from '../../../common/type';

@Component({
  selector: 'metagraph-auth-list',
  templateUrl: './admin.api.auth.list.component.html',
  styleUrls: ['./admin.api.auth.list.component.scss']
})
export class AdminAPIAuthListComponent implements AfterViewInit {
  adminAPIAuthList: AdminAPIAuthItemType[] = [];

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
    await this.router.navigate(['/pages/auth/adminAPIAuthList'], {
      queryParams: {
        page
      }
    });
    await this.setAdminAPIList(page, 10);
  }

  async openChangeAdminAPIAuthStatusConfirm(
    data: AdminAPIAuthItemType,
    status: boolean
  ): Promise<void> {
    const title = status ? '启用' : '停用';
    this.modalService.confirm({
      nzTitle: `确定要${title}该接口权限吗?`,
      nzOnOk: async () => {
        if (!data.id) {
          return;
        }
        await this.adminAuthService.changeAdminAPIAuthStatusById({
          id: data.id,
          status
        });
        await this.route.queryParams.subscribe(async queryParam => {
          await this.setAdminAPIList(queryParam.page, 10);
        });
      }
    });
  }

  private async setAdminAPIList(page = 1, pageSize = 10): Promise<void> {
    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
    this.pageIndex = page;
    const response: {
      data: {
        list: AdminAPIAuthItemType[];
        total: number;
      };
      code: number;
    } = await this.adminAuthService.getAdminAPIAuthPageList({
      pageIndex: this.pageIndex - 1,
      pageSize
    });
    this.adminAPIAuthList = response.data.list;
    this.total = response.data.total;
    this.isLoading = false;
    this.changeDetectorRef.detectChanges();
  }

  async openCreateOrUpdateAdminAPIAuthDialog(data?: {
    id: string;
    name: string;
    route: string;
  }): Promise<void> {
    let title = '创建';
    if (data) {
      title = '编辑';
    }
    const modalReference = this.modalService.create({
      nzWidth: 750,
      nzTitle: `${title}接口权限`,
      nzContent: AdminAPIAuthConfigComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        id: data?.id,
        name: data?.name,
        router: data?.route
      }
    });
    await modalReference.afterClose.subscribe(async () => {
      await this.route.queryParams.subscribe(async queryParam => {
        await this.setAdminAPIList(queryParam.page, 10);
      });
    });
  }

  async ngAfterViewInit(): Promise<void> {
    await this.router.navigate(['/pages/auth/adminAPIAuthList'], {
      queryParams: {
        page: 1
      }
    });
    await this.setAdminAPIList(1, 10);
  }
}
