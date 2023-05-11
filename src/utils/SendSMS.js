import axios from "axios";

const SMS_API_URL = import.meta.env.VITE_SMS_API_URL
const SMS_API_TOKEN = import.meta.env.VITE_SMS_API_TOKEN
const SMS_SENDER = import.meta.env.VITE_SMS_SENDER
console.log(SMS_API_URL);
const axiosInstance = axios.create({
  baseURL: 'https://127.0.0.1:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${SMS_API_TOKEN}`
  }
});


const sendSMS = async ({ to, text, type = 0, routing = 3, ref_id = null, simserver_token = null, dlr_timeout = null, schedule = null }) => {
  try {
    const response = await axiosInstance.request({
      method: 'post',
      url: '/sms-proxy',
      data: {
        token: SMS_API_TOKEN,
        sender: SMS_SENDER,
        to: to,
        message: text,
        type: type,
        routing: routing,
        ref_id: ref_id,
        simserver_token: simserver_token,
        dlr_timeout: dlr_timeout,
        schedule: schedule
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export default sendSMS;