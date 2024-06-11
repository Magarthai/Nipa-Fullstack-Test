import { IGetTicketByRecipientRespone } from "@app/API/Ticket/repository/IGetTicketByRecipientRespone";
import { TicketRepository } from "@app/API/Ticket/repository/TicketRepository";
import { Inject, Service } from "typedi";
import { RecipientRepository } from "../repository/RecipientRepository";

@Service()
export class RecipientService {
  @Inject()
  private recipientRepositorys: RecipientRepository;

  async getTicketByRecipient(
    id: string
  ): Promise<{ message: string; data: IGetTicketByRecipientRespone }> {
    const data = await this.recipientRepositorys.findTicketByRecipient(id);
    return { message: "success", data: data };
  }
}
