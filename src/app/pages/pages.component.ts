/**
 * @author songxiwen
 * @date 2020/09/14 10:30
 */

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api.service';
import { MenuItemType } from '../common/type';

@Component({
  selector: 'metagraph-pages',
  styleUrls: ['pages.component.scss'],
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {
  routerMenuList: MenuItemType[] = [];

  collapsedStatus = false;

  constructor(private readonly authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    await this.getRouterMenuList();
  }

  logout(): void {
    this.authService.logout();
  }

  async getRouterMenuList(): Promise<void> {
    const response = await this.authService.getRouterMenuTree();
    if (!response) {
      return;
    }
    const menu = JSON.parse(response);
    this.routerMenuList = this.setMenuWeight(menu);
  }

  private setMenuWeight(menu: MenuItemType[]): MenuItemType[] {
    return menu
      .map((item: MenuItemType) => {
        if (item.children) {
          return {
            ...item,
            children: this.setMenuWeight(item.children)
          };
        }
        return item;
      })
      .sort((a: MenuItemType, b: MenuItemType) => a.weight - b.weight);
  }
}
