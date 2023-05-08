// import axios from "axios";

const SMS_API_URL = import.meta.env.VITE_SMS_API_URL;
const SMS_API_TOKEN = import.meta.env.VITE_SMS_API_TOKEN;
const SMS_SENDER = import.meta.env.VITE_SMS_SENDER;
// const unirest = require('unirest');

const sendSMS = async ({ to, text }) => {
  try {
    const response = await axios.post(SMS_API_URL, {
      token: SMS_API_TOKEN,
      sender: SMS_SENDER,
      to: to,
      message: text,
      type: 0,
      routing: 3,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default sendSMS;
