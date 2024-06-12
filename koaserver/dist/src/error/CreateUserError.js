"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserError = void 0;
const routing_controllers_1 = require("routing-controllers");
class CreateUserError extends routing_controllers_1.HttpError {
    constructor() {
        super(500, "Internet server error!");
    }
}
exports.CreateUserError = CreateUserError;
//# sourceMappingURL=CreateUserError.js.map