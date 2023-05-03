import mailjet from "node-mailjet";

// const [email, setEmail] = useState("");
// const [message, setMessage] = useState("");

// export const handleEmailChange = (e) => {
//   setEmail(e.target.value);
// };

// export const handleMessageChange = (e) => {
//   setMessage(e.target.value);
// };
const API_KEY = import.meta.env.VITE_MAILJET_API_KEY;
const API_SECRET = import.meta.env.VITE_MAILJET_API_SECRET;
export const handleSubmit = async (e) => {
  e.preventDefault();
  // Replace with your own credentials
  const apiKey = API_KEY;
  const apiSecret = API_SECRET;
  // Create a Mailjet client instance
  const client = mailjet.connect(apiKey, apiSecret);
  // Create a request object
  const request = {
    Messages: [
      {
        From: {
          Email: "software.support@genesisgroupng.com",
          Name: "Software Support",
        },
        To: [
          {
            Email: "genesisgroop@gmail.com",
            Name: "Genesis Groop",
          },
        ],
        Subject: "Mailjet Demo",
        TextPart: "Test Mail",
      },
    ],
  };
  // Send the request using the post method
  try {
    const response = await client
      .post("send", { version: "v3.1" })
      .request(request);
    console.log(response.body);
    alert("Email sent successfully!");
  } catch (error) {
    console.error(error.statusCode);
    alert("Email failed to send!");
  }
};
