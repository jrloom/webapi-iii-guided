const express = require("express"); // importing a CommonJS module
const helmet = require("helmet"); // import third party middleware
const morgan = require("morgan");

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

// write custom middleware
// function dateLogger(req, res, next) {}
// const dateLogger = (req, res, next) => {
// console.log(new Date().toISOString());
// next();
// };
//
// function logger(req, res, next) {
// console.log(`${req.method} to ${req.url} from ${req.get("Origin")}`);
// next();
// }

function gateKeeper(req, res, next) {
  const password = req.headers.password || "";
  if (password.toLowerCase() === "mellon") {
    next();
  } else if (password === "") {
    res.status(400).json({ message: "provide a password" });
  } else {
    res.status(401).json({ message: "you shall not pass" });
  }
}

// global middleware

server.use(helmet()); // invoke third party middleware (with defaults)
server.use(morgan("dev"));
server.use(express.json()); // built-in middleware
server.use(gateKeeper);
// server.use(dateLogger); // use custom middleware
// server.use(logger);

server.use("/api/hubs", hubsRouter);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
