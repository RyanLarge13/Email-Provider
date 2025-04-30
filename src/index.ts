import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import EmailRouter from "./routes/emailRoutes";

dotenv.config();

const app = express();
const staticAssetsPath = path.join(__dirname, "static");
const PORT = Number(process.env.PORT) || 8080;

const corsAcceptList = [process.env.DEV_CORS_ORIGIN || ""];

app.use(
  cors({
    origin: (origin = "", callback) => {
      console.log(origin);
      if (corsAcceptList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/send-email", EmailRouter);
app.use("/static", express.static(staticAssetsPath));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App listening on port ${PORT}`);
});
