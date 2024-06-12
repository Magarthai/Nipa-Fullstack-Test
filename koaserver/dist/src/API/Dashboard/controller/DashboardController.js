"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardControllers = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const DashboardService_1 = require("../view/DashboardService");
const typedi_1 = require("typedi");
let DashboardControllers = class DashboardControllers {
    async listMonthTicket() {
        const data = await this.dashboardServices.useListMonthTicket();
        return data;
    }
    async getStatusCount() {
        const data = await this.dashboardServices.useGetStatusCount();
        return data;
    }
    async getSuccessErrorCount() {
        const data = await this.dashboardServices.useGetSuccessErrorCount();
        return data;
    }
    async getStatusAdminCount(id) {
        const data = await this.dashboardServices.useListStatusAdminCount(id);
        return data;
    }
};
exports.DashboardControllers = DashboardControllers;
tslib_1.__decorate([
    (0, typedi_1.Inject)(),
    tslib_1.__metadata("design:type", DashboardService_1.DashboardService)
], DashboardControllers.prototype, "dashboardServices", void 0);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)("/"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DashboardControllers.prototype, "listMonthTicket", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)("/count"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DashboardControllers.prototype, "getStatusCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)("/success_error"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DashboardControllers.prototype, "getSuccessErrorCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)("/:id"),
    tslib_1.__param(0, (0, routing_controllers_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], DashboardControllers.prototype, "getStatusAdminCount", null);
exports.DashboardControllers = DashboardControllers = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/dashboards")
], DashboardControllers);
//# sourceMappingURL=DashboardController.js.map