import { Param, Get, JsonController } from "routing-controllers";

import { TicketService } from "../../Ticket/view/TicketService";
import { Inject, Service } from "typedi";
import { IGetTicketByRecipientRespone } from "../../Ticket/repository/IGetTicketByRecipientRespone";
import { RecipientService } from "../view/RecipientService";
@Service()
@JsonController("/recipients")
export class RecipeintController {
  @Inject()
  private recipientServices: RecipientService;

  @Get("/:recipient_id/tickets")
  async getTicketByRecipient(
    @Param("recipient_id") recipient_id: string
  ): Promise<{
    message: string;
    ticket: { message: string; data: IGetTicketByRecipientRespone };
  }> {
    const fetchTicketById = await this.recipientServices.getTicketByRecipient(
      recipient_id
    );
    return {
      message: "Ticket fetch successfully",
      ticket: fetchTicketById,
    };
  }
}
