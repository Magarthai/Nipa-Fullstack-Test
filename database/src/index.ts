import express, { Express, Request, Response } from "express";
const dotenv = require("dotenv").config();

import bcrypt = require("bcrypt");
// const app: Express = express();
import { createExpressServer } from "routing-controllers";
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
import "reflect-metadata";
import { UserController } from "./API/User/controller/UserController";
import { TicketController } from "./API/Ticket/controller/TicketController";
const db = require("./db/db");
// const createUser = async () => {
//   try {
//     const data = {
//       fname: "test",
//       lname: "test",
//       email: "test@gmail.com",
//       password: "xd",
//     };
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(data.password, salt);
//     const encryptedData = {
//       fname: "test",
//       lname: "test",
//       email: "testz@gmail.com",
//       password: hash,
//     };
//     const selectUserData = await db("user")
//       .insert([encryptedData])
//       .returning([
//         "id",
//         "fname",
//         "lname",
//         "email",
//         "password",
//         "role",
//         "created_at",
//         "updated_at",
//       ]);
//     console.log("created", selectUserData);
//   } catch (err: any) {
//     console.log(err.detail);
//   }
// };

// const app = express();
// app.use(express.json());

// app.use(morgan("dev"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

const app = createExpressServer({
  cors: {
    credentials: true,
    origin: ["http://localhost:3000"],
  },
  controllers: [UserController, TicketController],
});

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Database is running at http://localhost:${port}`);
});
