import { assert, expect } from "chai";
import sinon from "sinon";

import Container, { Inject } from "typedi";
import { MockTicketRepository } from "../../src/API/Ticket/repository/TicketRepository";

export const TicketServiceTest = () => {
  describe("UserService", function () {
    describe("listAllTicket", function async() {
      it("should return ticket list 2 lenght");
      const ticketRepository = Container.get(MockTicketRepository);
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
      expect(data);
    });
  });
};
