/**
 * @author songxiwen
 * @date 2020/10/13 13:33
 */

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import type { ApiTesterModelType, RequestApiModelType } from 'metagraph-constant';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiTesterApiService, RequestApiService } from '../../../api.service';
import { AddApiTesterModalComponent } from '../add.api.tester.modal/add.api.tester.modal.component';
import { AddRequestApiParamModalComponent } from '../add.request.api.param.modal/add.request.api.param.modal.component';

@Component({
  selector: 'metagraph-api-tester-list',
  templateUrl: './api.tester.list.component.html',
  styleUrls: ['./api.tester.list.component.scss']
})
export class ApiTesterListComponent implements OnInit {
  kitList: ApiTesterModelType[] = [];

  isLoading = false;

  pageSize = 10;

  pageIndex = 1;

  total = 0;

  kitFilterForm = this.formBuilder.group({
    type: ['']
  });

  constructor(
    private readonly apiTesterApiService: ApiTesterApiService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly modalService: NzModalService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
  }

  async setKitListByKitFilterForm(): Promise<void> {
    await this.router.navigate(['/pages/requestApi/requestApiList'], {
      queryParams: {
        page: 1
      }
    });
    await this.setKitList(1, 10, {
      type: this.kitFilterForm.value.type
    });
  }

  async cleanFilterFormThenRefresh(): Promise<void> {
    await this.kitFilterForm.reset();
    await this.router.navigate(['/pages/requestApi/requestApiList'], {
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
      type?: 'user' | 'admin';
    }
  ): Promise<void> {
    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
    this.pageIndex = page;
    const response = await this.apiTesterApiService.getPageList({
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
    await this.router.navigate(['/pages/requestApi/apiTesterList'], {
      queryParams: {
        page
      }
    });
    await this.setKitList(page, 10, {
      type: this.kitFilterForm.value.type
    });
  }

  // async openChangeKitStatusDialog(
  //   data: UserModelType,
  //   status: boolean
  // ): Promise<void> {
  //   const title = status ? '启用' : '停用';
  //   this.modalService.confirm({
  //     nzTitle: `确定要${title}该用户吗?`,
  //     nzOnOk: async () => {
  //       await this.route.queryParams.subscribe(async (queryParam: Params) => {
  //         await this.apiTesterApiService.changeStatus({
  //           userId: data.id,
  //           isForbidden: status
  //         });
  //         await this.setKitList(queryParam.page, 10, {
  //           type: this.kitFilterForm.value.type
  //         });
  //       });
  //     }
  //   });
  // }

  async goCreatePage() {
    const title = '创建';
    const modalReference = this.modalService.create({
      nzWidth: 750,
      nzTitle: `${title}接口测试人员`,
      nzContent: AddApiTesterModalComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {}
    });
    await modalReference.afterClose.subscribe(async () => {
      await this.route.queryParams.subscribe(async (queryParam) => {
        // todo
      });
    });
  }

  async goUserDetailPage(item: ApiTesterModelType) {
    await this.router.navigate(['/pages/requestApi/requestApiEdit'], {
      queryParams: {
        type: 'edit',
        id: item.id
      }
    });
  }

  async ngOnInit(): Promise<void> {
    await this.setKitList(1, 10, {
      type: this.kitFilterForm.value.type
    });
  }
}
