import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import EmailRouter from "./routes/emailRoutes";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 8080;

app.use(cors());

app.use("send-email", EmailRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App listening on port ${PORT}`);
});
