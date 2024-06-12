"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const UserService_1 = require("../view/UserService");
const UserNotFound_1 = require("@app/error/UserNotFound");
const TokenNotFound_1 = require("@app/error/TokenNotFound");
const UserStatus_1 = require("../enum/UserStatus");
const CreateUserError_1 = require("@app/error/CreateUserError");
let UserController = class UserController {
    async listAllUser() {
        const data = await this.userService.useListAllUserData();
        return data;
    }
    async createUser(user) {
        try {
            const create = await this.userService.useCreateUser(user);
            return create;
        }
        catch (err) {
            throw new CreateUserError_1.CreateUserError();
        }
    }
    async login(ctx, user) {
        const login = await this.userService.useLoginUser(user);
        console.log("controller", login);
        if (login.message === UserStatus_1.UserStatus.Password_matched) {
            try {
                ctx.cookies.set("refreshToken", login.refreshToken);
            }
            catch (err) {
                console.log(err);
            }
            return "User logged in successfully";
        }
        else if (login.message === UserStatus_1.UserStatus.Invalid_password) {
            return "Invalid password";
        }
        else {
            throw new UserNotFound_1.UserNotFoundError(404, "Not found user!", "Not found");
        }
    }
    async refreshToken(refreshToken) {
        if (!refreshToken) {
            throw new TokenNotFound_1.TokenNotFoundError(404, "Refresh Token Not Found", "Not found");
        }
        else {
            const refresh = await this.userService.useRefreshTokenUser(refreshToken);
            return { message: "success", user: refresh };
        }
    }
    async logout(refreshToken, ctx) {
        if (!refreshToken) {
            throw new TokenNotFound_1.TokenNotFoundError(404, "Not found token!", "Not found");
        }
        const logout = await this.userService.useLogoutUser(refreshToken);
        if (logout == UserStatus_1.UserStatus.Not_found) {
            ctx.cookies.set("refreshToken", "");
            return "success";
        }
        else if (logout == UserStatus_1.UserStatus.Success) {
            ctx.cookies.set("refreshToken", "");
            return "success";
        }
    }
};
exports.UserController = UserController;
tslib_1.__decorate([
    (0, typedi_1.Inject)(),
    tslib_1.__metadata("design:type", UserService_1.UserService)
], UserController.prototype, "userService", void 0);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)("/users"),
    (0, routing_controllers_1.OnUndefined)(UserNotFound_1.UserNotFoundError),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "listAllUser", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)("/users"),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)("/login"),
    tslib_1.__param(0, (0, routing_controllers_1.Ctx)()),
    tslib_1.__param(1, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)("/refresh"),
    tslib_1.__param(0, (0, routing_controllers_1.CookieParam)("refreshToken")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "refreshToken", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)("/logout"),
    tslib_1.__param(0, (0, routing_controllers_1.CookieParam)("refreshToken")),
    tslib_1.__param(1, (0, routing_controllers_1.Ctx)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
exports.UserController = UserController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)()
], UserController);
//# sourceMappingURL=UserController.js.map