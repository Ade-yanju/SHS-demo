import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const AdminNotificationContext = createContext();

export const AdminNotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("receiveNotification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });
  }, []);

  return (
    <AdminNotificationContext.Provider value={{ notifications }}>
      {children}
    </AdminNotificationContext.Provider>
  );
};
