import axios from "axios";

export const apiRequest = async (method, payload = {}) => {
  const res = await axios
    .post("https://f560-80-249-146-102.eu.ngrok.io/api.php", {
      method,
      payload,
    })
    .catch((e) => {
      return false;
    });
  console.log(res);
  if (res && res.status) {
    return res.data;
  } else {
    return { status: false };
  }
};
