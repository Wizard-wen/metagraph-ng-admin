/**
 * @author songxiwen
 * @date 2020/09/21 13:21
 */

export type FileItemType = {
  id: string;
  key: string;
  type: string;
  creatorId: string;
  size: string;
  groupId: string;
  projectId: string;
  resourceType: string;
  deleted: boolean;
  name?: string;
  mimeType?: string;
  width?: number;
  height?: number;
  createdAt: Date;
  updatedAt: Date;
};

export type QiniuNextHandlerParamsType = {
  uploadInfo: {
    id: string;
    url: string;
  };
  total: {
    loaded: number;
    total: number;
    percent: number;
  };
};

export type QiniuErrorHandlerParamsType = {
  isRequestError: boolean | undefined;
  reqId?: string;
  code: number;
  message: string;
};
