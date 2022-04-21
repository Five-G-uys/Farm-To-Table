import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
require("./db/database.ts");
// import User from "./db/models/User";
// console.log("LINE 5 ", User);
// import Roles from "./db/models/Roles";
// console.log("LINE 7", Roles);
dotenv.config();

const app: Express = express();
const port = process.env.LOCAL_PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("⚡️Olá⚡️, ⚡️Cinco Gajos⚡️... In TypeScr⚡️pt");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

console.log(port);
