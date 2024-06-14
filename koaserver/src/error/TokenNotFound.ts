import { HttpError } from "routing-controllers";

export class TokenNotFoundError extends Error {
  constructor() {
    super("Token Not Found");
  }
}
