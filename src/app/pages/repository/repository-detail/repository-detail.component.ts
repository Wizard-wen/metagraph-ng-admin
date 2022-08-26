/**
 * @author songxiwen
 * @date 2020/10/13 13:33
 */

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EntityCompletelyListItemType, RepositoryModelType } from 'metagraph-constant';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RepositoryApiService } from '../../../api.service';

@Component({
  selector: 'metagraph-repository-detail',
  templateUrl: './repository-detail.component.html',
  styleUrls: ['./repository-detail.component.scss']
})
export class RepositoryDetailComponent implements OnInit {
  repositoryDetail?: EntityCompletelyListItemType;

  repositoryModel?: RepositoryModelType;

  repositoryEntityId?: string;

  isLoading = false;

  constructor(
    private readonly repositoryApiService: RepositoryApiService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly modalService: NzModalService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
  }

  async changeRepositoryShareStatus() {

  }

  async goUserDetailPage(
    repositoryEntityId: string
  ): Promise<void> {
    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
    const response = await this.repositoryApiService.get({
      repositoryEntityId
    });
    if (response.data) {
      this.repositoryDetail = response.data;
      this.repositoryModel = response.data.content as RepositoryModelType;
    }
    this.isLoading = false;
    this.changeDetectorRef.detectChanges();
  }

  async changeUserStatus(
    status: boolean
  ): Promise<void> {
    const title = status ? '停用' : '启用';

    this.modalService.confirm({
      nzTitle: `确定要${title}该用户吗?`,
      nzOnOk: async () => {
        if (!this.repositoryEntityId) {
          return;
        }
        // await this.repositoryApiService.changeStatus({
        //   repositoryEntityId: this.repositoryEntityId,
        //   isForbidden: status
        // });
        await this.goUserDetailPage(this.repositoryEntityId);
        // await this.route.queryParams.subscribe(async (queryParam: Params) => {
        // });
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(async (p: Params) => {
      if (p.repositoryEntityId) {
        console.log(p.repositoryEntityId); // 获取参数
        this.repositoryEntityId = p.repositoryEntityId;
        await this.goUserDetailPage(p.repositoryEntityId);
      }
    });
  }
}
