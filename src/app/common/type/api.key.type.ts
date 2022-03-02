/**
 * @author songxiwen
 * @date 2020/12/08 16:46
 */

export type ApiKeyCreatingRequestType = {
  thirdPartyPlatformId: string;
  key: object;
  isPaid: boolean;
};

export type ApiKeyResponseType = {
  id: string;
  thirdPartyPlatform: ThirdPartyPlatformResponseType;
  remainingCount: number;
  key: object;
  isEnabled: boolean;
  resetAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type ThirdPartyPlatformCreatingRequestType = {
  name: string;
  limit: number;
  cycle: string;
  authFields: string[];
};

export type ThirdPartyPlatformResponseType = {
  id: string;
  name: string;
  limit: number;
  cycle: string;
  authFields: object;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ApiKeyListFilterRequestFromMicroServiceType = {
  pageIndex: number;
  pageSize: number;
  thirdPartyPlatformId?: string;
  order: { [key: string]: number } | {};
};
