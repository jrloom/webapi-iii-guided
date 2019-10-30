const express = require("express"); // importing a CommonJS module
const helmet = require("helmet"); // import third party middleware

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

// write custom middleware
// function dateLogger(req, res, next) {}
const dateLogger = (req, res, next) => {
  console.log(new Date().toISOString());
  next();
};

function logger(req, res, next) {
  console.log(`${req.method} to ${req.url} from ${req.get("Origin")}`);
  next();
}

// global middleware
server.use(helmet()); // invoke third party middleware (with defaults)
server.use(express.json()); // built-in middleware
server.use(dateLogger); // use custom middleware
server.use(logger);

server.use("/api/hubs", hubsRouter);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
