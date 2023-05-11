import { config } from 'dotenv';
config();
import https from 'https';
import fs from 'fs';
import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
console.log('make shii happn');
const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true)
  res.header("Access-Control-Allow-Origin", "https://127.0.0.1:5000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log(req.method, req.url, 'aksla');
  // console.log(`Incoming ${req.method} request to ${req.originalUrl}`);
  next();
});

const MKCERT_CERT = process.env.VITE_MKCERT_CERT
const MKCERT_KEY = process.env.VITE_MKCERT_KEY
console.log(MKCERT_KEY)

const options = {
  key: fs.readFileSync('./localhost+2.pem'),
  cert: fs.readFileSync('./localhost+2-key.pem')
};


app.use(cors({
  origin: 'https://127.0.0.1:5000',
  credentials: true
}));


app.use(
  "/sms-proxy",
  createProxyMiddleware({
    target: "https://app.smartsmssolutions.com/io/api/client/v1/sms",
    changeOrigin: false,
    pathRewrite: {
      "^/sms-proxy": "",
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
      "X-Requested-With, content-type, Authorization",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },
    optionsSuccessStatus: 200,
    timeout: 60000,
    secure: false
  })
);

// const port = 8000;

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
https.createServer(options, (req, res) => {
  // handle requests
}).listen(8000, () => {
  console.log('Server running on https://localhost:8000');
});
