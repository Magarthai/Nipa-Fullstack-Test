"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class TokenNotFoundError extends routing_controllers_1.HttpError {
    constructor(status, message, name) {
        super(status, message);
        this.name = name;
    }
}
exports.TokenNotFoundError = TokenNotFoundError;
//# sourceMappingURL=TokenNotFound.js.map