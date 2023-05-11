import { config } from "dotenv";
config();
import https from "https";
import fs from "fs";
import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";


console.log("make shii happn");
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "https://127.0.0.1:5000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(req.method, req.url, "aksla");
  // console.log(`Incoming ${req.method} request to ${req.originalUrl}`);
  next();
});

app.use(
  cors({
    origin: "https://127.0.0.1:5000",
    credentials: true,
  })
);

app.use(
  "/sms-proxy",
  createProxyMiddleware({
    target: "https://app.smartsmssolutions.com/io/api/client/v1/sms/",
    changeOrigin: true,
    pathRewrite: {
      "^/sms-proxy": "",
    },
    timeout: 60000,
    secure: false,
  })
);


// headers: {
//   "Access-Control-Allow-Origin": "https://127.0.0.1:5000",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
//   "Content-Type": "application/json",
//   "Access-Control-Allow-Credentials": true,
// },
// const port = 8000;

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
const options = {
  key: fs.readFileSync("../mkcert/localhost+2-key.pem"),
  cert: fs.readFileSync("../mkcert/localhost+2.pem"),
};

const server = https.createServer(options, app);

server.listen(8000, () => {
  console.log("Server running on https://127.0.0.1:8000");
});