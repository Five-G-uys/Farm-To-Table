import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
require("./db/database.ts");


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
