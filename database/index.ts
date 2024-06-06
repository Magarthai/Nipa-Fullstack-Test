import express from "express";
const dotenv = require("dotenv").config();

// const app: Express = express();
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const userRoute = require("./routes/userRoute");
// const dashboardRoute = require("./routes/dashboardRoute");
// const ticketRoute = require("./routes/ticketRoute");

const app = express();
app.use(express.json());

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Database is running at http://localhost:${port}`);
});
