import express from "express";

import { sendEmail } from "../controllers/emailController";

const EmailRouter = express.Router();

EmailRouter.post("/clients", sendEmail);
export default EmailRouter;
