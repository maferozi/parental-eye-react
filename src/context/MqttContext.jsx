import React, { createContext, useContext } from "react";
import useMqtt from "../hook/useMqtt";

const MqttContext = createContext();

export const MqttProvider = ({ children }) => {
  const { deviceLocations, clients } = useMqtt(); // Get all active MQTT data

  return (
    <MqttContext.Provider value={{ deviceLocations, clients }}>
      {children}
    </MqttContext.Provider>
  );
};

export const useMqttContext = () => useContext(MqttContext);
