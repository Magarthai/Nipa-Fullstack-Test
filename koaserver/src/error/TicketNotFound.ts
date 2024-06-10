import { HttpError } from "routing-controllers";

export class TicketNotFoundError extends HttpError {
  constructor(status: number, message: string, name: string) {
    super(status, message);
  }
}
