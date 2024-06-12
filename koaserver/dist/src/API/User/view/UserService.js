"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const UserRepository_1 = require("../repository/UserRepository");
const bcrypt = require("bcrypt");
const db_1 = tslib_1.__importDefault(require("@app/db/db"));
const generateRefreshToken_1 = require("@app/utils/generateRefreshToken");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const UserStatus_1 = require("../enum/UserStatus");
let UserService = class UserService {
    constructor() {
        this.database = (0, db_1.default)("user");
    }
    async useListAllUserData() {
        const userData = this.userRepository.listAllUserData();
        return userData;
    }
    async useCreateUser(data) {
        const findExitEmail = await this.userRepository.findByEmail(data.email);
        if (findExitEmail) {
            return "User already exists";
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            const password = data.password;
            const hash = bcrypt.hashSync(password, salt);
            const encryptedData = {
                fname: data.fname,
                lname: data.lname,
                email: data.email,
                password: hash,
            };
            const createUser = await this.userRepository.createUserData(encryptedData);
            return createUser;
        }
    }
    async useLoginUser(data) {
        const findUser = await this.userRepository.findByEmail(data.email);
        if (!findUser) {
            return { message: "User not found" };
        }
        const isPasswordMatched = await bcrypt.compare(data.password, findUser.password);
        if (!isPasswordMatched) {
            return { message: UserStatus_1.UserStatus.Invalid_password };
        }
        const refreshToken = (0, generateRefreshToken_1.generateRefreshToken)(findUser === null || findUser === void 0 ? void 0 : findUser.id);
        return {
            message: UserStatus_1.UserStatus.Password_matched,
            refreshToken: refreshToken,
        };
    }
    async useLogoutUser(refreshToken) {
        const decode = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_SECRET || "secret");
        console.log(decode);
        const useLogoutUser = this.userRepository.findById(decode.id);
        if (!useLogoutUser) {
            return UserStatus_1.UserStatus.Not_found;
        }
        return UserStatus_1.UserStatus.Success;
    }
    async useRefreshTokenUser(refreshToken) {
        const decode = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_SECRET || "secret");
        const useRefreshToken = this.userRepository.findById(decode.id);
        return useRefreshToken;
    }
};
exports.UserService = UserService;
tslib_1.__decorate([
    (0, typedi_1.Inject)(() => UserRepository_1.UserRepository),
    tslib_1.__metadata("design:type", UserRepository_1.UserRepository)
], UserService.prototype, "userRepository", void 0);
exports.UserService = UserService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], UserService);
//# sourceMappingURL=UserService.js.map