import axios from "axios";

const SMS_API_URL = import.meta.env.VITE_SMS_API_URL
const SMS_API_TOKEN = import.meta.env.VITE_SMS_API_TOKEN
const SMS_SENDER = import.meta.env.VITE_SMS_SENDER
console.log(SMS_API_URL);
const axiosInstance = axios.create({
  baseURL: 'https://127.0.0.1:8000/',
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${SMS_API_TOKEN}`
  }
});

const sendSMS = async ({ to, text, schedule, type = 0, routing = 3, ref_id = null, simserver_token = null, dlr_timeout = null }) => {
  try {
    const formData = new FormData();
    formData.append('token', SMS_API_TOKEN);
    formData.append('sender', SMS_SENDER);
    formData.append('to', to);
    formData.append('message', text);
    formData.append('type', type);
    formData.append('routing', routing);
    formData.append('ref_id', ref_id);
    console.log(schedule);
    // formData.append('simserver_token', simserver_token);
    formData.append('dlr_timeout', dlr_timeout);
    formData.append('schedule', schedule);

    // const response = await axiosInstance.request({
    //   method: 'post',
    //   url: '/sms-proxy',
    //   data: formData
    // });
    const response = await axiosInstance.post('/sms-proxy', formData)
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`SMS sending failed with status code ${response.status}`);
    }
    // return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`SMS sending failed: ${error.message}`);
    // return null;
  }
};
export default sendSMS;