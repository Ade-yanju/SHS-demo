import { useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function QuoteModal({ job, close }) {
  const navigate = useNavigate();

  const freelancerId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /* ================= ROLE PROTECTION ================= */

  if (role !== "freelancer") {
    navigate("/");
    return null;
  }

  /* ================= VALIDATION ================= */

  const validate = () => {
    if (!price) return "Price is required";
    if (Number(price) <= 0) return "Enter valid price";
    if (!message) return "Message is required";
    if (message.length < 10) return "Message too short";
    return null;
  };

  /* ================= SUBMIT QUOTE ================= */

  const submitQuote = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post("/api/quotes", {
        jobId: job._id,
        price,
        message,
      });

      setSuccess(true);

      // auto close modal after success
      setTimeout(() => {
        close();
      }, 1500);
    } catch (err) {
      console.log("QUOTE ERROR:", err);

      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }

      setError(err.response?.data?.message || "Failed to send quote");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div style={overlay}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={modal}
      >
        <h2>Send Quote</h2>

        {success && <div style={successBox}>Quote sent successfully 🎉</div>}

        {error && <div style={errorBox}>{error}</div>}

        {/* PRICE */}
        <input
          placeholder="Enter your price (£)"
          style={input}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* MESSAGE */}
        <textarea
          placeholder="Explain how you’ll handle this job..."
          style={textarea}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* ACTIONS */}
        <div style={actions}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            style={loading ? submitDisabled : submitBtn}
            onClick={submitQuote}
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit Quote"}
          </motion.button>

          <button style={cancelBtn} onClick={close}>
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* =======================
   STYLES
======================= */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modal = {
  background: "#fff",
  padding: "30px",
  borderRadius: "14px",
  width: "100%",
  maxWidth: "440px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
};

const input = {
  width: "100%",
  padding: "14px",
  marginTop: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #E5E7EB",
};

const textarea = {
  width: "100%",
  padding: "14px",
  height: "120px",
  borderRadius: "10px",
  border: "1px solid #E5E7EB",
  marginBottom: "12px",
};

const actions = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
};

const submitBtn = {
  background: "#16A34A",
  color: "#fff",
  padding: "12px 18px",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
};

const submitDisabled = {
  ...submitBtn,
  background: "#9CA3AF",
};

const cancelBtn = {
  background: "#EF4444",
  color: "#fff",
  padding: "12px 18px",
  border: "none",
  borderRadius: "8px",
};

const successBox = {
  background: "#E7F7ED",
  color: "#1E7A3E",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "12px",
};

const errorBox = {
  background: "#FEE2E2",
  color: "#991B1B",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "12px",
};
