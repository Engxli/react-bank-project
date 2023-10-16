const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");
const config = require("./config");
const passport = require("passport");
const { jwtStrategy, localStrategy } = require("./middlewares/pssport");
const connectDB = require("./db");
const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);
passport.use("local", localStrategy);

// Routes mini-project
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/mini-project/api/auth", require("./api/auth/router"));
app.use("/mini-project/api/transactions", require("./api/transactions/router"));

// Routes something else

// Error Handling
app.use(errorHandler);
app.use(notFoundHandler);

// run server
connectDB();
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
