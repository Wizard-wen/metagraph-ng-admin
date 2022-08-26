/**
 * @author songxiwen
 * @date  2022/2/21 17:24
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { EntityCompletelyListItemType } from 'metagraph-constant';
import { ApiPathEnum } from './config/api.enum';
import { PublicApiResponseType } from './config/api.type';

@Injectable({
  providedIn: 'root'
})
export class RepositoryApiService {
  constructor(private readonly http: HttpClient) {
  }

  async getPageList(requestBody: {
    pageIndex: number;
    pageSize: number;
    type?: 'public' | 'private';
    name?: string
  }): Promise<PublicApiResponseType<{
      list: EntityCompletelyListItemType[];
      total: number;
    }>> {
    return this.http
      .post<PublicApiResponseType<{
      list: EntityCompletelyListItemType[];
      total: number;
    }>>(ApiPathEnum.GetRepositoryPageList, requestBody)
      .toPromise();
  }

  async get(requestBody: {
    repositoryEntityId: string
  }): Promise<PublicApiResponseType<EntityCompletelyListItemType>> {
    return this.http
      .post<PublicApiResponseType<EntityCompletelyListItemType>>(
        ApiPathEnum.GetRepository, requestBody)
      .toPromise();
  }
}
