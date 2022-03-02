/**
 * @author songxiwen
 * @date 2020/12/22 14:35
 */

export type CommonSuccessResponseType<T> = {
  code: number;
  data: T;
};

export type CommonErrorResponseType = {
  code: number;
  message: string;
};
