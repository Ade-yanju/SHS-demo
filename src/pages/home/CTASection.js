import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      style={{
        padding: "80px 40px",
        background: "#0B5ED7",
        color: "#fff",
        textAlign: "center"
      }}
    >
      <h2 style={{ fontSize: "32px" }}>
        Ready to start your project?
      </h2>

      <p style={{ marginTop: "10px" }}>
        Post your job today and connect with trusted professionals.
      </p>

      <button
        style={{
          marginTop: "25px",
          padding: "14px 30px",
          background: "#fff",
          color: "#0B5ED7",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold"
        }}
      >
        Get Started
      </button>
    </motion.div>
  );
}
