import "reflect-metadata";
import {
  DashboardRepository,
  MockDashboardRepository,
} from "@app/API/Dashboard/repository/DashboardRepository";
import { DashboardService } from "@app/API/Dashboard/view/DashboardService";
import MockDashboardData from "@app/db/MockDashboardData";
import chai, { expect } from "chai";
import Container from "typedi";
import { TicketStatus } from "@app/API/Ticket/enum/TicketStatus";
export const DashboardServiceTest = () => {
  describe("DashboardService", function () {
    before(() => {
      chai.should();
    });
    this.afterEach(() => {
      MockDashboardData.ListOfMonthDashboard = [];
      MockDashboardData.ListCountGroup = [];
    });

    Container.set(DashboardRepository, Container.get(MockDashboardRepository));
    const dashboardService = Container.get(DashboardService);
    describe("useListMonthTicket", function () {
      it("should return data length equal 10", async function () {
        MockDashboardData.ListOfMonthDashboard.push(
          { date: "วันที 1", value: 1 },
          { date: "วันที 2", value: 3 },
          { date: "วันที 3", value: 5 },
          { date: "วันที 4", value: 10 },
          { date: "วันที 5", value: 4 },
          { date: "วันที 6", value: 8 },
          { date: "วันที 7", value: 8 },
          { date: "วันที 8", value: 2 },
          { date: "วันที 9", value: 1 },
          { date: "วันที 10", value: 10 }
        );
        const getData = await dashboardService.useListMonthTicket();
        getData.length.should.equal(10);
      });
    });

    describe("useGetStatusCount", function () {
      it("should return accepted status count equal 20", async function () {
        MockDashboardData.ListCountGroup.push(
          {
            status: TicketStatus.PENDING,
            count: "10",
          },
          {
            status: TicketStatus.ACCEPTED,
            count: "20",
          },
          {
            status: TicketStatus.SUCCESS,
            count: "30",
          },
          {
            status: TicketStatus.REJECT,
            count: "40",
          }
        );
        const groupbyCountStatus = await dashboardService.useGetStatusCount();
        groupbyCountStatus.accepted.should.to.deep.equal(20);
      });
      it("should return pending status count equal 10", async function () {
        MockDashboardData.ListCountGroup.push(
          {
            status: TicketStatus.PENDING,
            count: "10",
          },
          {
            status: TicketStatus.ACCEPTED,
            count: "20",
          },
          {
            status: TicketStatus.SUCCESS,
            count: "30",
          },
          {
            status: TicketStatus.REJECT,
            count: "40",
          }
        );
        const groupbyCountStatus = await dashboardService.useGetStatusCount();
        groupbyCountStatus.pending.should.to.deep.equal(10);
      });
      it("should return pending status count show undefined", async function () {
        MockDashboardData.ListCountGroup.push(
          {
            status: TicketStatus.PENDING,
            count: "10",
          },
          {
            status: TicketStatus.ACCEPTED,
            count: "20",
          },
          {
            status: TicketStatus.REJECT,
            count: "40",
          }
        );
        const groupbyCountStatus = await dashboardService.useGetStatusCount();
        expect(groupbyCountStatus.success).undefined;
      });
    });

    describe("useGetSuccessErrorCount", function () {
      it("should return success count equal 20", async function () {
        MockDashboardData.ListCountGroup.push(
          {
            status: TicketStatus.PENDING,
            count: "10",
          },
          {
            status: TicketStatus.ACCEPTED,
            count: "20",
          },
          {
            status: TicketStatus.SUCCESS,
            count: "20",
          }
        );
        const getData = await dashboardService.useGetSuccessErrorCount();
        const filterSuccess = getData.find((status) => {
          return status.name == "Success";
        });
        filterSuccess.value.should.equal(20);
      });
      it("should return success count equal 0", async function () {
        MockDashboardData.ListCountGroup.push(
          {
            status: TicketStatus.PENDING,
            count: "10",
          },
          {
            status: TicketStatus.ACCEPTED,
            count: "20",
          },
          {
            status: TicketStatus.REJECT,
            count: "40",
          }
        );
        const getData = await dashboardService.useGetSuccessErrorCount();
        const filterSuccess = getData.find((status) => {
          return status.name == "Success";
        });
        filterSuccess.value.should.equal(0);
      });
      it("should return reject count equal 40", async function () {
        MockDashboardData.ListCountGroup.push(
          {
            status: TicketStatus.PENDING,
            count: "10",
          },
          {
            status: TicketStatus.ACCEPTED,
            count: "20",
          },
          {
            status: TicketStatus.REJECT,
            count: "40",
          }
        );
        const getData = await dashboardService.useGetSuccessErrorCount();
        const filterSuccess = getData.find((status) => {
          return status.name == "Reject";
        });
        filterSuccess.value.should.equal(40);
      });
    });
    describe("useListStatusAdminCount", function () {
      it("should return accepted status count equal 20", async function () {
        MockDashboardData.ListCountGroup.push(
          {
            status: TicketStatus.PENDING,
            count: "10",
          },
          {
            status: TicketStatus.ACCEPTED,
            count: "20",
          },
          {
            status: TicketStatus.SUCCESS,
            count: "30",
          },
          {
            status: TicketStatus.REJECT,
            count: "40",
          }
        );
        const groupbyCountStatus = await dashboardService.useGetStatusCount();
        groupbyCountStatus.accepted.should.to.deep.equal(20);
      });
      it("should return pending status count equal 10", async function () {
        MockDashboardData.ListCountGroup.push(
          {
            status: TicketStatus.PENDING,
            count: "10",
          },
          {
            status: TicketStatus.ACCEPTED,
            count: "20",
          },
          {
            status: TicketStatus.SUCCESS,
            count: "30",
          },
          {
            status: TicketStatus.REJECT,
            count: "40",
          }
        );
        const groupbyCountStatus =
          await dashboardService.useListStatusAdminCount(1);
        groupbyCountStatus.pending.should.to.deep.equal(10);
      });
      it("should return pending status count show undefined", async function () {
        MockDashboardData.ListCountGroup.push(
          {
            status: TicketStatus.PENDING,
            count: "10",
          },
          {
            status: TicketStatus.ACCEPTED,
            count: "20",
          },
          {
            status: TicketStatus.REJECT,
            count: "40",
          }
        );
        const groupbyCountStatus =
          await dashboardService.useListStatusAdminCount(1);
        expect(groupbyCountStatus.success).undefined;
      });
    });
  });
};
