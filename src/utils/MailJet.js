// import Mailjet from "node-mailjet";

const API_KEY = import.meta.env.VITE_MAILJET_API_KEY;
const API_SECRET = import.meta.env.VITE_MAILJET_API_SECRET;
const functions = require("firebase-functions");
const mailjet = require("node-mailjet").connect(API_KEY, API_SECRET);

exports.sendEmail = functions.https.onCall(async (data, context) => {
  const { toEmail, toName, subject, textPart, htmlPart } = data;

  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "software.support@genesisgroupng.com",
          Name: "Your Name",
        },
        To: [
          {
            Email: toEmail,
            Name: toName,
          },
        ],
        Subject: subject,
        TextPart: textPart,
        HTMLPart: htmlPart,
      },
    ],
  });

  try {
    const result = await request;
    console.log(result);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
});
