import axios from "axios"
import axiosClient from "./axios";
import { BASE_URL } from "../constants";

export const getLocationById = (body) => {
    return axiosClient.post(
        `${BASE_URL}/api/location/`,body
    ).then(res => res.data);
}
export const getUserWithLocationHistory = () => {
    return axiosClient.get(
        `${BASE_URL}/api/location/`
    ).then(res => res.data);
}