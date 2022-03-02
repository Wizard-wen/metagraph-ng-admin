import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomainBaseTypeModelType, TagModelType, UserModelType } from 'metagraph-constant';
import { ApiPathEnum } from './config/api.enum';
import { PublicApiResponseType } from './config/api.type';

/**
 * @author songxiwen
 * @date  2022/2/21 15:56
 */

@Injectable({
  providedIn: 'root'
})
export class TagApiService {
  constructor(private readonly http: HttpClient) {
  }

  async getPageList(requestBody: {
    pageIndex: number;
    pageSize: number;
    name?: string;
  }): Promise<PublicApiResponseType<{
      list: (TagModelType & { usage: number })[];
      total: number;
    }>> {
    return this.http
      .post<PublicApiResponseType<{
      list:(TagModelType & { usage: number })[];
      total: number;
    }>>(ApiPathEnum.GetTagPageList, requestBody)
      .toPromise();
  }

  async create(requestBody: { name: string }): Promise<PublicApiResponseType<TagModelType>> {
    return this.http
      .post<PublicApiResponseType<TagModelType>>(ApiPathEnum.CreateTag, requestBody)
      .toPromise();
  }

  async getById(requestBody: { id: string; }): Promise<PublicApiResponseType<TagModelType>> {
    return this.http
      .post<PublicApiResponseType<TagModelType>>(ApiPathEnum.GetTagById, requestBody)
      .toPromise();
  }

  async update(requestBody: { id: string; name: string }): Promise<PublicApiResponseType<void>> {
    return this.http
      .post<PublicApiResponseType<void>>(ApiPathEnum.UpdateTag, requestBody)
      .toPromise();
  }

  async changeStatus(requestBody: {
    id: string;
    status: boolean;
  }): Promise<PublicApiResponseType<void>> {
    return this.http
      .post<PublicApiResponseType<void>>(ApiPathEnum.ChangeTagStatus, requestBody)
      .toPromise();
  }
}
