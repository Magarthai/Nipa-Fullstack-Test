import { HttpError } from "routing-controllers";

export class TokenNotFoundError extends HttpError {
  constructor(status: number, message: string, name: string) {
    super(status, message);
    this.name = name;
  }
}
