import axios from "axios"
import axiosClient from "./axios";
import { BASE_URL } from "../constants";

export const me = (token) => {
    return axios.get(
        `${BASE_URL}/api/auth/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    ).then(res => res.data);
}
export const login = (body) => {
    return axios.post(
        `${BASE_URL}/api/auth/login`,
        body
    ).then(res => res.data);
}

export const register = (body) => {
    return axios.post(
        `${BASE_URL}/api/auth/register`,
        body
    ).then(res => res.data);
}


export const updateProfile = (body) => {
    return axiosClient.put(
        `${BASE_URL}/api/auth/me`,
        body
    ).then(res => res.data);
};


export const refreshTokenAPI = (body) => {
    return axios.post(
        `${BASE_URL}/api/auth/refresh-token`,
        body
    ).then(res => res.data);

}

export const getUserById = (id) => {
    return axiosClient.get(
        `${BASE_URL}/api/auth/get-user-by-id/${id}`
    ).then(res => res.data);
}

export const getAdminParent = () => {
    return axiosClient.get(
        `${BASE_URL}/api/auth/get-admin-parent`
    ).then(res => res.data);
}

export const changePassword = (body) => {
    return axiosClient.put(
        `${BASE_URL}/api/auth/me/password`,
        body
    ).then(res => res.data);
}

export const getProfile = (username) => {
    return axiosClient.get(
        `${BASE_URL}/api/auth/profile/${username}`
    ).then(res => res.data);
}


export const forgetPassword = (body) => {
    return axios.post(`${BASE_URL}/api/auth/forget-password`,
        body
    ).then(res => res.data)
}

export const resetPassword = (body) => {
    return axios.post(`${BASE_URL}/api/auth/reset-password`,
        body
    ).then(res => res.data)
}

export const verifyEmail = async (token) => {
    return await axios.get(`${BASE_URL}/api/auth/verify-email/${token}`).then((res) => res.data);
  };