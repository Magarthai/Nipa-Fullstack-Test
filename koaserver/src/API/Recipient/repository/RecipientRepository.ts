import { IGetTicketByRecipientRespone } from "@app/API/Ticket/repository/IGetTicketByRecipientRespone";
import db from "@app/db/db";
import { Knex } from "knex";
import { Service } from "typedi";

@Service()
export class RecipientRepository {
  database: Knex.QueryBuilder;
  constructor() {
    this.database = db("ticket");
  }

  async findTicketByRecipient(
    id: string
  ): Promise<IGetTicketByRecipientRespone> {
    try {
      const data = await this.database
        .clone()
        .where("recipient", id)
        .orderBy("updated_at", "desc");
      return data;
    } catch (err) {
      throw err;
    }
  }
}
