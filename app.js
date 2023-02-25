const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors")

const app = express();

const handleErrorMiddleware = require("./app/middlewares/handle-error");
const notFoundMiddleware = require("./app/middlewares/not-found");

const categoriesRouter = require("./app/api/v1/categories/router");
const imagesRouter = require("./app/api/v1/images/router");
const talentsRouter = require("./app/api/v1/talents/router");
const eventsRouter = require("./app/api/v1/events/router");
const organizersRouter = require("./app/api/v1/organizers/router");
const authCMSRouter = require("./app/api/v1/auth/router");
const ordersRouter = require("./app/api/v1/orders/router");
const participantsRouter = require("./app/api/v1/participants/router");
const paymentsRouter = require("./app/api/v1/payments/router");
const userRefreshTokenRouter = require("./app/api/v1/userRefreshToken/router");

const v1 = "/api/v1";
const v1CMS = `${v1}/cms`;

app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome semina server" });
});

app.use(v1CMS, categoriesRouter);
app.use(v1CMS, imagesRouter);
app.use(v1CMS, talentsRouter);
app.use(v1CMS, eventsRouter);
app.use(v1CMS, organizersRouter);
app.use(v1CMS, authCMSRouter);
app.use(v1CMS, ordersRouter);
app.use(v1CMS, paymentsRouter);
app.use(v1CMS, userRefreshTokenRouter);
app.use(v1, participantsRouter);

app.use(handleErrorMiddleware);
app.use(notFoundMiddleware);

module.exports = app;
