import { IUserDataEntity } from "@app/API/User/dto/IUserDataEntity";
import { ITicketList } from "../API/Ticket/dto/ITicketList";

class MockDatabase {
  private static _instace: MockDatabase;

  public static get instance() {
    if (!this._instace) {
      this._instace = new MockDatabase();
    }
    return this._instace;
  }

  ticket: ITicketList[] = [];
  user: IUserDataEntity[] = [];
}

export default MockDatabase.instance;
