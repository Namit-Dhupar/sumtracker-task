import axios from "axios";

const API = axios.create({
  baseURL: "https://inventory-dev-295903.appspot.com",
  headers: {
    Authorization: "Token 0d9dac263b8d4e518fc95aad50a57b678615347e",
  },
});

export const getApiData = async (method) => {
  const res = await API.get(method);
  return res;
};
