const express = require("express");
const postRouter = require("../posts/post-router");

const server = express();

server.get("/", (req, res) => {
  res.send(`API is running`);
});

server.use("/api/post", postRouter);
module.exports = server;
