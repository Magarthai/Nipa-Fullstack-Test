import moment from "moment-timezone";
import { ITicketEntity } from "./ITicketEntity";
import { Service } from "typedi";
import db from "../../../db/db";
import { TicketStatus } from "@app/API/Ticket/repository/TicketStatus";
import { groupBy } from "./groupBy.2";
import { Knex } from "knex";
export function formatDate(date: string) {
  const thaiTime = moment(date).tz("Asia/Bangkok");
  const formattedDate = thaiTime.format("วันที่ DD");
  return formattedDate;
}

@Service()
export class DashboardRepository {
  database: Knex.QueryBuilder;
  constructor() {
    this.database = db("ticket");
  }
  async listMonthTicket() {
    try {
      let startOfMonth = moment().startOf("month").tz("Asia/Bangkok");
      let endOfMonth = moment().endOf("month").tz("Asia/Bangkok");

      const Tickets = await db("ticket").whereBetween("created_at", [
        startOfMonth,
        endOfMonth,
      ]);

      return Tickets;
    } catch (err) {
      throw err;
    }
  }

  async getSuccessErrorCount() {
    try {
      const Tickets = await this.database.clone();
      return Tickets;
    } catch (err) {
      throw err;
    }
  }

  async getStatusCount() {
    try {
      const fetchTicket: ITicketEntity[] = await this.database.clone();

      return fetchTicket;
    } catch (err) {
      throw err;
    }
  }

  async listStatusAdminCount(id: number) {
    try {
      console.log(id);
      const fetchTicket = await this.database.clone().where({ recipient: id });

      return fetchTicket;
    } catch (err) {
      throw err;
    }
  }
}
