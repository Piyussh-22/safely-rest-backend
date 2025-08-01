import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000", // or your backend URL
  withCredentials: true, // if you're using cookies/sessions
});

export default instance;
