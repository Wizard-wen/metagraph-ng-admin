/**
 * @author songxiwen
 * @date 2020/10/14 16:56
 */

export type IconResponseType = {
  id: string;
  name: LocalizationContents;
  updatedAt: Date;
  createdAt: Date;
  fileKey: string;
  kitId: string;
  kitCategoryId: string;
  iconStyleId: string;
  isEnabled: boolean;
  width: number;
  height: number;
  size: number;
};

export type IconListRequestType = {
  iconList: IconRequestType[];
};

export type IconRequestType = {
  kitId: string;
  kitCategoryId: string;
  iconStyleId: string;
  fileKey: string;
  name: {
    zhCN: string;
    en: string;
  };
  size: number;
  width: number;
  height: number;
};

export type IconEditRequestType = {
  id: string;
  kitId: string;
  kitCategoryId: string;
  iconStyleId: string;
  name: {
    zhCN?: string;
    en?: string;
  };
};

export type IconUploadedByQiniuType = {
  fileKey: string;
  name: {
    zhCN: string;
    en: string;
  };
  size: number;
  width: number;
  height: number;
};

export type KitCategoryType = {
  id: string;
  name: LocalizationContents;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type LocalizationContents = {
  zhCN: string;
  en?: string;
};

export type IconStyleResponseType = {
  id: string;
  name: LocalizationContents;
  createdAt: Date;
  updatedAt: Date;
  isEnabled: boolean;
  weight: number;
};
