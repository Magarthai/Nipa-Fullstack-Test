"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const generateRefreshToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || "secret", {
        expiresIn: "1d",
    });
};
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=generateRefreshToken.1.js.map