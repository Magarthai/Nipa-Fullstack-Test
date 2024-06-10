import { Inject, Service } from "typedi";
import {
  DashboardRepository,
  formatDate,
} from "../repository/DashboardRepository";
import { ITicketEntity } from "../repository/ITicketEntity";
import { groupBy } from "../repository/groupBy";
import moment from "moment-timezone";
import { TicketStatus } from "@app/API/Ticket/enum/TicketStatus";
@Service()
export class DashboardService {
  @Inject()
  private dashboardRepositorys: DashboardRepository;

  async useListMonthTicket() {
    const Tickets = await this.dashboardRepositorys.listMonthTicket();
    const groupedData = groupBy(Tickets, "created_at");
    const data = [];
    let startOfMonth = moment().startOf("month").tz("Asia/Bangkok");
    let endOfMonth = moment().endOf("month").tz("Asia/Bangkok");
    for (
      let date: any = startOfMonth.clone();
      date.isBefore(endOfMonth);
      date.add(1, "day")
    ) {
      const formattedDate = formatDate(date);

      if (groupedData.hasOwnProperty(formattedDate)) {
        const listData = groupedData[formattedDate];
        const info = {
          date: formattedDate,
          value: listData.length,
        };

        data.push(info);
      } else {
        const defaultInfo = {
          date: formattedDate,
          value: 0,
        };
        data.push(defaultInfo);
      }
    }
    const sortedData = data.sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("-")).valueOf();
      const dateB = new Date(b.date.split("/").reverse().join("-")).valueOf();
      return dateA - dateB;
    });
    return sortedData;
  }

  async useGetSuccessErrorCount() {
    const Tickets = await this.dashboardRepositorys.getSuccessErrorCount();
    let data = [
      { name: "Success", value: 0, fill: "#1f77b4" },
      { name: "Reject", value: 0, fill: "#ff7f0e" },
    ];
    if (Tickets) {
      Tickets.forEach((Ticket: { status: string }) => {
        if (Ticket.status == "success") {
          data[0].value++;
        } else if (Ticket.status == "reject") {
          data[1].value++;
        }
      });
    }
    return data;
  }

  async useGetStatusCount() {
    const Tickets = await this.dashboardRepositorys.getStatusCount();
    let data = {
      pending: 0,
      accepted: 0,
      success: 0,
      reject: 0,
    };
    if (Tickets) {
      Tickets.forEach((ticket) => {
        if (ticket.status == TicketStatus.PENDING) {
          data.pending++;
        } else if (ticket.status == TicketStatus.ACCEPTED) {
          data.accepted++;
        } else if (ticket.status == TicketStatus.REJECT) {
          data.reject++;
        } else if (ticket.status == TicketStatus.SUCCESS) {
          data.success++;
        }
      });

      return data;
    } else {
      return data;
    }
  }

  async useListStatusAdminCount(id: number) {
    const Tickets: any = await this.dashboardRepositorys.listStatusAdminCount(
      id
    );
    let data = {
      pending: 0,
      accepted: 0,
      success: 0,
      reject: 0,
    };

    if (Tickets) {
      Tickets.forEach((ticket: { status: string }) => {
        if (ticket.status == TicketStatus.PENDING) {
          data.pending++;
        } else if (ticket.status == TicketStatus.ACCEPTED) {
          data.accepted++;
        } else if (ticket.status == TicketStatus.REJECT) {
          data.reject++;
        } else if (ticket.status == TicketStatus.SUCCESS) {
          data.success++;
        }
      });
      return data;
    } else {
      return data;
    }
  }
}
