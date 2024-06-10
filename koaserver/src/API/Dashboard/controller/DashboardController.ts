import { response } from "express";
import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  Res,
  Req,
  CookieParam,
} from "routing-controllers";
import { DashboardService } from "../view/DashboardService";
import { Inject, Container, Service } from "typedi";
import { error } from "console";
@Service()
@JsonController("/dashboards")
export class DashboardControllers {
  @Inject()
  private dashboardServices: DashboardService;
  // dashboardServices = Container.get(DashboardService);
  @Get("/")
  async listMonthTicket() {
    const data = await this.dashboardServices.useListMonthTicket();
    return data;
  }

  @Get("/count")
  async getStatusCount() {
    const data = await this.dashboardServices.useGetStatusCount();
    return data;
  }

  @Get("/success_error")
  public async getSuccessErrorCount() {
    const data = await this.dashboardServices.useGetSuccessErrorCount();
    return data;
  }

  @Get("/:id")
  async getStatusAdminCount(@Param("id") id: number, @Res() response: any) {
    console.log(id, "idddddddddddddddddddddd");
    const data = await this.dashboardServices.useListStatusAdminCount(id);
    return data;
  }
}
