/**
 * @author songxiwen
 * @date 2020/09/21 13:30
 */

export type ElementItemType = {
  id: string;
  name: string;
  weight: number;
  parentId?: string;
  fieldList?: ElementFieldItemType[];
};

export type ElementItemCreateType = {
  parentId: string;
  name: string;
  weight: number;
  fieldList: ElementWithoutIdFieldItemCreateType[];
};

export type ElementFieldItemType = {
  elementFieldBaseTypeId: string;
  elementFieldBaseTypeName: string;
  elementFieldFormItemType: string;
  elementId: string;
  id: string;
  key: string;
  value?: string;
};

export type ElementFieldItemUIType = {
  elementFieldBaseTypeId: string;
  key: string;
  elementFieldFormItemType: string;
  elementFieldBaseTypeName?: string;
  elementId?: string;
  id?: string;
  value?: string;
  index?: number;
};

export type ElementFieldItemSingleUpdateType = {
  elementFieldBaseTypeId: string;
  elementFieldFormItemType: string;
  elementId: string;
  id: string;
  key: string;
};

export type ElementFieldItemSingleCreateType = {
  elementFieldBaseTypeId: string;
  elementFieldFormItemType: string;
  elementId: string;
  key: string;
};

export type ElementWithoutIdFieldItemCreateType = {
  elementFieldBaseTypeId: string;
  elementFieldFormItemType: string;
  key: string;
};

export type DynamicalElementFieldItemControlType = {
  elementFieldBaseTypeId: string;
  elementFieldFormItemType: string;
  elementFieldBaseTypeName: string;
  elementId: string;
  id: string;
  key: string;
  label: string;
  placeholder: string;
  type: string;
  value?: string;
};

export type ElementFieldBaseItemType = {
  id: string;
  value: string;
};

export type ElementTreeNodeType = {
  id: string;
  name: string;
  parentId: string;
  weight: number;
  title?: string;
  key?: string;
  isLeaf?: boolean;
  children?: ElementTreeNodeType[];
};
