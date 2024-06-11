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
import { FindTicketByIDRespone } from "./FindTicketByIDRespone";
import { ITicketUpdateRespone } from "./ITicketUpdateRespone";
import { IGetTicketByRecipientRespone } from "./IGetTicketByRecipientRespone";
import { ITicketCreateRespone } from "./ITicketCreateRespone";
import { ITicketEntity } from "@app/API/Dashboard/dto/ITicketEntity";
@Service()
export class TicketRepository {
  database: any;
  constructor() {
    this.database = db("ticket");
  }
  async listAllTicket(): Promise<ITicketList> {
    const data = await this.database.clone();
    console.log(data);
    return data;
  }
  async getTicketByStatus(
    status: string
  ): Promise<ITicketGetTicketByStatusRequest> {
    try {
      const data = await this.database
        .clone()
        .where("status", status)
        .orderBy("updated_at", "desc");
      console.log(data);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async updateStatusTicket(
    data: ITicketUpdateRequest
  ): Promise<ITicketUpdateRespone> {
    try {
      delete data.id;
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
      console.log(ticketData);
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
      console.log(create);

      return create;
    } catch (err) {
      throw err;
    }
  }
}
