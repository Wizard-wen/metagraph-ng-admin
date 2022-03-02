/**
 * @author songxiwen
 * @date  2022/2/21 13:10
 */

export interface PublicApiResponseType<T> {
  data?: T;
  message?: string;
  code: number;
}

