const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const os = require("os");
const PORT = process.env.PORT || 5000;

const indexRouter = require("./routes/index");
const userRouter = require("./routes/users/usersController");
const heroesRouter = require("./routes/heroes/heroesController");
const authRouter = require("./routes/authentication/jwtAuth");
const logger = require("./utils/logger");
const bodyParser = require("body-parser");

//middleware
app.use(cors());
app.use(
  express.json({
    limit: "100mb",
  })
);
app.use(express.json());
app.use(express.static("client/build"));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/heroes", heroesRouter);
app.use("/api", require("./routes/index"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  logger.log({
    level: "info",
    message: `\nServer is starting on port: ${PORT}\nServer Architecture: ${os.platform}\nArchitecture: ${os.arch}`,
  });
});
