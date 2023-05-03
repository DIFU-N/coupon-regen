const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const mailjet = require("node-mailjet").connect(
	functions.config().mailjet.key,
	functions.config().mailjet.secret
);
exports.sendEmail = functions.https.onCall(async (data, context) => {
	// const { to, subject, text } = data;

	const request = mailjet.post("send", { version: "v3.1" }).request({
		Messages: [
			{
				From: { Email: "software.support@genesisgroupng.com" },
				To: [{ Email: "desktopsupport.qsr@genesisgroupng.com" }],
				Subject: "Test Subject",
				TextPart: "Test Text"
			}
		]
	});

	try {
		await request;
		return { message: "Email sent successfully!" };
	} catch (error) {
		throw new functions.https.HttpsError(
			"internal",
			"Email could not be sent.",
			error
		);
	}
});
