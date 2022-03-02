/**
 * @author songxiwen
 * @date 2020/09/14 18:38
 */

export type MenuItemType = {
  id: string;
  name: string;
  level: number;
  title: string;
  parentId: string;
  route: string;
  isRouteURL: boolean;
  isShow: boolean;
  icon: string | undefined;
  description: string | undefined;
  weight: number;
  operation?: {
    key: string;
    name: string;
    id: string;
  }[];
  children?: MenuItemType[];
};

export type AdminRouterForResponseType = {
  id: string;
  name: string;
  parentId: string;
  route: string;
  isRouteURL: boolean;
  isShow: boolean;
  iconClass: string | undefined;
  description: string | undefined;
  weight: number;
  operation?: {
    key: string;
    name: string;
    id: string;
  }[];
  children?: AdminRouterForResponseType[];
};

export type LoginResponseType = {
  menu: AdminRouterForResponseType[];
  token: string;
  admin: {
    name: string;
    roleList: string[];
  };
  operation?: {
    [key: string]: {
      key: string;
      name: string;
      id: string;
    }[];
  };
  routerList?: string[];
};
