import "reflect-metadata";
import chai from "chai";
import {
  MockRecipientRepository,
  RecipientRepository,
} from "@app/API/Recipient/repository/RecipientRepository";
import { RecipientService } from "@app/API/Recipient/view/RecipientService";
import MockDatabase from "@app/db/MockDatabase";

import Container from "typedi";
export const RecipientServiceTest = () => {
  describe("RecipientService", function () {
    before(() => {
      chai.should();
    });
    this.afterEach(() => {
      MockDatabase.ticket = [];
    });
    Container.set(RecipientRepository, Container.get(MockRecipientRepository));
    const recipientServices = Container.get(RecipientService);
    describe("getTicketByRecipient", function () {
      it("should return data length equal 1", async function () {
        MockDatabase.ticket.push({
          id: 1,
          name: "mock",
          email: "test1234",
          detail: "test",
          selectTopic: "testTopic",
          img: "http://",
          recipient: "1",
          recipient_name: "recipient",
          status: "accepted",
          created_at: new Date("2024-06-07 09:12:28.764133+07"),
          updated_at: new Date("2024-06-07 15:02:57.81708+07"),
          solve: "",
        });

        const getTicketByRecipient =
          await recipientServices.getTicketByRecipient("1");
        getTicketByRecipient.data.length.should.equal(1);
      });

      it("should return data length equal 0", async function () {
        MockDatabase.ticket.push({
          id: 1,
          name: "mock",
          email: "test1234",
          detail: "test",
          selectTopic: "testTopic",
          img: "http://",
          recipient: "1",
          recipient_name: "recipient",
          status: "accepted",
          created_at: new Date("2024-06-07 09:12:28.764133+07"),
          updated_at: new Date("2024-06-07 15:02:57.81708+07"),
          solve: "",
        });

        const getTicketByRecipient =
          await recipientServices.getTicketByRecipient("");

        getTicketByRecipient.data.length.should.equal(0);
      });

      it("should return data length equal 0 when get undefined value", async function () {
        MockDatabase.ticket.push({
          id: 1,
          name: "mock",
          email: "test1234",
          detail: "test",
          selectTopic: "testTopic",
          img: "http://",
          recipient: "1",
          recipient_name: "recipient",
          status: "accepted",
          created_at: new Date("2024-06-07 09:12:28.764133+07"),
          updated_at: new Date("2024-06-07 15:02:57.81708+07"),
          solve: "",
        });

        const getTicketByRecipient =
          await recipientServices.getTicketByRecipient(undefined);

        getTicketByRecipient.data.length.should.equal(0);
      });
    });
  });
};
