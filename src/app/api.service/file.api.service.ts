/**
 * @author songxiwen
 * @date 2020/09/14 13:59
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileEnum } from 'metagraph-constant';
import type {
  FilePageListResponseType, FileResponseType, QiniuFileStatType
} from 'metagraph-constant';
import { ApiPathEnum } from './config/api.enum';
import { PublicApiResponseType } from './config/api.type';

@Injectable({
  providedIn: 'root'
})
export class FileApiService {
  constructor(private readonly http: HttpClient) {
  }

  async getFileList(requestBody: {
    pageIndex: number;
    pageSize: number;
  }): Promise<PublicApiResponseType<FileResponseType[]>> {
    return this.http
      .post<PublicApiResponseType<FileResponseType[]>>(ApiPathEnum.GetFileList, requestBody)
      .toPromise();
  }

  async getFilePageList(requestBody: {
    pageIndex: number;
    pageSize: number;
    isDeleted?: boolean;
  }): Promise<PublicApiResponseType<FilePageListResponseType>> {
    return this.http
      .post<PublicApiResponseType<FilePageListResponseType>>(ApiPathEnum.GetFilePageList, requestBody)
      .toPromise();
  }

  async getFileStatusByKey(requestBody: {
    key: string;
  }): Promise<PublicApiResponseType<QiniuFileStatType>> {
    return this.http
      .post<PublicApiResponseType<QiniuFileStatType>>(ApiPathEnum.GetFileStatusByKey, requestBody)
      .toPromise();
  }

  async removeFileById(requestBody: {
    id: string;
  }): Promise<PublicApiResponseType<void>> {
    return this.http
      .post<PublicApiResponseType<void>>(ApiPathEnum.RemoveFileById, requestBody)
      .toPromise();
  }

  async getTotalSize(): Promise<PublicApiResponseType<{ total: number }>> {
    return this.http
      .get<PublicApiResponseType<{
        total: number
      }>>(ApiPathEnum.GetTotalSize)
      .toPromise();
  }

  async getFileById(requestBody: {
    id: string;
  }): Promise<PublicApiResponseType<FileResponseType>> {
    return this.http
      .post<PublicApiResponseType<FileResponseType>>(ApiPathEnum.GetFileById, requestBody)
      .toPromise();
  }

  async getUploadToken(requestBody?: {
    name?: string;
    type: FileEnum;
  }): Promise<PublicApiResponseType<{
      fileKey: string;
      uploadToken: string;
    }>> {
    return this.http
      .post<PublicApiResponseType<{
      fileKey: string;
      uploadToken: string;
    }>>(ApiPathEnum.GetUploadToken, requestBody)
      .toPromise();
  }
}
