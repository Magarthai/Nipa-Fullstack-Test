import express, { Express, Request, Response } from "express";
const dbConnect = require("./config/db.connect");
const dotenv = require("dotenv").config();
import { createExpressServer } from "routing-controllers";
import "reflect-metadata";
import { UserController } from "./Api/User/controller/UserController";
import { TicketController } from "./routes/ticket";
import { DashboardController } from "./routes/dashboard";

// const app: Express = express();
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const userRoute = require("./routes/userRoute");
// const dashboardRoute = require("./routes/dashboardRoute");
// const ticketRoute = require("./routes/ticketRoute");

const app = createExpressServer({
  cors: {
    credentials: true,
    origin: ["http://localhost:3000"],
  },
  controllers: [UserController, TicketController, DashboardController],
});

// app.use(cors(
//     {
//         credentials:true,
//         origin: ['http://localhost:3000']
//     }
// ));

dbConnect();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

// app.use('/', userRoute);
// app.use('/', ticketRoute);
// app.use('/', dashboardRoute)
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
