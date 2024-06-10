import { HttpError } from "routing-controllers";

export class CreateUserError extends HttpError {
  constructor() {
    super(500, "Internet server error!");
  }
}
