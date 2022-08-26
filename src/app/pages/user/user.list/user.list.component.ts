/**
 * @author songxiwen
 * @date 2020/10/13 13:33
 */

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserModelType } from 'metagraph-constant';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserApiService } from '../../../api.service';

@Component({
  selector: 'metagraph-user-list',
  templateUrl: './user.list.component.html',
  styleUrls: ['./user.list.component.scss']
})
export class UserListComponent implements OnInit {
  kitList: UserModelType[] = [];

  isLoading = false;

  pageSize = 10;

  pageIndex = 1;

  total = 0;

  kitFilterForm = this.formBuilder.group({
    type: [''],
    name: ['']
  });

  constructor(
    private readonly userApiService: UserApiService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly modalService: NzModalService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
  }

  async setKitListByKitFilterForm(): Promise<void> {
    await this.router.navigate(['/pages/user/userList'], {
      queryParams: {
        page: 1
      }
    });
    await this.setKitList(1, 10, {
      type: this.kitFilterForm.value.type,
      name: this.kitFilterForm.value.name
    });
  }

  async cleanFilterFormThenRefresh(): Promise<void> {
    await this.kitFilterForm.reset();
    await this.router.navigate(['/pages/user/userList'], {
      queryParams: {
        page: 1
      }
    });
    await this.setKitList(1, 10, {
      type: this.kitFilterForm.value.type
    });
  }

  async setKitList(
    page = 1,
    pageSize = 10,
    filter?: {
      type?: string;
      name?: string
    }
  ): Promise<void> {
    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
    this.pageIndex = page;
    const response = await this.userApiService.getUserPageList({
      pageIndex: this.pageIndex - 1,
      pageSize,
      ...filter
    });
    if (response.data) {
      this.kitList = response.data.list;
      this.total = response.data.total;
    }
    this.isLoading = false;
    this.changeDetectorRef.detectChanges();
  }

  async handlePageIndexChange(page: number): Promise<void> {
    await this.router.navigate(['/pages/user/userList'], {
      queryParams: {
        page
      }
    });
    await this.setKitList(page, 10, {
      type: this.kitFilterForm.value.type
    });
  }

  async openChangeKitStatusDialog(
    data: UserModelType,
    status: boolean
  ): Promise<void> {
    const title = status ? '启用' : '停用';
    this.modalService.confirm({
      nzTitle: `确定要${title}该用户吗?`,
      nzOnOk: async () => {
        await this.route.queryParams.subscribe(async (queryParam: Params) => {
          await this.userApiService.changeStatus({
            userId: data.id,
            isForbidden: status
          });
          await this.setKitList(queryParam.page, 10, {
            type: this.kitFilterForm.value.type
          });
        });
      }
    });
  }

  async goUserDetailPage(item: UserModelType) {
    await this.router.navigate(['/pages/user/userDetail'], {
      queryParams: {
        id: item.id
      }
    });
  }

  async ngOnInit(): Promise<void> {
    await this.router.navigate(['/pages/user/userList'], {
      queryParams: {
        page: 1
      }
    });
    await this.setKitList(1, 10, {
      type: this.kitFilterForm.value.type
    });
  }
}
