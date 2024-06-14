import "reflect-metadata";
import { createKoaServer, useContainer } from "routing-controllers";
import { ErrorMiddleware } from "./middleware/ErrorMiddleware";
import { UserController } from "./API/User/controller/UserController";
import bodyParser from "koa-bodyparser";
import { DashboardControllers } from "./API/Dashboard/controller/DashboardController";
import { TicketController } from "./API/Ticket/controller/TicketController";
import { RecipeintController } from "./API/Recipient/controller/RecipeintController";
import Container from "typedi";
import dotenv from "dotenv";

dotenv.config();
useContainer(Container);

const koaApp = createKoaServer({
  cors: {
    credentials: true,
    origin: ["http://localhost:5173"],
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

const port = process.env.PORT || 3000;
koaApp.listen(port);
console.log(`Server is up and running at port ${port}`);
