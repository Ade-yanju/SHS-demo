import { motion } from "framer-motion";
import {
  FaWrench,
  FaBolt,
  FaPaintRoller,
  FaHammer,
  FaHome,
  FaTools,
} from "react-icons/fa";

const trades = [
  { name: "Plumbing", count: "1.2k Pros", icon: <FaWrench /> },
  { name: "Electrical", count: "980 Pros", icon: <FaBolt /> },
  { name: "Roofing", count: "450 Pros", icon: <FaHome /> },
  { name: "Carpentry", count: "820 Pros", icon: <FaTools /> },
  { name: "Painting", count: "1.5k Pros", icon: <FaPaintRoller /> },
  { name: "General Build", count: "600 Pros", icon: <FaHammer /> },
];

export default function PopularTrades() {
  return (
    <div style={{ padding: "80px 60px", background: "#ffffff" }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ fontSize: "28px" }}
      >
        Popular Trades
      </motion.h2>

      <p style={{ color: "#6B7280", marginTop: "6px" }}>
        Most requested services this week.
      </p>

      <div
        style={{
          marginTop: "40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "24px",
        }}
      >
        {trades.map((trade, i) => (
          <motion.div
            key={trade.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{
              y: -6,
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            }}
            style={{
              background: "#F9FAFB",
              borderRadius: "14px",
              padding: "28px 20px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                fontSize: "26px",
                color: "#0B5ED7",
                marginBottom: "12px",
              }}
            >
              {trade.icon}
            </div>

            <h4 style={{ marginBottom: "6px" }}>{trade.name}</h4>

            <span style={{ fontSize: "13px", color: "#6B7280" }}>
              {trade.count}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
