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
export interface ITicketRepository {
  listAllTicket(): Promise<ITicketList[]>;
  getTicketByStatus(status: string): Promise<ITicketGetTicketByStatusRequest[]>;
  updateStatusTicket(data: ITicketUpdateRequest): Promise<ITicketUpdateRespone>;
  findTicketByID(id: string): Promise<ITicketEntity>;
  createTicket(ticket: ITicketCreateRequest): Promise<ITicketCreateRespone>;
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
  async getTicketByStatus(
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

  async updateStatusTicket(
    data: ITicketUpdateRequest
  ): Promise<ITicketUpdateRespone> {
    try {
      const ticketData: ITicketUpdateRespone = await db("ticket")
        .update(data)
        .where("id", data.id);
      return ticketData;
    } catch (err) {
      throw err;
    }
  }

  async findTicketByID(id: string): Promise<ITicketEntity> {
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

export class MockTicketRepository implements ITicketRepository {
  private defaultUserData: ITicketList[] = [
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

  listAllTicket(): Promise<ITicketList[]> {
    const Ticket: ITicketList[] = this.defaultUserData;
    return Promise.resolve(Ticket);
  }
  getTicketByStatus(
    status: string
  ): Promise<ITicketGetTicketByStatusRequest[]> {
    throw new Error("Method not implemented.");
  }
  updateStatusTicket(
    data: ITicketUpdateRequest
  ): Promise<ITicketUpdateRespone> {
    throw new Error("Method not implemented.");
  }
  findTicketByID(id: string): Promise<ITicketEntity> {
    throw new Error("Method not implemented.");
  }
  createTicket(ticket: ITicketCreateRequest): Promise<ITicketCreateRespone> {
    throw new Error("Method not implemented.");
  }
}
