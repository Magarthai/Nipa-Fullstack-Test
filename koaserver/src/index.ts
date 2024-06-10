import "reflect-metadata";
import { createKoaServer, useContainer } from "routing-controllers";

import { Container } from "typedi";
import dotenv from "dotenv";
import { ErrorMiddleware } from "./middleware/ErrorMiddleware";
import { UserController } from "./API/User/controller/UserController";
import bodyParser from "koa-bodyparser";
import * as Koa from "koa";
import { DashboardControllers } from "./API/Dashboard/controller/DashboardController";
import { TicketController } from "./API/Ticket/controller/TicketController";
import { RecipeintController } from "./API/Ticket/controller/RecipeintController";

dotenv.config();
const port = process.env.PORT || 3000;
useContainer(Container);

const koaApp = createKoaServer({
  cors: {
    credentials: true,
    origin: ["http://localhost:3000"],
  },
  defaultErrorHandler: false,
  controllers: [
    UserController,
    DashboardControllers,
    TicketController,
    RecipeintController,
  ],
  middlewares: [ErrorMiddleware],
});

koaApp.use(
  bodyParser({
    enableTypes: ["json", "form"],
    formLimit: "100kb",
  })
);

koaApp.use(async (ctx: Koa.Context, next: Koa.Next) => {
  await next();
});

koaApp.listen(port);

console.log(`Server is up and running at port ${port}`);
