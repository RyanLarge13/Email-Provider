import { Request, Response } from "express";
import { MailOptions } from "nodemailer/lib/json-transport";

import { NodeMailer_SendEmail } from "../utils/nodemailer";

type Body = {
  businessName: string;
  template: string;
  logoUrl: string;
  from: string;
  to: string;
  message: string;
  number: string;
  name: string;
};

const M_GetDefaultTemplate = (requestBody: Body): string => {
  const { businessName, logoUrl, from, to, message, number, name }: Body =
    requestBody;
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>New Client Message</title>
            <style>
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
            }
            </style>
        </head>
        <body style="margin: 0; padding: 0">
            <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="background-color: #f9f9f9; padding: 20px 0"
            >
            <tr>
                <td align="center">
                <table
                    cellpadding="0"
                    cellspacing="0"
                    style="
                    max-width: 600px;
                    width: 100%;
                    background-color: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
                    "
                >
                    <tr>
                    <td
                        style="
                        padding: 20px;
                        text-align: center;
                        background-color: #ffffff;
                        "
                    >
                        <img
                        src="${logoUrl}"
                        alt="Logo"
                        style="max-width: 150px"
                        />
                    </td>
                    </tr>
                    <tr>
                    <td style="padding: 20px">
                        <p style="margin: 0 0 10px; font-size: 14px; color: #888"
                        ><strong>From:</strong> ${name} &lt;${from}&gt;</p
                        >
                        <p style="margin: 0 0 20px; font-size: 14px; color: #888"
                        ><strong>To:</strong> ${businessName} &lt;${to}&gt;</p
                        >
                        <hr
                        style="
                            border: none;
                            border-top: 1px solid #eee;
                            margin: 20px 0;
                        "
                        />
                        <p style="margin: 0 0 15px; font-size: 16px; color: #333">
                        Hello ${businessName},<br />
                        You have a new message from a potential client: <br /><br />
                        ${message},<br />
                        ${from},<br />
                        ${number}
                        </p>
                    </td>
                    </tr>
                    <tr>
                    <td
                        style="
                        padding: 20px;
                        text-align: center;
                        font-size: 12px;
                        color: #aaa;
                        "
                    >
                        &copy; 2025 Dev Commerce Services. All rights reserved.
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            </table>
        </body>
        </html>
    `;
};

export const sendEmail = async (req: Request, res: Response): Promise<void> => {
  /*
      TODO:
        IMPLEMENT:
          1. Validate all request body data before continuing
  */
  const { from, to, businessName }: Body = req.body;

  const customTemplate = M_GetDefaultTemplate(req.body);

  try {
    const mailOptions: MailOptions = {
      from: `"Website Contact Form For ${businessName}" <${process.env.EMAIL}>`,
      replyTo: from, // This makes replies go directly to the user
      to: to,
      subject: "New Client Message",
      html: customTemplate
    };

    try {
      await NodeMailer_SendEmail(mailOptions);

      res.status(200).json({
        message:
          "Your email was successfully sent and we will reply to you as soon as possible"
      });
    } catch (err) {
      console.log(`Error sending email. Top level error. Error: ${err}`);
      res.status(500).json({
        message:
          "We could not send your email at this time. Please use another contact method and get ahold of the website manager. Forgive us for the inconvenience."
      });
    }
  } catch (err) {
    console.log(err);
    // Add error to a DB. Keep track of problems occurring
  }
};
