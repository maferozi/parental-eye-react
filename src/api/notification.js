import axios from "axios"
import axiosClient from "./axios";
import { BASE_URL } from "../constants";

export const getNotification = (params) => {
    return axiosClient
      .get(`${BASE_URL}/api/notification/unread`, { params })
      .then((res) => res.data);
  };