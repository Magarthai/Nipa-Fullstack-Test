import { IGetTicketByRecipientRespone } from "@app/API/Ticket/dto/IGetTicketByRecipientRespone";
import { TicketRepository } from "@app/API/Ticket/repository/TicketRepository";
import { Inject, Service } from "typedi";
import { RecipientRepository } from "../repository/RecipientRepository";
import { GenericRecipientRespone } from "../dto/GenericRecipientRespone";

@Service()
export class RecipientService {
  @Inject()
  private recipientRepositorys: RecipientRepository;

  async getTicketByRecipient(
    id: string
  ): Promise<GenericRecipientRespone<IGetTicketByRecipientRespone[]>> {
    const data = await this.recipientRepositorys.findTicketByRecipient(id);
    return { message: "success", data: data };
  }
}
