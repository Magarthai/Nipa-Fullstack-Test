"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketNotFoundError = exports.NotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class NotFoundError extends routing_controllers_1.HttpError {
    constructor(message) {
        super(404, message);
    }
}
exports.NotFoundError = NotFoundError;
class TicketNotFoundError extends NotFoundError {
    constructor(message) {
        super(message !== null && message !== void 0 ? message : "Ticket not found.");
    }
}
exports.TicketNotFoundError = TicketNotFoundError;
//# sourceMappingURL=TicketNotFound.js.map