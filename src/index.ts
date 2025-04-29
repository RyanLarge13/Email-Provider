import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import EmailRouter from "./routes/emailRoutes";

dotenv.config();

const app = express();

app.use(cors());

app.use("send-email", EmailRouter);

app.listen("8080", () => {
  console.log("App listening on port 8080");
});
