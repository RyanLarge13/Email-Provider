import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";

dotenv.config();

//import GoogleOAuth2Client from "./googleAuth";

const buildTransporter = (
  service: string,
  auth: {}
): nodemailer.Transporter<
  SMTPTransport.SentMessageInfo,
  SMTPTransport.Options
> => {
  const transport = nodemailer.createTransport({
    service: service,
    auth: auth
  });

  return transport;
};

export const NodeMailer_SendEmail = async (
  mailOptions: MailOptions
): Promise<void> => {
  /*
    TODO:
      CONSIDER:
        1. Not sure what the heck I am doing yet here. Using app passkey for now instead of commented out code below using OAuth2
  */
  /* let accessToken = null;

  try {
    accessToken = await GoogleOAuth2Client?.getAccessToken();
  } catch (err) {
    console.log(`Error fetching accessToken. Error : ${err}`);
    return;
  }

  if (!accessToken) {
    console.log(
      `No access token, catch block skipped. Check server! access token: ${accessToken}`
    );
    return;
  }

  const transporterAuth = {
    type: "OAuth2",
    user: process.env.EMAIL,
    clientId: process.env.GOOGLE_API_CLIENT_ID,
    clientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_API_REFRESH_TOKEN,
    accessToken: accessToken?.token,
  };
  */

  const transporterAuth = {
      user: process.env.EMAIL,
      pass: process.env.GOOGLE_APP_PASSKEY
    }
  

  const transport = buildTransporter("gmail", transporterAuth);

  try {
    transport.sendMail(mailOptions);
  } catch (err) {
    console.log(`Error sending email with transporter. Error: ${err}`);
  }
};
