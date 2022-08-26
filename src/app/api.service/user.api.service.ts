/**
 * @author songxiwen
 * @date 2020/10/19 14:26
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModelType } from 'metagraph-constant';
import { ApiPathEnum } from './config/api.enum';
import { PublicApiResponseType } from './config/api.type';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(private readonly http: HttpClient) {
  }

  async getUserPageList(requestBody: {
    pageIndex: number;
    pageSize: number;
    type?: string;
    name?: string;
  }): Promise<PublicApiResponseType<{
      list: UserModelType[];
      total: number;
    }>> {
    return this.http
      .post<PublicApiResponseType<{
      list: UserModelType[];
      total: number;
    }>>(ApiPathEnum.GetUserList, requestBody)
      .toPromise();
  }

  async changeStatus(requestBody: {
    userId: string;
    isForbidden: boolean;
  }): Promise<PublicApiResponseType<void>> {
    return this.http
      .post<PublicApiResponseType<void>>(ApiPathEnum.GetUserList, requestBody)
      .toPromise();
  }

  async getUserDetailById(requestBody: {
    userId: string;
  }): Promise<PublicApiResponseType<{
      user: UserModelType,
      file: {
        total: number
      }
    }>> {
    return this.http
      .post<PublicApiResponseType<{
      user: UserModelType,
      file: {
        total: number
      }
    }>>(ApiPathEnum.GetUserDetail, requestBody)
      .toPromise();
  }
}
