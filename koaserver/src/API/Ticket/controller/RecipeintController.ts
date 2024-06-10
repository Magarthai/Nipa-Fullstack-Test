import { Param, Get, JsonController } from "routing-controllers";

import { TicketService } from "../view/TicketService";
import { Inject, Service } from "typedi";
@Service()
@JsonController("/recipients")
export class RecipeintController {
  @Inject()
  private ticketService: TicketService;

  @Get("/:recipient_id")
  async getTicketByRecipient(@Param("recipient_id") recipient_id: string) {
    const fetchTicketById = await this.ticketService.useGetTicketByRecipient(
      recipient_id
    );
    return {
      message: "Ticket fetch successfully",
      ticket: fetchTicketById,
    };
  }
}
