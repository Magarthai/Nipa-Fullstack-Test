import { formatDate } from "./DashboardRepository";
import { ITicketEntity } from "../dto/ITicketEntity";

export function groupBy(
  arr: ITicketEntity[] = [
    {
      id: 0,
      name: "",
      email: "",
      detial: "",
      selectTopic: "",
      img: "",
      status: "",
      created_at: new Date(),
      updated_at: new Date(),
      recipient: new Date(),
      recipient_name: "",
      solve: "",
    },
  ],
  key: string
) {
  return arr.reduce(
    (acc: { [index: string]: any }, obj: { [index: string]: any }) => {
      const group = formatDate(obj[key]);

      acc[group] = acc[group] || [];
      acc[group].push(obj);
      return acc;
    },
    {}
  );
}
