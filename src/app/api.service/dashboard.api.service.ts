import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomainBaseTypeModelType } from 'metagraph-constant';
import { ApiPathEnum } from './config/api.enum';
import { PublicApiResponseType } from './config/api.type';

/**
 * @author songxiwen
 * @date  2022/2/21 16:26
 */

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {
  constructor(private readonly http: HttpClient) {
  }

  async getSystemDashboard(): Promise<PublicApiResponseType<{
    user: number,
    repository: number,
    file: number,
    knowledge: number,
    fileTotalSize: number
  }>> {
    return this.http
      .post<PublicApiResponseType<{
      user: number,
      repository: number,
      file: number,
      knowledge: number,
      fileTotalSize: number
    }>>(ApiPathEnum.GetSystemDashboard, {})
      .toPromise();
  }
}
