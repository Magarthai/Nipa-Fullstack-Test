import { ITicketUpdateRequest } from "./ITicketUpdateRequest";

export interface ICloseTicketById {
  message: string;
  ticket?: ITicketUpdateRequest;
}
