/**
 * @author songxiwen
 * @date 2020/09/14 17:42
 */

import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import {
  DashboardOutline,
  FormOutline,
  MenuFoldOutline,
  MenuUnfoldOutline
} from '@ant-design/icons-angular/icons';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }]
})
export class IconsProviderModule {}
