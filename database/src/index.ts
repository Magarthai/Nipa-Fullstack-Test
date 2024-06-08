import "reflect-metadata";

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { createExpressServer } from "routing-controllers";
import knex from "knex";
// import knexfile from "../knexfile";
import { UserController } from "./API/User/controller/UserController";
import { TicketController } from "./API/Ticket/controller/TicketController";

const port = process.env.PORT || 3000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
import { DashboardControllers } from "./API/Dashboard/controller/DashboardController";
import { ErrorMiddleware } from "./middleware/ErrorMiddleware";
import { createKoaServer } from "routing-controllers";
// Initialize Knex
const environment = process.env.NODE_ENV || "development";
// const config = knexfile[environment];
// const db = knex(config);

// // Run migrations
// db.migrate.latest()
//   .then(() => {
//     console.log('Migrations are up to date.');
//   })
//   .catch((err: any) => {
//     console.error('Error running migrations:', err);
//   });

const app = createKoaServer({
  cors: {
    credentials: true,
    origin: ["http://localhost:3000"],
  },
  // middlewares: [ErrorMiddleware],
  controllers: [UserController, TicketController, DashboardControllers],
});
// app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// // app.get("/", (req: Request, res: Response) => {
// //   res.send("Hello world!");
// // });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
