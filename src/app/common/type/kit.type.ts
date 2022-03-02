/**
 * @author songxiwen
 * @date 2020/10/19
 */
import { LocalizationContents } from './icon.type';

export type KitCreateType = {
  name: LocalizationContents;
  type: string;
  purchaseCount: number;
  price: number;
  discount: number;
  memberDiscount: number;
  description?: LocalizationContents;
  authorId?: string;
  originalCover?: string;
  cover?: string;
  thumb?: string;
  banner?: string;
};

export type KitEditType = {
  id: string;
  name: LocalizationContents;
  type: string;
  purchaseCount: number;
  price: number;
  discount: number;
  memberDiscount: number;
  svgPackageFileKey?: string;
  description?: LocalizationContents;
  authorId?: string;
  originalCover?: string;
  cover?: string;
  thumb?: string;
  banner?: string;
};

export type KitResponseType = {
  id: string;
  name: LocalizationContents;
  type: string;
  purchaseCount: number;
  price: number;
  discount: number;
  memberDiscount: number;
  description?: LocalizationContents;
  authorId?: string;
  originalCover?: string;
  cover?: string;
  thumb?: string;
  banner?: string;
};

export type KitPageListType = {
  list: KitResponseType[];
  total: number;
};
