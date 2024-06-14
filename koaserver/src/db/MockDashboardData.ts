import { ITicketDataListOfMonthEnitityRespone } from "@app/API/Dashboard/dto/ITicketDataListOfMonthEnitityRespone";
import { ICountGroupByStatus } from "@app/API/Dashboard/dto/ICountGroupByStatus";

class MockDashboardData {
  private static _instace: MockDashboardData;

  public static get instance() {
    if (!this._instace) {
      this._instace = new MockDashboardData();
    }
    return this._instace;
  }

  ListOfMonthDashboard: ITicketDataListOfMonthEnitityRespone[] = [];
  ListCountGroup: ICountGroupByStatus[] = [];
}

export default MockDashboardData.instance;
