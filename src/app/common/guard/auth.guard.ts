/**
 * @author songxiwen
 * @date 2020/09/14 10:05
 */

import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly messageService: NzMessageService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const routerList = this.authService.getRouterList();
    if (
      !routerList
      || !routerList.find((item: string) => item === state.url.split('?')[0])
    ) {
      this.messageService.create('error', '没有访问该路由的权限');
      // this.router.navigate(['/login']).then();
    }
    if (!sessionStorage.getItem('edu-admin-token')) {
      this.messageService.create('error', '权限错误');
      // return this.router.parseUrl('/login');
    }
    return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    return this.canActivate(route, state);
  }
}
