"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class UserNotFoundError extends routing_controllers_1.HttpError {
    constructor(status, message, name) {
        super(status, message);
        this.name = name;
    }
}
exports.UserNotFoundError = UserNotFoundError;
//# sourceMappingURL=UserNotFound.js.map