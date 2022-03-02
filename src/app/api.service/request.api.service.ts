/**
 * @author songxiwen
 * @date  2022/2/22 10:43
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCompletelyListItemType, RequestApiModelType } from 'metagraph-constant';
import { ApiPathEnum } from './config/api.enum';
import { PublicApiResponseType } from './config/api.type';

@Injectable({
  providedIn: 'root'
})
export class RequestApiService {
  constructor(private readonly http: HttpClient) {
  }

  async create(requestBody: {
    path: string;
    description: string;
    name: string;
    type: 'post' | 'get' | 'put' | 'delete';
    isAuth: boolean
    role?: 'admin' | 'user' | 'system';
  }): Promise<PublicApiResponseType<RequestApiModelType>> {
    return this.http
      .post<PublicApiResponseType<RequestApiModelType>>(ApiPathEnum.CreateRequestApi, requestBody)
      .toPromise();
  }

  async update(requestBody: {
    requestApiId: string;
    path: string;
    description: string;
    name: string;
    type: 'post' | 'get' | 'put' | 'delete';
    isAuth: boolean
    role?: 'admin' | 'user' | 'system';
  }): Promise<PublicApiResponseType<RequestApiModelType>> {
    return this.http
      .post<PublicApiResponseType<RequestApiModelType>>(ApiPathEnum.UpdateRequestApi, requestBody)
      .toPromise();
  }

  async getById(id: string): Promise<PublicApiResponseType<RequestApiModelType>> {
    return this.http
      .post<PublicApiResponseType<RequestApiModelType>>(ApiPathEnum.GetRequestApiById, { id })
      .toPromise();
  }

  async testApi(requestBody: {
    apiTesterId?: string;
    testDataId?: string;
    testData?: { [key: string]: any };
    requestApiId: string;
  }): Promise<PublicApiResponseType<{
    data: PublicApiResponseType<any>,
    status: number,
    statusText: string
  } | undefined>> {
    return this.http
      .post<PublicApiResponseType<{
        data: PublicApiResponseType<any>,
        status: number,
        statusText: string
      } | undefined>>(ApiPathEnum.TestRequestApi, requestBody)
      .toPromise();
  }

  async addField(requestBody: {
    requestApiId: string;
    fieldName: string;
    description: string;
    required: boolean;
    fieldType: 'string' | 'Date' | 'number' | 'array' | 'object'
  }): Promise<PublicApiResponseType<RequestApiModelType>> {
    return this.http
      .post<PublicApiResponseType<RequestApiModelType>>(ApiPathEnum.AddRequestApiField, requestBody)
      .toPromise();
  }

  async removeField(requestBody: {
    requestApiId: string;
    key: string;
  }): Promise<PublicApiResponseType<RequestApiModelType>> {
    return this.http
      .post<PublicApiResponseType<RequestApiModelType>>(ApiPathEnum.RemoveRequestApiField, requestBody)
      .toPromise();
  }

  async updateField(requestBody: {
    requestApiId: string;
    key: string;
    fieldName: string;
    description: string;
    required: boolean;
    fieldType: 'string' | 'Date' | 'number' | 'array' | 'object'
  }): Promise<PublicApiResponseType<RequestApiModelType>> {
    return this.http
      .post<PublicApiResponseType<RequestApiModelType>>(ApiPathEnum.UpdateRequestApiField, requestBody)
      .toPromise();
  }

  async addTestData(requestBody: {
    requestApiId: string;
    data: {
      [key: string]: any
    }
  }): Promise<PublicApiResponseType<RequestApiModelType>> {
    return this.http
      .post<PublicApiResponseType<RequestApiModelType>>(ApiPathEnum.AddRequestApiTestData, requestBody)
      .toPromise();
  }

  async getPageList(requestBody: {
    pageIndex: number;
    pageSize: number;
  }): Promise<PublicApiResponseType<{
    list: RequestApiModelType[];
    total: number;
  }>> {
    return this.http
      .post<PublicApiResponseType<{
        list: RequestApiModelType[];
        total: number;
      }>>(ApiPathEnum.GetRequestApiList, requestBody)
      .toPromise();
  }
}
