import { HttpError } from "routing-controllers";

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(404, message);
  }
}

export class TicketNotFoundError extends NotFoundError {
  constructor(message?: string) {
    super(message ?? "Ticket not found.");
  }
}
