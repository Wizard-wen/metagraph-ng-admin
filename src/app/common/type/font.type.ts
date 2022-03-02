/**
 * @author songxiwen
 * @date 2020/11/04 14:19
 */

import { LocalizationContents } from './icon.type';

export type FontCreateRequestType = {
  kitId: string;
  fontStyleId: string;
  kitCategoryId: string;
  name: LocalizationContents;
  fontFile: string;
  description?: LocalizationContents;
  size?: number;
  fileKey?: string;
};

export type FontResponseType = {
  id: string;
  kitId: string;
  fontStyleId: string;
  kitCategoryId: string;
  name: LocalizationContents;
  description?: LocalizationContents;
  size: number;
  fileKey: string;
  isEnabled: boolean;
  updatedAt: string;
  createdAt: string;
};

export type FontEditRequestType = {
  id: string;
  kitId: string;
  fontStyleId: string;
  kitCategoryId: string;
  name: LocalizationContents;
};

export type FontPageListRequestType = {
  pageIndex: number;
  pageSize: number;
  kitId?: string;
  fontStyleId?: string;
};

export type FontStyleCreateRequestType = {
  name: LocalizationContents;
  weight: number;
};

export type FontStyleResponseType = {
  id: string;
  name: LocalizationContents;
  weight: number;
  isEnabled: boolean;
  updatedAt: string;
  createdAt: string;
};

export type FontStyleEditRequestType = {
  id: string;
  name: LocalizationContents;
  weight: number;
};

export type FontStylePageListRequestType = {
  pageIndex: number;
  pageSize: number;
};
