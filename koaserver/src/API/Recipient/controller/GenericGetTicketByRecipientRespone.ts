export interface GenericGetTicketByRecipientRespone<T> {
  message: string;
  ticket: {
    message: string;
    data: T;
  };
}
