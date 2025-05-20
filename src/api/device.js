import axios from "axios"
import axiosClient from "./axios";
import { BASE_URL } from "../constants";

export const getAllDevices = (params) => {
    return axiosClient.get(
        `${BASE_URL}/api/device/`,{params}
    ).then(res => res.data);
}
export const getActiveDevices = () => {
    return axiosClient.get(
        `${BASE_URL}/api/device/active-devices/`)
        .then(res => res.data);
}

export const addDevice = (body) => {
    console.log(body);
    return axiosClient.post(
        `${BASE_URL}/api/device/`,body
    ).then(res => res.data);
}

export const updateDevice = (id,body) => {
    return axiosClient.put(
        `${BASE_URL}/api/device/${id}`,body
    ).then(res => res.data);
}

export const deleteDevice = (id) => {
    return axiosClient.delete(
        `${BASE_URL}/api/device/${id}`
    ).then(res => res.data);
}

export const getDeviceById = (id) => {
    return axiosClient.get(
        `${BASE_URL}/api/device/${id}`
    ).then(res => res.data);
}

export const assignDeviceToParent = (body) => {
    return axiosClient.post(
        `${BASE_URL}/api/device/update-status`,body
    ).then(res => res.data);
}

export const assignDeviceToChild = (body) => {
    return axiosClient.post(
        `${BASE_URL}/api/device/assign-child`,body
    ).then(res => res.data);
}
//body=> childId, deviceId
        
export const getUnassignedChild = () => {
    return axiosClient.get(
        `${BASE_URL}/api/device/unassigned-child`
    ).then(res => res.data);
}

export const unAssignParent = (id) => {
    return axiosClient.put(
        `${BASE_URL}/api/device/unassign-parent/${id}`
    ).then(res => res.data);
}
export const unAssignChild = (id) => {
    return axiosClient.put(
        `${BASE_URL}/api/device/unassign-child/${id}`
    ).then(res => res.data);
}


export const createDeviceRequest = (body)=>{
    return axiosClient.post(
        `${BASE_URL}/api/device-request/`,body
    ).then(res => res.data);
}


export const getDeviceRequest = ()=>{
    return axiosClient.get(
        `${BASE_URL}/api/device-request/`
    ).then(res => res.data);
}