import express from "express";
import serverless from "serverless-http";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Express on Netlify!");
});

module.exports.handler = serverless(app);