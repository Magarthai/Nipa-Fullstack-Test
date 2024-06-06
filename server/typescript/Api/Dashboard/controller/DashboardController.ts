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

@JsonController("/dashboards")
export class DashboardControllers {
  dashboardServices: DashboardService;
  constructor() {
    this.dashboardServices = new DashboardService();
  }
  @Get("/")
  async getMonthTicket() {
    try {
      const data = await this.dashboardServices.useGetMonthTicket();
      return data;
    } catch (err) {
      throw err;
    }
  }

  @Get("/count")
  async getStatusCount() {
    try {
      const data = await this.dashboardServices.useGetStatusCount();
      return data;
    } catch (err) {
      throw err;
    }
  }

  @Get("/success_error")
  async getSuccessErrorCount() {
    try {
      const data = await this.dashboardServices.useGetSuccessErrorCount();
      return data;
    } catch (err) {
      throw err;
    }
  }

  @Get("/:id")
  async getStatusAdminCount(
    @Body() body: { id: string },
    @Res() response: any
  ) {
    try {
      const data = await this.dashboardServices.useGetStatusAdminCount(body.id);
      return response.send(data);
    } catch (err) {
      throw err;
    }
  }
}
