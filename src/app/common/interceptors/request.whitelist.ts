/**
 * @author songxiwen
 * @date 2020/09/20 16:14
 */

export class RequestWhitelist {
  private static config = new Set(['api/admin/ng/login']);

  public static contains(url: string): boolean {
    return RequestWhitelist.config.has(url);
  }
}
