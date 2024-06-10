import { HttpError } from "routing-controllers";

export class UserNotFoundError extends HttpError {
  constructor(status: number, message: string, name: string) {
    super(status, message);
    this.name = name;
  }
}
