import { DashboardRepository } from "../repository/DashboardRepository";

export class DashboardService {
  dashboardRepositorys: DashboardRepository;
  constructor() {
    this.dashboardRepositorys = new DashboardRepository();
  }
  async useGetMonthTicket() {
    const data = await this.dashboardRepositorys.getMonthTicket();
    return data;
  }

  async useGetSuccessErrorCount() {
    const data = await this.dashboardRepositorys.getSuccessErrorCount();
    return data;
  }

  async useGetStatusCount() {
    const data = await this.dashboardRepositorys.getStatusCount();
    return data;
  }

  async useGetStatusAdminCount(id: string) {
    const data = await this.dashboardRepositorys.getStatusAdminCount(id);
    return data;
  }
}
