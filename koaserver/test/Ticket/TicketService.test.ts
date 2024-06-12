import "reflect-metadata";
import chai, { assert, expect } from "chai";

import Container, { Inject } from "typedi";
import {
  TicketRepository,
  MockTicketRepository,
} from "../../src/API/Ticket/repository/TicketRepository";
import { TicketService } from "@app/API/Ticket/view/TicketService";
import { equal } from "assert";
import { ITicketList } from "@app/API/Ticket/dto/ITicketList";
import { ITicketCreateRequest } from "@app/API/Ticket/dto/ITicketCreateRequest";
import { TicketStatus } from "@app/API/Ticket/enum/TicketStatus";
import { TicketUpdateStatus } from "@app/API/Ticket/enum/TicketUpdateStatus";
export const TicketServiceTest = () => {
  describe("TicketService", function () {
    before(() => {
      chai.should();
    });
    Container.set(TicketRepository, new MockTicketRepository());
    const ticketService = Container.get(TicketService);
    describe("listAllTicket", function () {
      it("should return ticket list of length 2", async function () {
        const data = await ticketService.useListAllTicket();
        data.length.should.equal(2);
      });
    });

    describe("getTicketByStatus", function () {
      it("should return ticket list that status equal success", async function () {
        const data = await ticketService.listTicketByStatus("success");
        data.data[0].status.should.equal("success");
      });
    });

    describe("createTicket", function () {
      it("should return ticket list with new data", async function () {
        const newTicket: ITicketCreateRequest = {
          name: "newTicket",
          email: "magargame@gmail.com",
          detail: "newproblem",
          img: "https://www.",
          status: "pending",
          selectTopic: "topic",
        };
        const createdTicket = await ticketService.createTicket(newTicket);
        createdTicket.data.id.should.to.deep.equal(3);
      });
    });

    describe("closeTicketById", function () {
      it("should reutrn updated ticket with new status", async function () {
        const updateData = {
          data: {
            updateStatus: "",
            id: 1,
            status: "reject",
            solve: "solve problem",
            recipient: "2",
            recipient_name: "test recipient",
          },
        };
        const updated = await ticketService.closeTicketById(2, updateData);
        console.log(updated.ticket.recipient);
        updated.message.should.equal(TicketUpdateStatus.SUCCESS);
      });
    });
  });
};
