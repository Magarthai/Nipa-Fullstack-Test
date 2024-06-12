import { ITicketCreateRequest } from "../dto/ITicketCreateRequest";
import { ITicketUpdateRequest } from "../dto/ITicketUpdateRequest";
import { ITicketCloseRequest } from "../dto/ITicketCloseRequest";
import { ITicketSendEmailNotificationRequest } from "../dto/ITicketSendEmailNotificationRequest";
import { ListTicketDataReturn } from "../dto/ListTicketDataReturn";
import dotenv from "dotenv";
dotenv.config();
const nodemailer = require("nodemailer");
import db from "../../../db/db";
import { Service } from "typedi";
import { TicketStatus } from "../enum/TicketStatus";
import { Knex } from "knex";
import { ITicketList } from "../dto/ITicketList";
import { ITicketGetTicketByStatusRequest } from "../dto/ITicketGetTicketByStatusRequest";
import { IFindTicketByIDRespone } from "../dto/IFindTicketByIDRespone";
import { ITicketUpdateRespone } from "../dto/ITicketUpdateRespone";
import { IGetTicketByRecipientRespone } from "../dto/IGetTicketByRecipientRespone";
import { ITicketCreateRespone } from "../dto/ITicketCreateRespone";
import { ITicketEntity } from "@app/API/Dashboard/dto/ITicketEntity";
import { ICountGroupByStatus } from "@app/API/Dashboard/repository/DashboardRepository";
import { create } from "domain";
export interface ITicketRepository {
  listAllTicket(): Promise<ITicketList[]>;
  listTicketByStatus(
    status: string
  ): Promise<ITicketGetTicketByStatusRequest[]>;
  updateStatusTicket(data: ITicketUpdateRequest): Promise<ITicketUpdateRespone>;
  findTicketByID(id: number): Promise<ITicketEntity>;
  updateTicketById(
    id: number,
    data: IUpdateDataRequest
  ): Promise<ITicketUpdateRequest>;
  createTicket(ticket: ITicketCreateRequest): Promise<ITicketCreateRespone>;
}

interface IUpdateDataRequest {
  solve: string;
  status: string;
}

@Service()
export class TicketRepository implements ITicketRepository {
  database: any;
  constructor() {
    this.database = db("ticket");
  }
  async listAllTicket(): Promise<ITicketList[]> {
    const data = await this.database.clone();
    return data;
  }
  async listTicketByStatus(
    status: string
  ): Promise<ITicketGetTicketByStatusRequest[]> {
    try {
      const data = await this.database
        .clone()
        .where("status", status)
        .orderBy("updated_at", "desc");
      return data;
    } catch (err) {
      throw err;
    }
  }

  async updateTicketById(
    id: number,
    data: IUpdateDataRequest
  ): Promise<ITicketUpdateRequest> {
    try {
      const updatedTicket: ITicketUpdateRequest = await this.database
        .clone()
        .where({ id: id })
        .update(data);
      return updatedTicket;
    } catch (err) {
      throw err;
    }
  }

  async updateStatusTicket(
    data: ITicketUpdateRequest
  ): Promise<ITicketUpdateRespone> {
    try {
      const ticketData: ITicketUpdateRespone = await this.database
        .clone()
        .update(data)
        .where("id", data.id);
      return ticketData;
    } catch (err) {
      throw err;
    }
  }

  async findTicketByID(id: number): Promise<ITicketEntity> {
    try {
      const ticketData = await this.database.clone().where("id", id).first();
      return ticketData;
    } catch (err) {
      throw err;
    }
  }

  async createTicket(
    ticket: ITicketCreateRequest
  ): Promise<ITicketCreateRespone> {
    try {
      const create = await this.database
        .clone()
        .insert(ticket)
        .returning([ListTicketDataReturn]);

      return create;
    } catch (err) {
      throw err;
    }
  }
}

@Service()
export class MockTicketRepository implements ITicketRepository {
  private defaultTicketData: ITicketList[] = [
    {
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
      solve: "",
    },
  ];
  updateTicketById(
    id: number,
    data: IUpdateDataRequest
  ): Promise<ITicketUpdateRequest> {
    const oldData = this.defaultTicketData;
    oldData.forEach((ticket, index) => {
      if (ticket.id === id) {
        oldData[index].status === data.status;
        oldData[index].solve === data.solve;
        oldData[index].updated_at === new Date();
      }
    });
    const findData: ITicketList = oldData.find((ticket) => {
      return (ticket.id = id);
    });

    const newData = {
      id: findData.id,
      status: findData.status,
      recipient: findData.recipient,
      recipient_name: findData.recipient_name,
      solve: findData.solve,
    };
    return Promise.resolve(newData);
  }

  listTicketByStatus(
    status: string
  ): Promise<ITicketGetTicketByStatusRequest[]> {
    const Tickets = this.defaultTicketData.filter((ticket) => {
      return ticket.status == "success";
    });

    return Promise.resolve(Tickets);
  }

  updateStatusTicket(
    data: ITicketUpdateRequest
  ): Promise<ITicketUpdateRespone> {
    const oldData = this.defaultTicketData;
    oldData.forEach((ticket, index) => {
      if (ticket.id === data.id) {
        oldData[index].status === data.status;
        oldData[index].solve === data.solve;
        oldData[index].updated_at === new Date();
        oldData[index].recipient === data.recipient;
        oldData[index].recipient_name === data.recipient_name;
      }
    });
    const newData = oldData.find((ticket) => {
      ticket.id = data.id;
    });
    return Promise.resolve(newData);
  }
  findTicketByID(id: number): Promise<ITicketEntity> {
    const ticket = this.defaultTicketData.find((ticket) => {
      return (ticket.id = id);
    });
    console.log(ticket);
    return Promise.resolve(ticket);
  }
  createTicket(ticket: ITicketCreateRequest): Promise<ITicketCreateRespone> {
    const ticketData = {
      ...ticket,
      id: 3,
      created_at: new Date(),
      updated_at: new Date(),
      recipient: "",
      recipient_name: "",
    };

    const newListData = [...this.defaultTicketData, ticketData];
    const responeData: any = newListData.filter((ticket) => {
      return ticket.id == 3;
    });
    return Promise.resolve(responeData[0]);
  }

  listAllTicket(): Promise<ITicketList[]> {
    const Ticket = this.defaultTicketData;
    return Promise.resolve(Ticket);
  }
}
