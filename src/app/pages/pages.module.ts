/**
 * @author songxiwen
 * @date 2020/09/14 13:11
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PagesRoutingModule } from './pages.routing.module';
import { PagesComponent } from './pages.component';
import { AuthModule } from './auth/auth.module';
import { HttpRequestInterceptor } from '../common/interceptors';
import { DashboardModule } from './dashboard.group/dashboard.module';

const nzModules = [
  NzLayoutModule,
  NzMenuModule,
  NzIconModule,
  NzDropDownModule,
  NzAvatarModule
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ...nzModules,
    CommonModule,
    DashboardModule,
    AuthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ],
  declarations: [PagesComponent]
})
export class PagesModule {}
