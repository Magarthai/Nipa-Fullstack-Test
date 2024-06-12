"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const DashboardRepository_1 = require("../repository/DashboardRepository");
const TicketStatus_1 = require("@app/API/Ticket/enum/TicketStatus");
let DashboardService = class DashboardService {
    async useListMonthTicket() {
        const Tickets = await this.dashboardRepositorys.listMonthTicket();
        return Tickets;
    }
    async useGetSuccessErrorCount() {
        const Tickets = await this.dashboardRepositorys.listTicketGroupByStatus();
        console.log(Tickets);
        const success = Tickets.find((ticket) => ticket.status == TicketStatus_1.TicketStatus.SUCCESS);
        const reject = Tickets.find((ticket) => ticket.status == TicketStatus_1.TicketStatus.REJECT);
        let data = [
            {
                name: "Success",
                value: success ? parseInt(success.count) : 0,
                fill: "#1f77b4",
            },
            {
                name: "Reject",
                value: reject ? parseInt(reject.count) : 0,
                fill: "#ff7f0e",
            },
        ];
        return data;
    }
    async useGetStatusCount() {
        const Tickets = await this.dashboardRepositorys.listTicketGroupByStatus();
        const data = Tickets.reduce((pre, current) => ({ ...pre, [current.status]: parseInt(current.count) }), {});
        return data;
    }
    async useListStatusAdminCount(id) {
        const Tickets = await this.dashboardRepositorys.listTicketByRecipientID(id);
        let data = {
            pending: 0,
            accepted: 0,
            success: 0,
            reject: 0,
        };
        if (Tickets) {
            Tickets.forEach((ticket) => {
                if (ticket.status == TicketStatus_1.TicketStatus.PENDING) {
                    data.pending++;
                }
                else if (ticket.status == TicketStatus_1.TicketStatus.ACCEPTED) {
                    data.accepted++;
                }
                else if (ticket.status == TicketStatus_1.TicketStatus.REJECT) {
                    data.reject++;
                }
                else if (ticket.status == TicketStatus_1.TicketStatus.SUCCESS) {
                    data.success++;
                }
            });
            return data;
        }
        else {
            return data;
        }
    }
};
exports.DashboardService = DashboardService;
tslib_1.__decorate([
    (0, typedi_1.Inject)(),
    tslib_1.__metadata("design:type", DashboardRepository_1.DashboardRepository)
], DashboardService.prototype, "dashboardRepositorys", void 0);
exports.DashboardService = DashboardService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], DashboardService);
//# sourceMappingURL=DashboardService.js.map