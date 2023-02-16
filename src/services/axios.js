import axios from "axios";

export const api = axios.create({
  baseURL: "http://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080",
});
