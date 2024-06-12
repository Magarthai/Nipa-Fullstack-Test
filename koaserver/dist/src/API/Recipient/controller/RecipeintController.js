"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeintController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const RecipientService_1 = require("../view/RecipientService");
let RecipeintController = class RecipeintController {
    async getTicketByRecipient(recipient_id) {
        const fetchTicketById = await this.recipientServices.getTicketByRecipient(recipient_id);
        return {
            message: "Ticket fetch successfully",
            ticket: fetchTicketById,
        };
    }
};
exports.RecipeintController = RecipeintController;
tslib_1.__decorate([
    (0, typedi_1.Inject)(),
    tslib_1.__metadata("design:type", RecipientService_1.RecipientService)
], RecipeintController.prototype, "recipientServices", void 0);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)("/:recipient_id/tickets"),
    tslib_1.__param(0, (0, routing_controllers_1.Param)("recipient_id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], RecipeintController.prototype, "getTicketByRecipient", null);
exports.RecipeintController = RecipeintController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/recipients")
], RecipeintController);
//# sourceMappingURL=RecipeintController.js.map