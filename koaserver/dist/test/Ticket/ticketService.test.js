"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketServiceTest = void 0;
const tslib_1 = require("tslib");
const chai_1 = require("chai");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
const TicketRepository_1 = require("../../src/API/Ticket/repository/TicketRepository");
const TicketServiceTest = () => {
    describe("UserService", function () {
        describe("listAllTicket", function async() {
            it("should return ticket list 2 lenght");
            const ticketRepository = typedi_1.default.get(TicketRepository_1.MockTicketRepository);
            const data = ticketRepository.listAllTicket();
            const expectData = [
                {
                    id: 1,
                    name: "mock",
                    email: "test1234",
                    detail: "test",
                    selectTopic: "testTopic",
                    img: "http://",
                    recipient: "test",
                    recipient_name: "test",
                    status: "pending",
                    created_at: new Date("2024-06-07 09:12:28.764133+07"),
                    updated_at: new Date("2024-06-07 15:02:57.81708+07"),
                },
                {
                    id: 2,
                    name: "mock2",
                    email: "test21234",
                    detail: "test2",
                    selectTopic: "testTopic2",
                    img: "http://2",
                    recipient: "test2",
                    recipient_name: "test2",
                    status: "success",
                    created_at: new Date("2024-06-07 09:12:28.764133+07"),
                    updated_at: new Date("2024-06-07 15:02:57.81708+07"),
                },
            ];
            (0, chai_1.expect)(data);
        });
    });
};
exports.TicketServiceTest = TicketServiceTest;
//# sourceMappingURL=ticketService.test.js.map