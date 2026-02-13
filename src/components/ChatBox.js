import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("https://shs-demo-backend.onrender.com");

export default function ChatBox({ jobId, receiverId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const senderId = localStorage.getItem("userId");

  const roomId = `${jobId}_${receiverId}`;

  /* JOIN PRIVATE ROOM */
  useEffect(() => {
    if (!jobId || !receiverId || !senderId) return;

    socket.emit("joinRoom", { roomId });

    loadMessages();

    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receiveMessage", handleMessage);

    return () => socket.off("receiveMessage", handleMessage);
  }, [jobId, receiverId]);

  /* LOAD CHAT HISTORY */
  const loadMessages = async () => {
    const res = await axios.get(
      `https://shs-demo-backend.onrender.com/api/messages/${jobId}/${receiverId}`,
    );
    setMessages(res.data);
  };

  /* SEND MESSAGE */
  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      roomId,
      jobId,
      senderId,
      receiverId,
      text,
    });

    setText("");
  };

  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          height: 300,
          overflowY: "auto",
          background: "#fff",
          padding: 12,
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg._id}
            style={
              msg.senderId === senderId
                ? {
                    background: "#0B5ED7",
                    color: "#fff",
                    padding: 8,
                    marginBottom: 6,
                    borderRadius: 6,
                  }
                : {
                    background: "#F3F4F6",
                    padding: 8,
                    marginBottom: 6,
                    borderRadius: 6,
                  }
            }
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ flex: 1, padding: 10 }}
          placeholder="Type message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

/* styles */
const chatWrapper = { marginTop: "20px" };
const messagesBox = {
  height: "300px",
  overflowY: "auto",
  background: "#fff",
  padding: "12px",
  borderRadius: "8px",
};
const myMsg = {
  background: "#0B5ED7",
  color: "#fff",
  padding: "8px",
  borderRadius: "6px",
  marginBottom: "6px",
  alignSelf: "flex-end",
};
const otherMsg = {
  background: "#F3F4F6",
  padding: "8px",
  borderRadius: "6px",
  marginBottom: "6px",
};
const inputArea = { display: "flex", gap: "8px", marginTop: "10px" };
const chatInput = {
  flex: 1,
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ddd",
};
const sendBtn = {
  background: "#0B5ED7",
  color: "#fff",
  padding: "10px 14px",
  border: "none",
  borderRadius: "6px",
};
