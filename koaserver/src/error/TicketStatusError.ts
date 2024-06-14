import { HttpError } from "routing-controllers";

export class TicketStatusError extends Error {
  constructor() {
    super("Status not in list");
  }
}
