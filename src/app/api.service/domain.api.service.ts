/**
 * @author songxiwen
 * @date  2022/2/21 13:08
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomainBaseTypeModelType, DomainTreeNodeResponseType } from 'metagraph-constant';
import { ApiPathEnum } from './config/api.enum';
import { PublicApiResponseType } from './config/api.type';

@Injectable({
  providedIn: 'root'
})
export class DomainApiService {
  constructor(private readonly http: HttpClient) {
  }

  async createDomainBaseType(requestBody: { name: string }): Promise<PublicApiResponseType<DomainBaseTypeModelType>> {
    return this.http
      .post<PublicApiResponseType<DomainBaseTypeModelType>>(ApiPathEnum.CreateDomainBaseType, requestBody)
      .toPromise();
  }

  async getDomainBaseTypeById(requestBody: { id: string }): Promise<PublicApiResponseType<DomainBaseTypeModelType>> {
    return this.http
      .post<PublicApiResponseType<DomainBaseTypeModelType>>(ApiPathEnum.GetDomainBaseTypeById, requestBody)
      .toPromise();
  }

  async updateDomainBaseType(requestBody: { id: string; name: string }): Promise<PublicApiResponseType<DomainBaseTypeModelType>> {
    return this.http
      .post<PublicApiResponseType<DomainBaseTypeModelType>>(ApiPathEnum.UpdateDomainBaseType, requestBody)
      .toPromise();
  }

  async changeDomainBaseTypeStatus(requestBody: { id: string; isDeleted: boolean }): Promise<PublicApiResponseType<void>> {
    return this.http
      .post<PublicApiResponseType<void>>(ApiPathEnum.UpdateDomainBaseType, requestBody)
      .toPromise();
  }

  async getDomainBaseTypeList(requestBody: {
    pageIndex: number; pageSize: number;
  }): Promise<PublicApiResponseType<{
      list: DomainBaseTypeModelType[],
      total: number
    }>> {
    return this.http
      .post<PublicApiResponseType<{
      list: DomainBaseTypeModelType[],
      total: number
    }>>(ApiPathEnum.GetDomainBaseTypeList, requestBody)
      .toPromise();
  }

  async getDomainTree(requestBody: {
    domainBaseTypeId: string
  }): Promise<PublicApiResponseType<DomainTreeNodeResponseType[]>> {
    return this.http
      .post<PublicApiResponseType<DomainTreeNodeResponseType[]>>(ApiPathEnum.GetDomainList, requestBody)
      .toPromise();
  }

  async createDomain(requestBody: {
    name: string;
    domainBaseTypeId: string;
    code: string;
    description?: string;
    parentId?: string;
  }): Promise<PublicApiResponseType<void>> {
    return this.http
      .post<PublicApiResponseType<void>>(ApiPathEnum.CreateDomain, requestBody)
      .toPromise();
  }

  async updateDomain(requestBody: {
    name: string;
    domainId: string;
    code: string;
    description?: string;
  }): Promise<PublicApiResponseType<void>> {
    return this.http
      .post<PublicApiResponseType<void>>(ApiPathEnum.UpdateDomain, requestBody)
      .toPromise();
  }

  async removeDomain(requestBody: {
    domainId: string;
  }): Promise<PublicApiResponseType<void>> {
    return this.http
      .post<PublicApiResponseType<void>>(ApiPathEnum.RemoveDomain, requestBody)
      .toPromise();
  }
}
