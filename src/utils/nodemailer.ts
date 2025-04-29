import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import GoogleOAuth2Client from "./googleAuth";

const buildTransporter = (
  service: string,
  auth: {}
): nodemailer.Transporter<
  SMTPTransport.SentMessageInfo,
  SMTPTransport.Options
> => {
  const transport = nodemailer.createTransport({
    service: service,
    auth: auth,
  });

  return transport;
};

export const NodeMailer_SendEmail = async (
  mailOptions: MailOptions
): Promise<void> => {
  let accessToken = null;

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
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: accessToken.token,
  };

  const transport = buildTransporter("gmail", transporterAuth);

  try {
    transport.sendMail(mailOptions);
  } catch (err) {
    console.log(`Error sending email with transporter. Error: ${err}`);
  }
};
