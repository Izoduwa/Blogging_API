const express = require("express");
const cors = require("cors");
const CONFIG = require("./config/config");
const ConnectToDb = require("./db/mongodb");
const blogRouter = require("./routes/blog.routes");
const userRoutes = require("./routes/user.routes");
const viewRoutes = require("./routes/view.routes");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const logger = require("./logging/logger");
const readCountMiddleware = require("./middleware/readCountMiddleware");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

ConnectToDb();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(helmet());

app.use("/api/blog/published/item/:id", readCountMiddleware);

app.use("/api/blog", blogRouter);
app.use("/api/user", userRoutes);
app.use("/", viewRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(CONFIG.PORT, () => {
  logger.info(`Server is running on Port: ${CONFIG.PORT}`);
});
