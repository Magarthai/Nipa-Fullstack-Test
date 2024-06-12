"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const db_1 = tslib_1.__importDefault(require("../../../db/db"));
const UserDataListReturn_1 = require("./UserDataListReturn");
let UserRepository = class UserRepository {
    constructor() {
        this.database = (0, db_1.default)("user");
    }
    async listAllUserData() {
        const data = await this.database.clone();
        return data;
    }
    async createUserData(userData) {
        try {
            const createUser = await this.database
                .clone()
                .insert([userData])
                .returning(UserDataListReturn_1.UserDataListReturn);
            return createUser;
        }
        catch (err) {
            throw err;
        }
    }
    async findByEmail(email) {
        try {
            const findUser = await this.database
                .clone()
                .clone()
                .where("email", email)
                .first();
            return findUser;
        }
        catch (err) {
            throw err;
        }
    }
    async findById(id) {
        try {
            const findUser = await this.database.clone().where("id", id).first();
            return findUser;
        }
        catch (err) {
            throw err;
        }
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], UserRepository);
//# sourceMappingURL=UserRepository.js.map