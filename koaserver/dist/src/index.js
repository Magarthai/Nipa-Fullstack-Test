"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const ErrorMiddleware_1 = require("./middleware/ErrorMiddleware");
const UserController_1 = require("./API/User/controller/UserController");
const koa_bodyparser_1 = tslib_1.__importDefault(require("koa-bodyparser"));
const DashboardController_1 = require("./API/Dashboard/controller/DashboardController");
const TicketController_1 = require("./API/Ticket/controller/TicketController");
const RecipeintController_1 = require("./API/Recipient/controller/RecipeintController");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
(0, routing_controllers_1.useContainer)(typedi_1.default);
const koaApp = (0, routing_controllers_1.createKoaServer)({
    cors: {
        credentials: true,
        origin: ["http://localhost:3000"],
    },
    defaultErrorHandler: false,
    controllers: [
        UserController_1.UserController,
        DashboardController_1.DashboardControllers,
        TicketController_1.TicketController,
        RecipeintController_1.RecipeintController,
    ],
    middlewares: [ErrorMiddleware_1.ErrorMiddleware],
});
koaApp.use((0, koa_bodyparser_1.default)({
    enableTypes: ["json", "form"],
    formLimit: "100kb",
}));
koaApp.listen(port);
console.log(`Server is up and running at port ${port}`);
//# sourceMappingURL=index.js.map