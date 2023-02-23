import axios from "axios";

export const api = axios.create({
  baseURL: "https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080",
});
