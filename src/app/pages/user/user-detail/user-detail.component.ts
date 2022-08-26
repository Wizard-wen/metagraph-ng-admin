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
  selector: 'metagraph-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userDetail?: {
    user: UserModelType,
    file: {
      total: number
    }
  };

  userId?: string;

  isLoading = false;

  constructor(
    private readonly userApiService: UserApiService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly modalService: NzModalService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
  }

  async goUserDetailPage(
    userId: string
  ): Promise<void> {
    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
    const response = await this.userApiService.getUserDetailById({
      userId
    });
    if (response.data) {
      this.userDetail = response.data;
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
        if (!this.userId) {
          return;
        }
        await this.userApiService.changeStatus({
          userId: this.userId,
          isForbidden: status
        });
        await this.goUserDetailPage(this.userId);
        // await this.route.queryParams.subscribe(async (queryParam: Params) => {
        // });
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(async (p: Params) => {
      if (p.id) {
        console.log(p.id); // 获取参数
        this.userId = p.id;
        await this.goUserDetailPage(p.id);
      }
    });
  }
}
