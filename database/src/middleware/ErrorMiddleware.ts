import { Context } from "koa";
import { KoaMiddlewareInterface, Middleware } from "routing-controllers";

const UNKNOWN_ERROR_CODE = 400;

@Middleware({ type: "before" })
export class ErrorMiddleware implements KoaMiddlewareInterface {
  public async use(context: Context, next: any) {
    try {
      await next();
    } catch (error: any) {
      const { name, status, httpCode, message, errors, ...payload } = error;
      context.status = status || httpCode || UNKNOWN_ERROR_CODE;
      context.body = {
        type: name,
        message: message || name || undefined,
        errors,
        ...payload,
      };
    }
  }
}
