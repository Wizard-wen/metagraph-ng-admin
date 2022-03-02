/**
 * @author songxiwen
 * @date 2020/09/10 10:09
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { menu } from './data/menu';
import {
  AdminRouterForResponseType,
  LoginResponseType,
  MenuItemType
} from '../common/type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  async login(requestBody: {
    password: string;
    name: string;
  }): Promise<{
    data?: LoginResponseType;
    message?: string;
    code: number;
  }> {
    const response: {
      data?: LoginResponseType;
      message?: string;
      code: number;
    } = await this.http
      .post<{
        data?: LoginResponseType;
        message?: string;
        code: number;
      }>('api/admin/ng/login', requestBody)
      .toPromise();
    if (response.code === 0 && response.data) {
      sessionStorage.removeItem('edu-admin-token');
      sessionStorage.removeItem('towifyRouter');
      sessionStorage.removeItem('towifyAdmin');
      sessionStorage.removeItem('towifyRouterMenuTree');
      sessionStorage.removeItem('towifyOperation');
      sessionStorage.removeItem('towifyRouterList');
      sessionStorage.setItem('edu-admin-token', response.data.token);
      sessionStorage.setItem(
        'towifyAdmin',
        JSON.stringify(response.data.admin)
      );
      sessionStorage.setItem(
        'towifyRouterMenuTree',
        JSON.stringify(this.generateMenuTree(response.data.menu))
      );
      sessionStorage.setItem('towifyRouter', JSON.stringify(menu));
      sessionStorage.setItem(
        'towifyOperation',
        JSON.stringify(response.data.operation)
      );
      sessionStorage.setItem(
        'towifyRouterList',
        JSON.stringify(response.data.routerList)
      );
    }
    return response;
  }

  getToken(): string | null {
    return sessionStorage.getItem('edu-admin-token');
  }

  getAdmin(): string | null {
    return sessionStorage.getItem('towifyAdmin');
  }

  getRouterMenuTree(): string | null {
    return sessionStorage.getItem('towifyRouterMenuTree');
  }

  getRouterList(): string[] | null {
    const routerList = sessionStorage.getItem('towifyRouterList');
    if (!routerList) {
      return [];
    }
    return JSON.parse(routerList);
  }

  getOperationByRouter(
    router: string
  ): {
    key: string;
    name: string;
    id: string;
  }[] {
    const operationMap = sessionStorage.getItem('towifyOperation');
    if (!operationMap || !JSON.parse(operationMap)[router]) {
      return [];
    }
    const operationList = JSON.parse(operationMap)[router];
    return operationList;
  }

  logout(): void {
    sessionStorage.removeItem('edu-admin-token');
    sessionStorage.removeItem('towifyRouter');
    sessionStorage.removeItem('towifyAdmin');
    sessionStorage.removeItem('towifyRouterMenuTree');
    sessionStorage.removeItem('towifyOperation');
    this.router.navigate(['/login']).then();
  }

  private generateMenuTree(
    tree: AdminRouterForResponseType[],
    level = 1
  ): MenuItemType[] {
    return tree.reduce(
      (
        previousValue: MenuItemType[],
        currentValue: AdminRouterForResponseType
      ) => {
        const routerItem = {
          id: currentValue.id,
          level,
          name: currentValue.name,
          title: currentValue.name,
          icon: currentValue.iconClass,
          isShow: currentValue.isShow,
          weight: currentValue.weight,
          description: currentValue.description,
          parentId: currentValue.parentId,
          route: currentValue.route,
          isRouteURL: currentValue.isRouteURL,
          operation: currentValue.operation || []
        };
        if (currentValue.children) {
          return previousValue.concat({
            ...routerItem,
            children: this.generateMenuTree(currentValue.children, level + 1)
          });
        }
        if (!currentValue.isShow) {
          return previousValue;
        }
        return previousValue.concat(routerItem);
      },
      []
    );
  }
}
