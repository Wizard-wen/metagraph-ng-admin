/**
 * @author songxiwen
 * @date 2020/09/20 16:46
 */

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map, tap } from 'rxjs/operators';
import { RequestWhitelist } from './request.whitelist';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly messageService: NzMessageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (RequestWhitelist.contains(request.url)) {
      return next.handle(request);
    }
    const token = sessionStorage.getItem('edu-admin-token');
    if (!token) {
      this.router.navigate(['/login']).then();
      this.messageService.create('error', '权限错误');
      throw new Error('token not exists');
    }
    const authRequest = request.clone({
      headers: request.headers.set('edu-admin-token', token)
    });
    return next.handle(authRequest).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            if (event.status === 200 && event.body.code !== 0) {
              this.messageService.create('error', event.body.message);
            }
          }
        },
        error => {
          this.messageService.create('error', error.message);
        }
      )
    );
  }
}
