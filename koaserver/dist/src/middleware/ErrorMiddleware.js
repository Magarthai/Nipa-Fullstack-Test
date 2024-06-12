"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const UNKNOWN_ERROR_CODE = 400;
let ErrorMiddleware = class ErrorMiddleware {
    async use(context, next) {
        try {
            await next();
        }
        catch (error) {
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
};
exports.ErrorMiddleware = ErrorMiddleware;
exports.ErrorMiddleware = ErrorMiddleware = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Middleware)({ type: "before" })
], ErrorMiddleware);
//# sourceMappingURL=ErrorMiddleware.js.map