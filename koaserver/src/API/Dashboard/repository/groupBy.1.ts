import { formatDate } from "./DashboardRepository";
import { ITicketEntity } from "./ITicketEntity";

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
      createdAt: new Date(),
      updatedAt: new Date(),
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
