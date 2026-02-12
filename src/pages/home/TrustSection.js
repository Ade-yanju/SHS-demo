import { motion } from "framer-motion";
import { FaShieldAlt, FaStar, FaHeadset } from "react-icons/fa";

export default function TrustSection() {
  return (
    <div
      style={{
        padding: "90px 60px",
        background: "#F1F5F9",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        alignItems: "center"
      }}
    >
      
      {/* LEFT CONTENT */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 style={{ fontSize: "30px" }}>Built on Trust & Quality</h2>

        <div style={{ marginTop: "25px" }}>
          <p style={{ marginBottom: "20px" }}>
            <FaShieldAlt color="#0B5ED7" /> Vetting Professionals  
            <br />
            <span style={{ color: "#6B7280", fontSize: "14px" }}>
              Every pro passes identity & background checks.
            </span>
          </p>

          <p style={{ marginBottom: "20px" }}>
            <FaStar color="#0B5ED7" /> Real Customer Reviews  
            <br />
            <span style={{ color: "#6B7280", fontSize: "14px" }}>
              Verified reviews from real homeowners.
            </span>
          </p>

          <p>
            <FaHeadset color="#0B5ED7" /> Dedicated Support  
            <br />
            <span style={{ color: "#6B7280", fontSize: "14px" }}>
              Our team helps at every stage of your project.
            </span>
          </p>
        </div>
      </motion.div>

      {/* RIGHT CARD */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "14px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
        }}
      >
        <h3>M&S Builders Ltd</h3>
        <p style={{ color: "#6B7280", fontSize: "14px" }}>London, UK</p>

        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          ⭐ 4.9 (128 reviews)
        </p>

        <p style={{ marginTop: "10px", fontSize: "14px", color: "#6B7280" }}>
          “Excellent work on our renovation. Professional and reliable team.”
        </p>

        <button
          style={{
            marginTop: "20px",
            width: "100%",
            background: "#0B5ED7",
            color: "#fff",
            padding: "12px",
            borderRadius: "8px",
            border: "none"
          }}
        >
          View Profile
        </button>
      </motion.div>
    </div>
  );
}
