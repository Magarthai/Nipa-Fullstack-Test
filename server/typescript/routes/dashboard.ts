import { error } from "console";
import { response } from "express";
import { ObjectId } from "mongodb";
import { Controller, Param, Body, Get, Post, Put, Delete, JsonController, Res, Req, CookieParam } from "routing-controllers";
import { ITicket } from "./ticket";
const moment = require('moment-timezone');
const Tickets = require("../../models/Ticket.model");
const nodemailer = require('nodemailer');

function formatDate(date:string) {
  const thaiTime = moment(date).tz('Asia/Bangkok');
  const formattedDate = thaiTime.format('วันที่ DD');
  return formattedDate;
}

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


@JsonController()
export class DashboardController {

    @Get('/dashboards/count')
    async getStatusCount( @Res() response:any ) {
        try {
            let data = {
                pending:  0,
                accepted: 0,
                success: 0,
                reject: 0
              }
              const fetchTicket:ticketType[] = await Tickets.find();
            
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
            
                return response.send(data);
            }
        } catch(err) {
            console.log(err);
            return err;
        }
    }

    @Get('/dashboards')
    async getMonthTicket(@Res() response:any){
        try{
            let startOfMonth = moment().startOf('month').tz('Asia/Bangkok');
            let endOfMonth = moment().endOf('month').tz('Asia/Bangkok');

            const TicketData = await Tickets.find({
                createdAt: {
                    $gte: startOfMonth,
                    $lt: endOfMonth
                },
            });
            const groupedData = groupBy(TicketData, 'createdAt');
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

            return response.send(sortedData);

        } catch(err) {
            console.log(err);
            return err;
        }
    }
    
    @Get('/dashboards/:id')
    async getStatusAdminCount(@Body() body:{id:string} , @Res() response:any) {
        try{
            let data = {
                pending:  0,
                accepted: 0,
                success: 0,
                reject: 0
            };
            const fetchTicket = await Tickets.find({recipient: body.id});

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

                return response.send(data);
            } else {
                return response.send(data);
              }
        } catch(err) {
            return response.status(500).send("Internal Server Error");
        }
    }

    @Get('/dashboard/success_error')
    async getSuccessErrorCount(@Body() body:{id:string} , @Res() response:any) {
        try {
            console.log("za")
            let dataz = [
                { name: 'Success', value: 0, fill: '#1f77b4' },
                { name: 'Reject', value: 0, fill: '#ff7f0e' },
              ];
              const TicketData = await Tickets.find();

              console.log(TicketData)
              if(TicketData) {
                console.log("chcek")
                TicketData.forEach((Ticketz:{status:string}) => {
                  if(Ticketz.status == "success") {
                    dataz[0].value++;
                  } else if (Ticketz.status == "reject") {
                    dataz[1].value++;
                  }
                })
              }
              
              return response.send(dataz);
        } catch (err) {
            return response.status(500).send("Internal Server Error");
        }
    }



}