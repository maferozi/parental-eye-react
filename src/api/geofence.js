import axios from "axios"
import axiosClient from "./axios";
import { BASE_URL } from "../constants";

export const getGeofenceData = (params) => {
    return axiosClient.get(
        `${BASE_URL}/api/geofence/`,{params}).then(res => res.data);
}

export const getAssignedGeofenceDevices = () => {
    return axiosClient.get(
        `${BASE_URL}/api/geofence/get-assigned-devices`).then(res => res.data);
}

export const createGeofence = (body) => {
    return axiosClient.post(`${BASE_URL}/api/geofence/`, body).then(res => res.data);
}


export const assignGeofenceToDevice = (body) => {
    return axiosClient.post(`${BASE_URL}/api/geofence/assign`, body).then(res => res.data);
}

export const unassignGeofenceToDevice = (body) => {
    return axiosClient.post(`${BASE_URL}/api/geofence/unassign`, body).then(res => res.data);
}

export const deleteGeofence = (id) => {
    return axiosClient.delete(`${BASE_URL}/api/geofence/${id}`).then(res => res.data);
}

