const Ticket = require("../../../models/Ticket.model");
import { Error } from "mongoose";
const moment = require('moment-timezone');
import express, { Express, Request, Response } from "express";

export interface ticketType {
    id: number,
    name: string,
    email: string,
    detial: string,
    selectTopic: string,
    img: string,
    status: string,
    createdAt: Date,
    updatedAt: Date,
    recipient: Date,
    recipient_name: string,
    solve: string
}

function formatDate(date:string) {
  const thaiTime = moment(date).tz('Asia/Bangkok');
  const formattedDate = thaiTime.format('วันที่ DD');
  return formattedDate;
}



function groupBy(arr: ticketType[] = [{
    id: 0,
    name: "",
    email: "",
    detial: "",
    selectTopic: "",
    img: "",
    status: "",
    createdAt: new Date,
    updatedAt: new Date,
    recipient: new Date,
    recipient_name: "",
    solve: ""
}], key:string) {
  return arr.reduce((acc: {[index: string]:any}, obj:{[index: string]:any}) => {
      const group = formatDate(obj[key]);

      acc[group] = acc[group] || [];
      acc[group].push(obj);
      return acc;
  }, {});
}

const getSuccessErrorCount = async(req: Request, res: Response) => {
  try {
    let data = [
      { name: 'Success', value: 0, fill: '#1f77b4' },
      { name: 'Reject', value: 0, fill: '#ff7f0e' },
    ];
    const Tickets = await Ticket.find();
    if(Tickets) {
      Tickets.forEach((Ticket:{status:string}) => {
        if(Ticket.status == "success") {
          data[0].value++;
        } else if (Ticket.status == "reject") {
          data[1].value++;
        }
      })
    }
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

const getStatusCount = async(req: Request, res: Response) => {
  try {
  let data = {
    pending:  0,
    accepted: 0,
    success: 0,
    reject: 0
  }
  console.log("test")
  const fetchTicket:ticketType[] = await Ticket.find();

  if(fetchTicket) {
    fetchTicket.forEach((ticket) => {
      if(ticket.status == "pending") {
        data.pending++;
      } else if(ticket.status == "accepted") {
        data.accepted++;
      } else if(ticket.status == "reject") {
        data.reject++;
      } else if(ticket.status == "success") {
        data.success++;
      }
    });

    res.send(data);
  } else {
    res.send(data);
  }
} catch (err) {
  console.log(err);
  res.status(500).send("Internal Server Error");
}
};

const getMonthTicket = async(req: Request, res: Response) => {
  try {
    let startOfMonth = moment().startOf('month').tz('Asia/Bangkok');
    let endOfMonth = moment().endOf('month').tz('Asia/Bangkok');

    const Tickets = await Ticket.find({
      createdAt: {
          $gte: startOfMonth,
          $lt: endOfMonth
      },
  });

  const groupedData = groupBy(Tickets, 'createdAt');
  const data = [];

  for (let date = startOfMonth.clone(); date.isBefore(endOfMonth); date.add(1, 'day')) {
    const formattedDate = formatDate(date);

    if (groupedData.hasOwnProperty(formattedDate)) {
        const listData = groupedData[formattedDate];
        const info = {
            date: formattedDate,
            value:listData.length
        };

        data.push(info);
    } else {
        const defaultInfo = {
            date: formattedDate,
            value:0
        };
        data.push(defaultInfo);
    }
}
const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.date.split('/').reverse().join('-')).valueOf();
    const dateB = new Date(b.date.split('/').reverse().join('-')).valueOf();
    return dateA - dateB;
});
res.json(sortedData);

} catch (err) {
  console.log(err);
  res.status(500).send("Internal Server Error");
}
};

const getStatusAdminCount = async(req: Request, res: Response) => {
  try {
  let data = {
    pending:  0,
    accepted: 0,
    success: 0,
    reject: 0
  }
  const fetchTicket = await Ticket.find({recipient: req.body.id});
  if(fetchTicket) {
    fetchTicket.forEach((ticket:{status:string}) => {
      if(ticket.status == "pending") {
        data.pending++;
      } else if(ticket.status == "accepted") {
        data.accepted++;
      } else if(ticket.status == "reject") {
        data.reject++;
      } else if(ticket.status == "success") {
        data.success++;
      }
    });

    res.send(data);
  } else {
    res.send(data);
  }
} catch (err) {
  console.log(err);
  res.status(500).send("Internal Server Error");
}
};

module.exports = {
  getStatusCount,
  getMonthTicket,
  getSuccessErrorCount,
  getStatusAdminCount,
};
