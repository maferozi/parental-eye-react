import axios from "axios"
import axiosClient from "./axios";
import { BASE_URL } from "../constants";

export const getAllInvitedUser = (params) => {
    return axiosClient.get(
        `${BASE_URL}/invite-user/`,{params}
    ).then(res => res.data);
}

export const addInvitedUser = (body) => {
    console.log(body);
    return axiosClient.post(
        `${BASE_URL}/invite-user/`,body
    ).then(res => res.data);
}

export const updateInvitedUser = (id,body) => {
    return axiosClient.put(
        `${BASE_URL}/invite-user/${id}`,body
    ).then(res => res.data);
}

export const deleteInvitedUser = (id) => {
    return axiosClient.delete(
        `${BASE_URL}/invite-user/${id}`
    ).then(res => res.data);
}

export const getInvitedUserById = (id) => {
    return axiosClient.get(
        `${BASE_URL}/invite-user/${id}`
    ).then(res => res.data);
}

export const toggleStatusById = (id) => {
    return axiosClient.put(
        `${BASE_URL}/invite-user/${id}/toggle-status`
    ).then(res => res.data);
}

