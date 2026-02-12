import { useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* ================= INPUT HANDLER ================= */

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= LOGIN ================= */

  const loginUser = async () => {
    if (loading) return;

    if (!form.email || !form.password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post("/api/auth/login", form);

      const { token, user } = res.data;

      /* ================= SAVE SESSION ================= */

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("name", user.name);

      /* ================= REDIRECT BY ROLE ================= */

      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "hirer") {
        navigate("/hirer-dashboard");
      } else if (user.role === "freelancer") {
        navigate("/freelancer-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setMessage(err?.response?.data?.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  /* ENTER KEY SUBMIT */

  const handleKeyDown = (e) => {
    if (e.key === "Enter") loginUser();
  };

  /* ================= UI ================= */

  return (
    <div style={pageWrapper}>
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={card}
      >
        <h1 style={title}>Welcome Back 👋</h1>
        <p style={subtitle}>Login to access your dashboard</p>

        {message && <div style={alert}>{message}</div>}

        {/* EMAIL */}
        <input
          name="email"
          placeholder="Email address"
          value={form.email}
          style={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        {/* PASSWORD */}
        <div style={passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            style={passwordInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <span style={toggle} onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* LOGIN BUTTON */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          style={btn}
          onClick={loginUser}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </motion.button>

        {/* ACTION LINKS */}
        <div style={linksRow}>
          <span style={link} onClick={() => navigate("/signup")}>
            Create account
          </span>

          <span style={link}>Forgot password?</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ================= STYLES ================= */

const pageWrapper = {
  minHeight: "100vh",
  background: "linear-gradient(120deg,#F9FAFB,#EEF2FF)",
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
  borderRadius: "16px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.07)",
};

const title = {
  marginBottom: "6px",
};

const subtitle = {
  color: "#6B7280",
  marginBottom: "20px",
};

const input = {
  width: "100%",
  padding: "14px",
  marginBottom: "14px",
  borderRadius: "10px",
  border: "1px solid #E5E7EB",
  fontSize: "14px",
};

const passwordWrapper = {
  position: "relative",
  marginBottom: "14px",
};

const passwordInput = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #E5E7EB",
};

const toggle = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  fontSize: "13px",
  color: "#0B5ED7",
  fontWeight: "bold",
};

const btn = {
  width: "100%",
  marginTop: "10px",
  background: "#0B5ED7",
  color: "#fff",
  padding: "14px",
  border: "none",
  borderRadius: "10px",
  fontWeight: "600",
  cursor: "pointer",
};

const alert = {
  background: "#FEE2E2",
  color: "#B91C1C",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "12px",
  fontSize: "14px",
};

const linksRow = {
  marginTop: "16px",
  display: "flex",
  justifyContent: "space-between",
};

const link = {
  color: "#0B5ED7",
  fontSize: "14px",
  cursor: "pointer",
};
