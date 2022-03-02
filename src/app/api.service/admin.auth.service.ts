/**
 * @author songxiwen
 * @date 2020/09/15 20:54
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AdminAPIAuthItemType,
  AdminItemConfigType,
  AdminItemCreateType,
  AdminItemType,
  AdminRoleItemType,
  AdminRouterAuthTreeNodeItemType,
  AdminRouterAuthType,
  AdminRouterOperationAuthType
} from '../common/type';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  constructor(private readonly http: HttpClient) {}

  getAdminRouterAuthList(): Promise<{
    data: AdminRouterAuthType[];
    code: number;
  }> {
    return this.http
      .get<{
        data: AdminRouterAuthType[];
        code: number;
      }>('api/adminAuth/getAdminRouterAuthList')
      .toPromise();
  }

  getAdminRouterAuthPageList(requestBody: {
    pageIndex: number;
    pageSize: number;
  }): Promise<{
    data: {
      list: AdminRouterAuthType[];
      total: number;
    };
    code: number;
  }> {
    return this.http
      .post<{
        data: {
          list: AdminRouterAuthType[];
          total: number;
        };
        code: number;
      }>('api/adminAuth/getAdminRouterAuthPageList', requestBody)
      .toPromise();
  }

  createAdminRouterAuth(
    requestBody: AdminRouterAuthType
  ): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/createAdminRouterAuth', requestBody)
      .toPromise();
  }

  getAdminRouterAuthById(requestBody: {
    id: string;
  }): Promise<{
    code: number;
    data: AdminRouterAuthType;
  }> {
    return this.http
      .post<{
        code: number;
        data: AdminRouterAuthType;
      }>('api/adminAuth/getAdminRouterAuthById', requestBody)
      .toPromise();
  }

  removeAdminRouterAuthById(requestBody: {
    id: string;
  }): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/removeAdminRouterAuthById', requestBody)
      .toPromise();
  }

  changeAdminRouterAuthStatusById(requestBody: {
    id: string;
    status: boolean;
  }): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/changeAdminRouterAuthStatusById', requestBody)
      .toPromise();
  }

  updateAdminRouterAuth(
    requestBody: AdminRouterAuthType
  ): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/updateAdminRouterAuth', requestBody)
      .toPromise();
  }

  getAdminAPIAuthList(): Promise<{
    data: AdminAPIAuthItemType[];
    code: number;
  }> {
    return this.http
      .get<{
        data: AdminAPIAuthItemType[];
        code: number;
      }>('api/adminAuth/getAdminAPIAuthList')
      .toPromise();
  }

  getAdminAPIAuthPageList(requestBody: {
    pageIndex: number;
    pageSize: number;
  }): Promise<{
    data: {
      list: AdminAPIAuthItemType[];
      total: number;
    };
    code: number;
  }> {
    return this.http
      .post<{
        data: {
          list: AdminAPIAuthItemType[];
          total: number;
        };
        code: number;
      }>('api/adminAuth/getAdminAPIAuthPageList', requestBody)
      .toPromise();
  }

  createAdminAPIAuth(requestBody: {
    name: string;
    router: string;
  }): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/createAdminAPIAuth', requestBody)
      .toPromise();
  }

  removeAdminAPIAuthById(requestBody: {
    id: string;
  }): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/removeAdminAPIAuthById', requestBody)
      .toPromise();
  }

  changeAdminAPIAuthStatusById(requestBody: {
    id: string;
    status: boolean;
  }): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/changeAdminAPIAuthStatusById', requestBody)
      .toPromise();
  }

  updateAdminAPIAuth(requestBody: {
    id: string;
    name: string;
    router: string;
  }): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/updateAdminAPIAuth', requestBody)
      .toPromise();
  }

  getAdminRolePageList(requestBody: {
    pageIndex: number;
    pageSize: number;
  }): Promise<{
    data: {
      list: {
        id: string;
        name: string;
      }[];
      total: number;
    };
    code: number;
  }> {
    return this.http
      .post<{
        data: {
          list: {
            id: string;
            name: string;
          }[];
          total: number;
        };
        code: number;
      }>('api/adminAuth/getAdminRolePageList', requestBody)
      .toPromise();
  }

  getAdminRoleList(): Promise<{
    data: AdminRoleItemType[];
    code: number;
  }> {
    return this.http
      .get<{
        data: AdminRoleItemType[];
        code: number;
      }>('api/adminAuth/getAdminRoleList')
      .toPromise();
  }

  createAdminRole(requestBody: {
    name: string;
  }): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/createAdminRole', requestBody)
      .toPromise();
  }

  getAdminRoleById(requestBody: {
    id: string;
  }): Promise<{
    data: AdminRoleItemType;
    code: number;
  }> {
    return this.http
      .post<{
        data: AdminRoleItemType;
        code: number;
      }>('api/adminAuth/getAdminRoleById', requestBody)
      .toPromise();
  }

  removeAdminRoleById(requestBody: {
    id: string;
  }): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/removeAdminRoleById', requestBody)
      .toPromise();
  }

  changeAdminRoleStatusById(requestBody: {
    id: string;
    status: boolean;
  }): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/changeAdminRoleStatusById', requestBody)
      .toPromise();
  }

  updateAdminRole(requestBody: {
    id: string;
    name: string;
  }): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/updateAdminRole', requestBody)
      .toPromise();
  }

  getAdminRouterTree(): Promise<{
    data: AdminRouterAuthTreeNodeItemType[];
    code: number;
  }> {
    return this.http
      .get<{
        data: AdminRouterAuthTreeNodeItemType[];
        code: number;
      }>('api/adminAuth/getAdminRouterTree')
      .toPromise();
  }

  updateRouterAuthOfRole(requestBody: {
    id: string;
    routeList: string[];
  }): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/updateRouterAuthOfRole', requestBody)
      .toPromise();
  }

  updateAPIAuthOfRole(requestBody: {
    id: string;
    apiList: string[];
    type: string;
  }): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/updateAPIAuthOfRole', requestBody)
      .toPromise();
  }

  createOperationAuth(requestBody: {
    name: string;
    key: string;
    pageRouteId: string;
  }): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/createOperationAuth', requestBody)
      .toPromise();
  }

  removeOperationAuthById(requestBody: {
    id: string;
  }): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/removeOperationAuthById', requestBody)
      .toPromise();
  }

  changeOperationAuthStatusById(requestBody: {
    id: string;
    status: boolean;
  }): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/changeOperationAuthStatusById', requestBody)
      .toPromise();
  }

  updateOperationAuth(
    requestBody: AdminRouterOperationAuthType
  ): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/updateOperationAuth', requestBody)
      .toPromise();
  }

  getOperationAuthList(requestBody: {
    pageRouteId?: string;
  }): Promise<{
    data: AdminRouterOperationAuthType[];
    code: number;
  }> {
    return this.http
      .post<{
        data: AdminRouterOperationAuthType[];
        code: number;
      }>('api/adminAuth/getOperationAuthList', requestBody)
      .toPromise();
  }

  updateRoleOperationAuth(requestBody: {
    routerId: string;
    roleId: string;
    operationList: string[];
  }): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/updateRoleOperationAuth', requestBody)
      .toPromise();
  }

  createAdmin(
    requestBody: AdminItemCreateType
  ): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/createAdmin', requestBody)
      .toPromise();
  }

  updateAdmin(
    requestBody: AdminItemConfigType
  ): Promise<{
    code: number;
  }> {
    return this.http
      .post<{
        code: number;
      }>('api/adminAuth/updateAdmin', requestBody)
      .toPromise();
  }

  getAdminById(requestBody: {
    id: string;
  }): Promise<{
    code: number;
    data: AdminItemType;
  }> {
    return this.http
      .post<{
        code: number;
        data: AdminItemType;
      }>('api/adminAuth/getAdminById', requestBody)
      .toPromise();
  }

  getAdminPageList(requestBody: {
    pageIndex: number;
    pageSize: number;
  }): Promise<{
    code: number;
    data: {
      list: AdminItemType[];
      total: number;
    };
  }> {
    return this.http
      .post<{
        code: number;
        data: {
          list: AdminItemType[];
          total: number;
        };
      }>('api/adminAuth/getAdminPageList', requestBody)
      .toPromise();
  }

  getAdminList(): Promise<{
    code: number;
    data: AdminItemType[];
  }> {
    return this.http
      .get<{
        code: number;
        data: AdminItemType[];
      }>('api/adminAuth/getAdminList')
      .toPromise();
  }
}
