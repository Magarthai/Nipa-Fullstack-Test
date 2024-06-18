import { Inject, Service } from "typedi";
import { DashboardRepository } from "../repository/DashboardRepository";
import { ICountGroupByStatus } from "../dto/ICountGroupByStatus";
import { ITicketDataListOfMonthEnitityRespone } from "../dto/ITicketDataListOfMonthEnitityRespone";
import { TicketStatus } from "@app/API/Ticket/enum/TicketStatus";
import { IStatusRespone } from "../dto/IStatusRespone";

@Service()
export class DashboardService {
  @Inject()
  private dashboardRepositorys: DashboardRepository;

  async useListMonthTicket(): Promise<ITicketDataListOfMonthEnitityRespone[]> {
    const Tickets = await this.dashboardRepositorys.listMonthTicket();

    return Tickets;
  }

  async useGetSuccessErrorCount(): Promise<
    { name: string; value: number; fill: string }[]
  > {
    const Tickets = await this.dashboardRepositorys.listTicketGroupByStatus();
    const success = Tickets.find(
      (ticket: ICountGroupByStatus) => ticket.status == TicketStatus.SUCCESS
    );

    const reject = Tickets.find(
      (ticket: ICountGroupByStatus) => ticket.status == TicketStatus.REJECT
    );

    let data = [
      {
        name: "Success",
        value: success ? parseInt(success.count) : 0,
        fill: "#1f77b4",
      },
      {
        name: "Reject",
        value: reject ? parseInt(reject.count) : 0,
        fill: "#ff7f0e",
      },
    ];

    return data;
  }

  async useGetStatusCount(): Promise<IStatusRespone> {
    const Tickets = await this.dashboardRepositorys.listTicketGroupByStatus();

    const data = Tickets.reduce(
      (pre, current) => ({ ...pre, [current.status]: parseInt(current.count) }),
      {}
    );

    return data;
  }

  async useListStatusAdminCount(id: number): Promise<IStatusRespone> {
    const Tickets = await this.dashboardRepositorys.listTicketByRecipientID(id);
    const data = Tickets.reduce(
      (pre, current) => ({ ...pre, [current.status]: parseInt(current.count) }),
      {}
    );
    return data;
  }
}
