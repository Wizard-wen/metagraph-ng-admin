/**
 * @author songxiwen
 * @date  2022/2/23 14:57
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { ApiTesterModelType } from 'metagraph-constant';
import { ApiPathEnum } from './config/api.enum';
import { PublicApiResponseType } from './config/api.type';

@Injectable({
  providedIn: 'root'
})
export class ApiTesterApiService {
  constructor(private readonly http: HttpClient) {
  }

  async create(requestBody: {
    name: string;
    password: string;
    type: 'user' | 'admin'
  }): Promise<PublicApiResponseType<ApiTesterModelType>> {
    return this.http
      .post<PublicApiResponseType<ApiTesterModelType>>(ApiPathEnum.CreateApiTester, requestBody)
      .toPromise();
  }

  async getList(requestBody: {
    type?: 'user' | 'admin'
  }): Promise<PublicApiResponseType<ApiTesterModelType[]>> {
    return this.http
      .post<PublicApiResponseType<ApiTesterModelType[]>>(ApiPathEnum.GetApiTesterList, requestBody)
      .toPromise();
  }

  async getPageList(requestBody: {
    pageIndex: number;
    pageSize: number;
    type?: 'user' | 'admin'
  }): Promise<PublicApiResponseType<{ list: ApiTesterModelType[], total: number }>> {
    return this.http
      .post<PublicApiResponseType<{
        list: ApiTesterModelType[],
        total: number
      }>>(ApiPathEnum.GetApiTesterPageList, requestBody)
      .toPromise();
  }
}
