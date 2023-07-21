import axios from "axios";
import { HOST_API } from "../config";

export const axiosHandler = axios.create({
  baseURL: HOST_API,
});

export const axiosPost = async (
  url,
  data,
  contentType = "application/json"
) => {
  let response = {};
  try {
    const result = await axiosHandler.post(url, data, {
      headers: {
        "Content-Type": contentType,
      },
    });
    response = result.data;
    response.status = [200, 201].includes(result.status);
  } catch (e) {
    response.status = false;
    response.message = e?.response?.data;
  }
  return response;
};

export const axiosGet = async (
  url,
  params = {},
  contentType = "application/json"
) => {
  let response = {};
  try {
    const result = await axiosHandler.get(url, {
      headers: {
        "Content-Type": contentType,
      },
      params,
    });
    response = result.data;
    response.status = [200, 202].includes(result.status);
  } catch (e) {
    response.status = false;
    response.message = "something went wrong";
    response.data = e;
  }
  return response;
};
