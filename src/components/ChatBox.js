import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

export default function ChatBox({ jobId, receiverId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const senderId = localStorage.getItem("userId");

  useEffect(() => {
    socket.emit("joinRoom", jobId);

    fetchMessages();

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, [jobId]);

  const fetchMessages = async () => {
    const res = await axios.get(`http://localhost:5000/api/messages/${jobId}`);
    setMessages(res.data);
  };

  const sendMessage = () => {
    const messageData = {
      jobId,
      senderId,
      receiverId,
      text,
    };

    socket.emit("sendMessage", messageData);
    setText("");
  };

  return (
    <div style={chatWrapper}>
      <div style={messagesBox}>
        {messages.map((msg, i) => (
          <div key={i} style={msg.senderId === senderId ? myMsg : otherMsg}>
            {msg.text}
          </div>
        ))}
      </div>

      <div style={inputArea}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          style={chatInput}
        />

        <button onClick={sendMessage} style={sendBtn}>
          Send
        </button>
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
