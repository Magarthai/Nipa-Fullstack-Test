import "reflect-metadata";
import chai from "chai";
import Container from "typedi";
import {
  TicketRepository,
  MockTicketRepository,
} from "../../src/API/Ticket/repository/TicketRepository";
import { TicketService } from "@app/API/Ticket/view/TicketService";
import { ITicketCreateRequest } from "@app/API/Ticket/dto/ITicketCreateRequest";
import { TicketStatus } from "@app/API/Ticket/enum/TicketStatus";
import { TicketUpdateStatus } from "@app/API/Ticket/enum/TicketUpdateStatus";
import MockDatabase from "@app/db/MockDatabase";
import chariAsPromised from "chai-as-promised";
import { TicketStatusError } from "@app/error/TicketStatusError";

export const TicketServiceTest = () => {
  describe("TicketService", function () {
    before(() => {
      chai.should();
      chai.use(chariAsPromised);
    });

    this.afterEach(() => {
      const mockDatabase = MockDatabase;
      mockDatabase.ticket = [];
    });
    Container.set(TicketRepository, Container.get(MockTicketRepository));
    const ticketService = Container.get(TicketService);

    describe("listAllTicket", function () {
      it("should return ticket list of length 0 not undefine", async function () {
        const data = await ticketService.useListAllTicket();
        data.length.should.equal(0);
      });

      it("should return ticket list of length 1", async function () {
        const mockDatabase = MockDatabase;
        mockDatabase.ticket.push({
          id: 1,
          name: "mock",
          email: "test1234",
          detail: "test",
          selectTopic: "testTopic",
          img: "http://",
          recipient: null,
          recipient_name: null,
          status: "accepted",
          created_at: new Date("2024-06-07 09:12:28.764133+07"),
          updated_at: new Date("2024-06-07 15:02:57.81708+07"),
          solve: "",
        });
        const data = await ticketService.useListAllTicket();

        data.length.should.equal(1);
      });
    });

    describe("getTicketByStatus", function () {
      it("should return ticket list that status equal status success", async function () {
        const mockDatabase = MockDatabase;
        mockDatabase.ticket.push(
          {
            id: 1,
            name: "mock",
            email: "test1234@gmail.com",
            detail: "test",
            selectTopic: "testTopic",
            img: "http://",
            recipient: null,
            recipient_name: null,
            status: "success",
            created_at: new Date("2024-06-07 09:12:28.764133+07"),
            updated_at: new Date("2024-06-07 15:02:57.81708+07"),
            solve: "",
          },
          {
            id: 2,
            name: "mock2",
            email: "test2@gmail.com",
            detail: "test2",
            selectTopic: "testTopic2",
            img: "http://2",
            recipient: null,
            recipient_name: null,
            status: "pending",
            created_at: new Date("2024-06-07 09:12:28.764133+07"),
            updated_at: new Date("2024-06-07 15:02:57.81708+07"),
            solve: "",
          }
        );

        const data = await ticketService.listTicketByStatus("success");
        data.data[0].status.should.equal("success");
      });

      it("should return ticket status not in list", async function () {
        const mockDatabase = MockDatabase;
        mockDatabase.ticket.push(
          {
            id: 1,
            name: "mock",
            email: "test1234@gmail.com",
            detail: "test",
            selectTopic: "testTopic",
            img: "http://",
            recipient: null,
            recipient_name: null,
            status: "success",
            created_at: new Date("2024-06-07 09:12:28.764133+07"),
            updated_at: new Date("2024-06-07 15:02:57.81708+07"),
            solve: "",
          },
          {
            id: 2,
            name: "mock2",
            email: "test2@gmail.com",
            detail: "test2",
            selectTopic: "testTopic2",
            img: "http://2",
            recipient: null,
            recipient_name: null,
            status: "pending",
            created_at: new Date("2024-06-07 09:12:28.764133+07"),
            updated_at: new Date("2024-06-07 15:02:57.81708+07"),
            solve: "",
          }
        );
        await ticketService
          .listTicketByStatus("")
          .should.eventually.rejectedWith(TicketStatusError);
      });
    });

    describe("createTicket", function () {
      it("should return ticket list with new ObjectID", async function () {
        const mockDatabase = MockDatabase;
        mockDatabase.ticket.push({
          id: 3,
          name: "mock",
          email: "test1234@gmail.con",
          detail: "test",
          selectTopic: "testTopic",
          img: "http://",
          recipient: null,
          recipient_name: null,
          status: "accepted",
          created_at: new Date("2024-06-07 09:12:28.764133+07"),
          updated_at: new Date("2024-06-07 15:02:57.81708+07"),
          solve: "",
        });
        const newTicket: ITicketCreateRequest = {
          name: "newTicket",
          email: "magargame@gmail.com",
          detail: "newproblem",
          img: "https://www.",
          status: "pending",
          selectTopic: "topic",
        };
        const createdTicket = await ticketService.createTicket(newTicket);
        createdTicket.data.id.should.to.deep.equal(4);
      });
    });

    describe("closeTicketById", function () {
      it("should reutrn updated ticket with new status", async function () {
        const mockDatabase = MockDatabase;
        mockDatabase.ticket.push(
          {
            id: 1,
            name: "mock",
            email: "test1234@gmail.com",
            detail: "test",
            selectTopic: "testTopic",
            img: "http://",
            recipient: null,
            recipient_name: null,
            status: TicketStatus.ACCEPTED,
            created_at: new Date("2024-06-07 09:12:28.764133+07"),
            updated_at: new Date("2024-06-07 15:02:57.81708+07"),
            solve: "",
          },
          {
            id: 2,
            name: "mock2",
            email: "test2@gmail.com",
            detail: "test2",
            selectTopic: "testTopic2",
            img: "http://2",
            recipient: null,
            recipient_name: null,
            status: TicketStatus.PENDING,
            created_at: new Date("2024-06-07 09:12:28.764133+07"),
            updated_at: new Date("2024-06-07 15:02:57.81708+07"),
            solve: "",
          }
        );
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
        updated.message.should.equal(TicketUpdateStatus.SUCCESS);
      });
    });
  });
};
