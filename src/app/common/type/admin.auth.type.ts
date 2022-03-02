/**
 * @author songxiwen
 * @date 2020/09/20 16:51
 */

export type AdminRouterAuthType = {
  name: string;
  weight: number;
  route: string;
  isRouteURL: boolean;
  isShow: boolean;
  isMenu: boolean;
  id?: string;
  description?: string;
  iconClass?: string;
  parentId?: string;
};

export type AdminRoleItemType = {
  name: string;
  id?: string;
  routeList?: string[];
  apiList?: string[];
  operation?: { [key: string]: string[] };
};

export type AdminRouterAuthTreeNodeItemType = {
  id: string;
  name: string;
  weight: number;
  route: string;
  isRouteURL: boolean;
  isShow: boolean;
  isMenu: boolean;
  parentId?: string;
  iconClass?: string;
  description?: string;
  children?: AdminRouterAuthTreeNodeItemType[];
};

export type AdminAPIAuthItemType = {
  name: string;
  route: string;
  id?: string;
};

export type AdminRouterOperationAuthType = {
  name: string;
  key: string;
  pageRouteId: string;
  id?: string;
  isSelected?: boolean;
};
