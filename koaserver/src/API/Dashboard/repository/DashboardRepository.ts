import moment from "moment-timezone";
import { ITicketEntity } from "../dto/ITicketEntity";
import { Service } from "typedi";
import db from "../../../db/db";
import { TicketStatus } from "@app/API/Ticket/enum/TicketStatus";
import knex, { Knex } from "knex";
import { ITicketMapEnitity } from "../dto/ITicketMapEnitity";
import { ITicketDataListOfMonthEnitityRespone } from "../dto/ITicketDataListOfMonthEnitityRespone";
export function formatDate(date: moment.Moment) {
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
  async listMonthTicket(): Promise<ITicketDataListOfMonthEnitityRespone[]> {
    try {
      let startOfMonth = moment().startOf("month").tz("Asia/Bangkok");
      let endOfMonth = moment().endOf("month").tz("Asia/Bangkok");

      const Tickets = await this.database
        .clone()
        .select(db.raw("created_at::date as create_date"))
        .count("*")
        .groupByRaw("created_at::date")
        .whereBetween("created_at", [startOfMonth, endOfMonth]);

      const formatTicketDate = Tickets.map((ticket: ITicketMapEnitity) => {
        let date = formatDate(Tickets.create_date);
        return {
          date: date,
          value: ticket.count,
        };
      });

      const data: ITicketDataListOfMonthEnitityRespone[] = [];

      for (
        let date: moment.Moment = startOfMonth.clone();
        date.isBefore(endOfMonth);
        date.add(1, "day")
      ) {
        const formattedDate = formatDate(date);
        const ticketForDate = formatTicketDate.find(
          (ticket: ITicketDataListOfMonthEnitityRespone) =>
            ticket.date === formattedDate
        );
        if (!ticketForDate) {
          data.push({
            date: formattedDate,
            value: 0,
          });
        } else {
          data.push({
            date: ticketForDate.date,
            value: parseInt(ticketForDate.value),
          });
        }
      }
      return data;
    } catch (err) {
      throw err;
    }
  }

  async listTicketGroupByStatus(): Promise<ICountGroupByStatus[]> {
    try {
      const Tickets = await this.database
        .clone()
        .count("*")
        .select("status")
        .groupBy("status");

      return Tickets;
    } catch (err) {
      throw err;
    }
  }

  async listTicketByRecipientID(id: number): Promise<ITicketEntity[]> {
    try {
      const Tickets: ITicketEntity[] = await this.database
        .clone()
        .where({ recipient: id });

      return Tickets;
    } catch (err) {
      throw err;
    }
  }
}

export interface ICountGroupByStatus {
  count: string | "0";
  status: string;
}
