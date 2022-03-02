/**
 * @author songxiwen
 * @date 2020/09/14 17:49
 */

import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminAuthService, AuthService } from '../../../api.service';
import { AdminItemType } from '../../../common/type';

@Component({
  selector: 'metagraph-admin-list',
  templateUrl: './admin.list.component.html',
  styleUrls: ['./admin.list.component.scss']
})
export class AdminListComponent implements AfterViewInit {
  operationMap = new Set<string>();

  adminList: AdminItemType[] = [];

  isLoading = false;

  pageIndex = 1;

  pageSize = 10;

  total = 0;

  constructor(
    private readonly adminAuthService: AdminAuthService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly modalService: NzModalService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService
  ) {}

  async handlePageIndexChange(page: number): Promise<void> {
    await this.router.navigate(['/pages/auth/adminList'], {
      queryParams: {
        page
      }
    });
    await this.setAdminList(page, 10);
  }

  async navigateToConfigAdminPage(data: AdminItemType): Promise<void> {
    await this.navigateToAdminConfigPageByType('config', data.id);
  }

  async navigateToCreateAdminPage(): Promise<void> {
    await this.navigateToAdminConfigPageByType('create');
  }

  private async navigateToAdminConfigPageByType(
    type: string,
    adminId = ''
  ): Promise<void> {
    await this.route.queryParams.subscribe(async queryParam => {
      await this.router.navigate(['/pages/auth/adminConfig'], {
        queryParams: {
          type,
          adminId,
          page: queryParam.page
        }
      });
    });
  }

  private async setAdminList(page = 1, pageSize = 10): Promise<void> {
    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
    this.pageIndex = page;
    const response: {
      data: {
        list: AdminItemType[];
        total: number;
      };
      code: number;
    } = await this.adminAuthService.getAdminPageList({
      pageIndex: this.pageIndex - 1,
      pageSize
    });
    this.adminList = response.data.list;
    this.total = response.data.total;
    this.isLoading = false;
    this.changeDetectorRef.detectChanges();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.router.navigate(['/pages/auth/adminList'], {
      queryParams: {
        page: 1
      }
    });
    await this.setAdminList(1, 10);
    const list = this.authService.getOperationByRouter(this.router.url);
    if (list !== undefined) {
      list.forEach((item: { id: string; name: string; key: string }) => {
        this.operationMap.add(item.key);
      });
    }
  }
}
