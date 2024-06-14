import { response } from "express";
import { Param, Get, JsonController } from "routing-controllers";
import { DashboardService } from "../view/DashboardService";
import { Inject, Container, Service } from "typedi";
import { IStatusRespone } from "../dto/IStatusRespone";
import { ITicketDataListOfMonthEnitityRespone } from "../dto/ITicketDataListOfMonthEnitityRespone";

@Service()
@JsonController("/dashboards")
export class DashboardControllers {
  @Inject()
  private dashboardServices: DashboardService;
  // dashboardServices = Container.get(DashboardService);
  @Get("/")
  async listMonthTicket(): Promise<ITicketDataListOfMonthEnitityRespone[]> {
    const data = await this.dashboardServices.useListMonthTicket();
    return data;
  }

  @Get("/count")
  async getStatusCount(): Promise<IStatusRespone> {
    const data = await this.dashboardServices.useGetStatusCount();
    return data;
  }

  @Get("/success_error")
  public async getSuccessErrorCount(): Promise<
    { name: string; value: number; fill: string }[]
  > {
    const data = await this.dashboardServices.useGetSuccessErrorCount();
    return data;
  }

  @Get("/:id")
  async getStatusAdminCount(@Param("id") id: number): Promise<IStatusRespone> {
    const data = await this.dashboardServices.useListStatusAdminCount(id);
    return data;
  }
}
