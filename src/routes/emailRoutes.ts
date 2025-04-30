import express from "express";

const EmailRouter = express.Router();

EmailRouter.post(
  "/clients",
  // auth --- Add auth here
  EmailRouter
);

EmailRouter.get("/test", () => console.log("hi"));
export default EmailRouter;
