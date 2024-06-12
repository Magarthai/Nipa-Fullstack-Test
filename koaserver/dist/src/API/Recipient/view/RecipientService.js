"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipientService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const RecipientRepository_1 = require("../repository/RecipientRepository");
let RecipientService = class RecipientService {
    async getTicketByRecipient(id) {
        const data = await this.recipientRepositorys.findTicketByRecipient(id);
        return { message: "success", data: data };
    }
};
exports.RecipientService = RecipientService;
tslib_1.__decorate([
    (0, typedi_1.Inject)(),
    tslib_1.__metadata("design:type", RecipientRepository_1.RecipientRepository)
], RecipientService.prototype, "recipientRepositorys", void 0);
exports.RecipientService = RecipientService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], RecipientService);
//# sourceMappingURL=RecipientService.js.map