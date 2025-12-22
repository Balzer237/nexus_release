import { firstValueFrom } from "rxjs";

export function forward(
    http,
    service,
    method: 'get' | 'post' | 'patch' | 'delete'|'put',
    url: string,
    req?: any,
    data?: any,
    params?: any,
  ) {
    return firstValueFrom(
      http.request({
        method,
        url: `http://${service}:3000${url}`,
        data,
        params,
        headers: req?.headers?.authorization
          ? { Authorization: req.headers.authorization }
          : undefined,
      }),
    ).then((res:any) => res.data);
  }