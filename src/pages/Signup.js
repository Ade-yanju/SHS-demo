import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "hirer",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    if (!form.name || !form.email || !form.password) {
      setMessage("Please fill all required fields");
      return;
    }

    if (form.password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "https://shs-demo-backend.onrender.com/api/auth/signup",
        form,
      );

      setLoading(false);
      setMessage(res.data.message);
    } catch (err) {
      setLoading(false);
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={pageWrapper}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={card}
      >
        <h1>Create Account</h1>
        <p style={subtitle}>Join the construction marketplace platform.</p>

        {message && <div style={alert}>{message}</div>}

        <input
          name="name"
          placeholder="Full Name"
          style={input}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email Address"
          style={input}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          style={input}
          onChange={handleChange}
        />

        {/* ROLE SELECT */}
        <div style={{ marginTop: "10px" }}>
          <label>Select Role</label>

          <select name="role" style={select} onChange={handleChange}>
            <option value="hirer">I want to hire workers</option>
            <option value="freelancer">I am a skilled freelancer</option>
          </select>

          <p style={roleHint}>
            Freelancers require platform approval before access.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={btn}
          onClick={signupUser}
        >
          {loading ? "Creating account..." : "Create Account"}
        </motion.button>

        <p style={loginLink}>Already have an account? Login</p>
      </motion.div>
    </div>
  );
}

/* ======================
   STYLES
====================== */

const pageWrapper = {
  minHeight: "100vh",
  background: "#F9FAFB",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
};

const card = {
  width: "100%",
  maxWidth: "420px",
  background: "#fff",
  padding: "40px",
  borderRadius: "14px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
};

const subtitle = {
  color: "#6B7280",
  marginBottom: "20px",
};

const input = {
  width: "100%",
  padding: "14px",
  marginBottom: "14px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const select = {
  width: "100%",
  padding: "14px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  marginTop: "6px",
};

const roleHint = {
  fontSize: "12px",
  color: "#6B7280",
  marginTop: "6px",
};

const btn = {
  width: "100%",
  marginTop: "20px",
  background: "#0B5ED7",
  color: "#fff",
  padding: "14px",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
};

const alert = {
  background: "#FEE2E2",
  color: "#B91C1C",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "12px",
};

const loginLink = {
  marginTop: "16px",
  textAlign: "center",
  color: "#0B5ED7",
  cursor: "pointer",
};
