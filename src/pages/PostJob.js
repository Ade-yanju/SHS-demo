import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    service: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  /* =========================
     AUTH + ROLE GUARD
  ========================== */
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (role !== "hirer") {
      navigate("/");
    }
  }, [role, token, navigate]);

  /* =========================
     INPUT HANDLER
  ========================== */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* =========================
     SUBMIT JOB
  ========================== */
  const submitJob = async () => {
    if (loading) return;

    if (!form.service || !form.location) {
      setError("Service and location are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post("/api/requests", {
        ...form,
        name, // auto attach hirer name
      });

      setSuccess(true);
      setForm({
        service: "",
        location: "",
        description: "",
      });

      // redirect after 1.5s
      setTimeout(() => {
        navigate("/hirer-dashboard");
      }, 1500);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }

      setError(err.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UI
  ========================== */

  return (
    <div style={pageWrapper}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={container}
      >
        <h1 style={title}>Post a Job</h1>

        <p style={subtitle}>
          Describe what you need. Verified freelancers will send quotes.
        </p>

        {success && (
          <div style={successBox}>
            Job posted successfully 🎉 Redirecting...
          </div>
        )}

        {error && <div style={errorBox}>{error}</div>}

        <div style={formGrid}>
          {/* AUTO NAME */}
          <input value={name || ""} disabled style={inputDisabled} />

          <input
            name="service"
            placeholder="Service Needed (Plumbing, Roofing...)"
            value={form.service}
            style={input}
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            style={input}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Describe the job in detail..."
            value={form.description}
            style={textarea}
            onChange={handleChange}
          />
        </div>

        <motion.button
          disabled={loading}
          style={loading ? btnDisabled : btn}
          whileTap={{ scale: 0.96 }}
          onClick={submitJob}
        >
          {loading ? "Posting Job..." : "Submit Job"}
        </motion.button>
      </motion.div>
    </div>
  );
}

/* ================= STYLES ================= */

const pageWrapper = {
  display: "flex",
  justifyContent: "center",
  padding: "80px 20px",
  background: "#F9FAFB",
  minHeight: "100vh",
};

const container = {
  width: "100%",
  maxWidth: "720px",
  background: "#fff",
  padding: "40px",
  borderRadius: "16px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
};

const title = {
  fontSize: "28px",
  fontWeight: "bold",
};

const subtitle = {
  color: "#6B7280",
  marginBottom: "30px",
};

const formGrid = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const input = {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #E5E7EB",
};

const inputDisabled = {
  ...input,
  background: "#F3F4F6",
  cursor: "not-allowed",
};

const textarea = {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #E5E7EB",
  height: "120px",
};

const btn = {
  marginTop: "20px",
  background: "#0B5ED7",
  color: "#fff",
  padding: "14px",
  border: "none",
  borderRadius: "10px",
  fontWeight: "600",
  cursor: "pointer",
};

const btnDisabled = {
  ...btn,
  background: "#9CA3AF",
  cursor: "not-allowed",
};

const successBox = {
  background: "#E7F7ED",
  color: "#1E7A3E",
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "20px",
};

const errorBox = {
  background: "#FEE2E2",
  color: "#991B1B",
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "20px",
};
