import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  DomainModelType,
  DomainTreeNodeResponseType
} from 'metagraph-constant';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { DomainApiService } from '../../../api.service';
import { DomainAddModalComponent } from '../domain.add.modal/domain.add.modal.component';

@Component({
  selector: 'metagraph-domain-config',
  templateUrl: './domain.config.component.html',
  styleUrls: ['./domain.config.component.scss']
})
export class DomainConfigComponent implements OnInit {
  domainBaseTypeId?: string;

  domainTree?: DomainTreeNodeResponseType[];

  defaultCheckedKeys: string[] | undefined;

  constructor(
    private readonly domainApiService: DomainApiService,
    private readonly modalService: NzModalService,
    private readonly route: ActivatedRoute
  ) {
  }

  async getDomainTree() {

  }

  async handleTreeNodeClickEvent(event: NzFormatEmitEvent) {

  }

  async addChildDomain(params?: DomainModelType, isEdit?: boolean) {
    let title = '创建';
    if (isEdit) {
      title = '编辑';
    }

    let parentName = '';
    if (params) {
      parentName = params?.name;
    } else {
      parentName = '顶层领域';
    }
    const modalReference = this.modalService.create({
      nzWidth: 750,
      nzTitle: `${title}领域`,
      nzContent: DomainAddModalComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        type: isEdit ? 'edit' : 'create',
        domainId: params?.id,
        domain: params,
        domainBaseTypeId: params?.domainBaseTypeId ?? this.domainBaseTypeId,
        parentId: params?.id,
        parentName
      }
    });

    await modalReference.afterClose.subscribe(async () => {
      await this.route.queryParams.subscribe(async (queryParam: Params) => {
        if (queryParam.domainBaseTypeId) {
          this.domainBaseTypeId = queryParam.domainBaseTypeId;
          await this.getDetail(queryParam.domainBaseTypeId);
        }
      });
    });
  }

  async getDetail(domainBaseTypeId: string) {
    const result = await this.domainApiService.getDomainTree({
      domainBaseTypeId
    });
    if (result.data) {
      this.domainTree = result.data;
    }
  }

  async remove(item?: DomainModelType) {
    if (!item?.id) {
      return;
    }
    this.modalService.confirm({
      nzTitle: '确定要删除这个领域吗?',
      nzOnOk: async () => {
        await this.domainApiService.removeDomain({ domainId: item.id });
        if (this.domainBaseTypeId) {
          await this.getDetail(this.domainBaseTypeId);
        }
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(async (p: Params) => {
      if (p.domainBaseTypeId) {
        console.log(p.domainBaseTypeId); // 获取参数
        this.domainBaseTypeId = p.domainBaseTypeId;
        await this.getDetail(p.domainBaseTypeId);
        // this.hasContent= true;
      }
    });
  }
}
