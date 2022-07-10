import axios from "axios";

export const apiRequest = async (method, payload = {}) => {
  const res = await axios
    .post("http://localhost:4000/api.php", {
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
