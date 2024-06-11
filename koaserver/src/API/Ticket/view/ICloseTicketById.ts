import { ITicketUpdateRequest } from "../dto/ITicketUpdateRequest";

export interface ICloseTicketById {
  message: string;
  ticket?: ITicketUpdateRequest;
}
