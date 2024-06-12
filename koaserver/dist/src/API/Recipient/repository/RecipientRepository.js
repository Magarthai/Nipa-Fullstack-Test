"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipientRepository = void 0;
const tslib_1 = require("tslib");
const db_1 = tslib_1.__importDefault(require("@app/db/db"));
const typedi_1 = require("typedi");
let RecipientRepository = class RecipientRepository {
    constructor() {
        this.database = (0, db_1.default)("ticket");
    }
    async findTicketByRecipient(id) {
        try {
            const data = await this.database
                .clone()
                .where("recipient", id)
                .orderBy("updated_at", "desc");
            return data;
        }
        catch (err) {
            throw err;
        }
    }
};
exports.RecipientRepository = RecipientRepository;
exports.RecipientRepository = RecipientRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], RecipientRepository);
//# sourceMappingURL=RecipientRepository.js.map