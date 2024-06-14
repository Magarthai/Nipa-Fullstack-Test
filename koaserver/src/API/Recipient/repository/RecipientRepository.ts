import { IGetTicketByRecipientRespone } from "@app/API/Ticket/dto/IGetTicketByRecipientRespone";
import db from "@app/db/db";
import MockDatabase from "@app/db/MockDatabase";
import { Knex } from "knex";
import { Service } from "typedi";

export interface IRecipientRepository {
  findTicketByRecipient(id: string): Promise<IGetTicketByRecipientRespone[]>;
}

@Service()
export class RecipientRepository {
  database: Knex.QueryBuilder;
  constructor() {
    this.database = db("ticket");
  }

  async findTicketByRecipient(
    id: string
  ): Promise<IGetTicketByRecipientRespone[]> {
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

@Service()
export class MockRecipientRepository implements IRecipientRepository {
  public mockTicketDatabase = MockDatabase;
  findTicketByRecipient(id: string): Promise<IGetTicketByRecipientRespone[]> {
    const filteredData = this.mockTicketDatabase.ticket.filter((ticket) => {
      return (ticket.recipient = id);
    });

    return Promise.resolve(filteredData);
  }
}
