import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/price",
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
  },
  responseType: "json",
});

instance.interceptors.response.use(
  (response: any) => {
    console.log("response", response);
    return response;
  },
  (error: any) => {
    console.log("error", error.response);
    return error.response;
  }
);

export default instance;
