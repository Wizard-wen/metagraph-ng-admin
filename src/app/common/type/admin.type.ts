/**
 * @author songxiwen
 * @date 2020/09/24 14:50
 */

export type AdminItemType = {
  name: string;
  isEnabled: boolean;
  roleList: AdminRoleItemType[];
  id?: string;
  password?: string;
};

export type AdminItemCreateType = {
  name: string;
  isEnabled: boolean;
  roleList: string[];
  password: string;
};

export type AdminItemConfigType = {
  id: string;
  name: string;
  isEnabled: boolean;
  roleList: string[];
  password: string;
};

type AdminRoleItemType = {
  name: string;
  id: string;
};
