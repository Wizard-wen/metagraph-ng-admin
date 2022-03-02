/**
 * @author songxiwen
 * @date 2020/10/13 13:33
 */

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainBaseTypeModelType } from 'metagraph-constant';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  DomainApiService
} from '../../../api.service';
import { PublicApiResponseType } from '../../../api.service/config/api.type';
import { DomainBaseTypeEditDialogComponent } from '../domain.base.type.edit.dialog/domain.base.type.edit.dialog.component';

@Component({
  selector: 'metagraph-domain-base-type-list',
  templateUrl: './domain.base.type.list.component.html',
  styleUrls: ['./domain.base.type.list.component.scss']
})
export class DomainBaseTypeListComponent implements OnInit {
  kitList: DomainBaseTypeModelType[] = [];

  isLoading = false;

  pageSize = 10;

  pageIndex = 1;

  total = 0;

  kitFilterForm = this.formBuilder.group({
    type: ['']
  });

  constructor(
    private readonly domainApiService: DomainApiService,
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
      type: this.kitFilterForm.value.type
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
    }
  ): Promise<void> {
    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
    this.pageIndex = page;
    const response: PublicApiResponseType<{
      list: DomainBaseTypeModelType[];
      total: number;
    }> = await this.domainApiService.getDomainBaseTypeList({
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
    data: DomainBaseTypeModelType,
    status: boolean
  ): Promise<void> {
    const title = status ? '启用' : '停用';
    this.modalService.confirm({
      nzTitle: `确定要${title}该基本领域类型吗?`,
      nzOnOk: async () => {
        await this.route.queryParams.subscribe(async (queryParam) => {
          await this.domainApiService.changeDomainBaseTypeStatus({
            id: data.id,
            isDeleted: status
          });
          await this.setKitList(queryParam.page, 10, {
            type: this.kitFilterForm.value.type
          });
        });
      }
    });
  }

  async goDomainConfigPage(params: DomainBaseTypeModelType) {
    await this.router.navigate(['/pages/domain/domainConfig'], {
      queryParams: {
        domainBaseTypeId: params.id
      }
    });
  }

  async openCreateOrEditKitDialog(data?: DomainBaseTypeModelType): Promise<void> {
    let title = '创建';
    if (data?.id) {
      title = '编辑';
    }
    const modalReference = this.modalService.create({
      nzWidth: 750,
      nzTitle: `${title}工具包`,
      nzContent: DomainBaseTypeEditDialogComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        id: data?.id || ''
      }
    });
    await modalReference.afterClose.subscribe(async () => {
      await this.route.queryParams.subscribe(async (queryParam) => {
        await this.setKitList(1, 10, {
          type: this.kitFilterForm.value.type
        });
      });
    });
  }

  async ngOnInit(): Promise<void> {
    await this.setKitList(1, 10, {
      type: this.kitFilterForm.value.type
    });
  }
}
