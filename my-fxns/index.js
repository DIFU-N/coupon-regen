// const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const API_KEY = process.env.VITE_MAILJET_API_KEY;
const API_SECRET = process.env.VITE_MAILJET_API_SECRET;
const functions = require("firebase-functions");
const mailjet = require("node-mailjet").connect(API_KEY, API_SECRET);
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp(functions.config().firebase);

exports.sendEmail = functions.https.onCall(async (data, context) => {
  const {toEmail, toName, subject, textPart, htmlPart} = data;

  const request = mailjet.post("send", {version: "v3.1"}).request({
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
    return {success: true};
  } catch (error) {
    console.log(error);
    return {success: false};
  }
});
