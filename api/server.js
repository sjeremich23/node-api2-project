const express = require("express");
const CORS = require("cors");
const postsRouter = require("./posts/posts-router");

const server = express();
server.use(express.json());
server.use(CORS());

server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send({
    Server: "Hi, I'm your Server.  Can I start you off with a drink?"
  });
});

module.exports = server;
