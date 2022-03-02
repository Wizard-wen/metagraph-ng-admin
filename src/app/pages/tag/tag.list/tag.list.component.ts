/**
 * @author songxiwen
 * @date 2020/10/13 13:33
 */

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomainModelType, TagModelType, UserModelType } from 'metagraph-constant';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TagApiService, UserApiService } from '../../../api.service';
import { DomainAddModalComponent } from '../../domain/domain.add.modal/domain.add.modal.component';
import { TagAddModalComponent } from '../tag.add.modal/tag.add.modal.component';

@Component({
  selector: 'metagraph-tag-list',
  templateUrl: './tag.list.component.html',
  styleUrls: ['./tag.list.component.scss']
})
export class TagListComponent implements OnInit {
  kitList: (TagModelType & { usage: number })[] = [];

  isLoading = false;

  pageSize = 20;

  pageIndex = 1;

  total = 0;

  kitFilterForm = this.formBuilder.group({
    name: ['']
  });

  constructor(
    private readonly tagApiService: TagApiService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly modalService: NzModalService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
  }

  async addTag(item?: TagModelType) {
    let title = '创建';
    if (item) {
      title = '编辑';
    }
    const modalReference = this.modalService.create({
      nzWidth: 750,
      nzTitle: `${title}标签`,
      nzContent: TagAddModalComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        id: item?.id
      }
    });

    await modalReference.afterClose.subscribe(async () => {
      await this.route.queryParams.subscribe(async (queryParam: Params) => {
        await this.setKitList(1, 10, {
          name: this.kitFilterForm.value.name
        });
      });
    });
  }

  async setKitListByKitFilterForm(): Promise<void> {
    await this.router.navigate(['/pages/tag/tagList'], {
      queryParams: {
        page: 1
      }
    });
    await this.setKitList(1, 10, {
      name: this.kitFilterForm.value.name
    });
  }

  async cleanFilterFormThenRefresh(): Promise<void> {
    await this.kitFilterForm.reset();
    await this.router.navigate(['/pages/tag/tagList'], {
      queryParams: {
        page: 1
      }
    });
    await this.setKitList(1, 10, {
      name: this.kitFilterForm.value.name
    });
  }

  async setKitList(
    page = 1,
    pageSize = 10,
    filter?: {
      name?: string;
    }
  ): Promise<void> {
    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
    this.pageIndex = page;
    const response = await this.tagApiService.getPageList({
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
    await this.router.navigate(['/pages/tag/tagList'], {
      queryParams: {
        page
      }
    });
    await this.setKitList(page, 10, {
      name: this.kitFilterForm.value.name
    });
  }

  async openChangeKitStatusDialog(
    data: TagModelType,
    status: boolean
  ): Promise<void> {
    const title = status ? '启用' : '停用';
    this.modalService.confirm({
      nzTitle: `确定要${title}该用户吗?`,
      nzOnOk: async () => {
        await this.route.queryParams.subscribe(async (queryParam: Params) => {
          await this.tagApiService.changeStatus({
            id: data.id,
            status
          });
          await this.setKitList(queryParam.page, 10, {
            name: this.kitFilterForm.value.name
          });
        });
      }
    });
  }

  async ngOnInit(): Promise<void> {
    await this.setKitList(1, 10, {
      name: this.kitFilterForm.value.name
    });
  }
}
