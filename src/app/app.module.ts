/**
 * @author songxiwen
 * @date 2020/09/14 17:42
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HashLocationStrategy,
  LocationStrategy,
  registerLocaleData
} from '@angular/common';
import en from '@angular/common/locales/en';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NotFoundComponent } from './pages/not.found/not.found.component';
import { LoginComponent } from './pages/login/login.component';
import { PagesModule } from './pages/pages.module';
import { IconsProviderModule } from './icons-provider.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

registerLocaleData(en);
const customPageComponent = [LoginComponent, NotFoundComponent];
const nzModules = [
  NzLayoutModule,
  NzMenuModule,
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzCardModule,
  NzResultModule
];

@NgModule({
  declarations: [AppComponent, ...customPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ...nzModules,
    PagesModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
