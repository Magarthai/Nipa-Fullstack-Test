"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRepository = exports.formatDate = void 0;
const tslib_1 = require("tslib");
const moment_timezone_1 = tslib_1.__importDefault(require("moment-timezone"));
const typedi_1 = require("typedi");
const db_1 = tslib_1.__importDefault(require("../../../db/db"));
function formatDate(date) {
    const thaiTime = (0, moment_timezone_1.default)(date).tz("Asia/Bangkok");
    const formattedDate = thaiTime.format("วันที่ DD");
    return formattedDate;
}
exports.formatDate = formatDate;
let DashboardRepository = class DashboardRepository {
    constructor() {
        this.database = (0, db_1.default)("ticket");
    }
    async listMonthTicket() {
        try {
            let startOfMonth = (0, moment_timezone_1.default)().startOf("month").tz("Asia/Bangkok");
            let endOfMonth = (0, moment_timezone_1.default)().endOf("month").tz("Asia/Bangkok");
            const Tickets = await this.database
                .clone()
                .select(db_1.default.raw("created_at::date as create_date"))
                .count("*")
                .groupByRaw("created_at::date")
                .whereBetween("created_at", [startOfMonth, endOfMonth]);
            const formatTicketDate = Tickets.map((ticket) => {
                let date = formatDate(Tickets.create_date);
                return {
                    date: date,
                    value: ticket.count,
                };
            });
            const data = [];
            for (let date = startOfMonth.clone(); date.isBefore(endOfMonth); date.add(1, "day")) {
                const formattedDate = formatDate(date);
                const ticketForDate = formatTicketDate.find((ticket) => ticket.date === formattedDate);
                if (!ticketForDate) {
                    data.push({
                        date: formattedDate,
                        value: 0,
                    });
                }
                else {
                    data.push({
                        date: ticketForDate.date,
                        value: parseInt(ticketForDate.value),
                    });
                }
            }
            return data;
        }
        catch (err) {
            throw err;
        }
    }
    async listTicketGroupByStatus() {
        try {
            const Tickets = await this.database
                .clone()
                .count("*")
                .select("status")
                .groupBy("status");
            return Tickets;
        }
        catch (err) {
            throw err;
        }
    }
    async listTicketByRecipientID(id) {
        try {
            const Tickets = await this.database
                .clone()
                .where({ recipient: id });
            return Tickets;
        }
        catch (err) {
            throw err;
        }
    }
};
exports.DashboardRepository = DashboardRepository;
exports.DashboardRepository = DashboardRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], DashboardRepository);
//# sourceMappingURL=DashboardRepository.js.map