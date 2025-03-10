import axios from "axios"
import axiosClient from "./axios";
import { BASE_URL } from "../constants";

export const getLocationById = (body) => {
    return axiosClient.post(
        `${BASE_URL}/location/`,body
    ).then(res => res.data);
}