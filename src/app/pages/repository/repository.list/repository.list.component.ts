/**
 * @author songxiwen
 * @date 2020/10/13 13:33
 */

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import type { EntityCompletelyListItemType } from 'metagraph-constant';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RepositoryApiService } from '../../../api.service';

@Component({
  selector: 'metagraph-repository-list',
  templateUrl: './repository.list.component.html',
  styleUrls: ['./repository.list.component.scss']
})
export class RepositoryListComponent implements OnInit {
  repositoryList: EntityCompletelyListItemType[] = [];

  isLoading = false;

  pageSize = 20;

  pageIndex = 1;

  total = 0;

  repositoryFilterForm = this.formBuilder.group({
    type: [''],
    name: ['']
  });

  constructor(
    private readonly repositoryApiService: RepositoryApiService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly modalService: NzModalService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
  }

  async setKitListByKitFilterForm(): Promise<void> {
    await this.router.navigate(['/pages/repository/repositoryList'], {
      queryParams: {
        page: 1
      }
    });
    await this.setRepositoryList(1, 10, {
      type: this.repositoryFilterForm.value.type,
      name: this.repositoryFilterForm.value.name
    });
  }

  async cleanFilterFormThenRefresh(): Promise<void> {
    await this.repositoryFilterForm.reset();
    await this.router.navigate(['/pages/repository/repositoryList'], {
      queryParams: {
        page: 1
      }
    });
    await this.setRepositoryList(1, 10, {
      type: this.repositoryFilterForm.value.type
    });
  }

  async setRepositoryList(
    page = 1,
    pageSize = 10,
    filter?: {
      type?: 'public' | 'private';
      name?: string
    }
  ): Promise<void> {
    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
    this.pageIndex = page;
    const response = await this.repositoryApiService.getPageList({
      pageIndex: this.pageIndex - 1,
      pageSize,
      ...filter
    });
    if (response.data) {
      this.repositoryList = response.data.list;
      this.total = response.data.total;
    }
    this.isLoading = false;
    this.changeDetectorRef.detectChanges();
  }

  async handlePageIndexChange(page: number): Promise<void> {
    await this.router.navigate(['/pages/repository/repositoryList'], {
      queryParams: {
        page
      }
    });
    await this.setRepositoryList(page, 10, {
      type: this.repositoryFilterForm.value.type
    });
  }

  async openChangeKitStatusDialog(
    data: EntityCompletelyListItemType,
    status: boolean
  ): Promise<void> {
    const title = status ? '启用' : '停用';
    this.modalService.confirm({
      nzTitle: `确定要${title}该用户吗?`,
      nzOnOk: async () => {
      }
    });
  }

  async goUserDetailPage(item: EntityCompletelyListItemType) {
    await this.router.navigate(['/pages/repository/detail'], {
      queryParams: {
        repositoryEntityId: item.entity.id
      }
    });
  }

  async ngOnInit(): Promise<void> {
    await this.router.navigate(['/pages/repository/repositoryList'], {
      queryParams: {
        page: 1
      }
    });
    await this.setRepositoryList(1, 10, {
      type: this.repositoryFilterForm.value.type
    });
  }
}
