import { HttpError } from "routing-controllers";

export class TokenExpired extends Error {
  constructor() {
    super("Token Expired");
  }
}
