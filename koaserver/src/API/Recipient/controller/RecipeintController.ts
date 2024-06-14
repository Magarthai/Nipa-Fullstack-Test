import { Param, Get, JsonController } from "routing-controllers";
import { Inject, Service } from "typedi";
import { RecipientService } from "../view/RecipientService";
import { IGetTicketByRecipientRespone } from "@app/API/Ticket/dto/IGetTicketByRecipientRespone";
import { GenericGetTicketByRecipientRespone } from "./GenericGetTicketByRecipientRespone";

@Service()
@JsonController("/recipients")
export class RecipeintController {
  @Inject()
  private recipientServices: RecipientService;

  @Get("/:recipient_id/tickets")
  async getTicketByRecipient(
    @Param("recipient_id") recipient_id: string
  ): Promise<
    GenericGetTicketByRecipientRespone<IGetTicketByRecipientRespone[]>
  > {
    const fetchTicketById = await this.recipientServices.getTicketByRecipient(
      recipient_id
    );
    return {
      message: "Ticket fetch successfully",
      ticket: fetchTicketById,
    };
  }
}
