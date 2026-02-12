import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImg from "../../assets/hero.jpg";

export default function HeroSection() {
  return (
    <div style={heroWrapper}>
      
      {/* overlay */}
      <div style={overlay} />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={content}
      >
        <h1 style={title}>
          Find Trusted Construction Pros in Your Area
        </h1>

        <p style={subtitle}>
          From quick plumbing fixes to major renovations.
        </p>

        {/* search */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={searchBox}
        >
          <input
            placeholder="What do you need? (Plumber, Builder)"
            style={input}
          />

          <input
            placeholder="Location"
            style={input}
          />

          <button style={searchBtn}>
            Search
          </button>
        </motion.div>

        {/* CTA buttons */}
        <div style={ctaContainer}>
          <Link to="/signup">
            <button style={primaryBtn}>Get Started</button>
          </Link>

          <Link to="/login">
            <button style={secondaryBtn}>Login</button>
          </Link>
        </div>

        {/* trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={trustIndicators}
        >
          <span>✔ Verified Pros</span>
          <span>✔ Free Quotes</span>
          <span>✔ Insured Work</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ===========================
   RESPONSIVE STYLES
=========================== */

const heroWrapper = {
  height: "100vh",
  backgroundImage: `url(${heroImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  position: "relative",
  padding: "20px",
};

const overlay = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
};

const content = {
  position: "relative",
  textAlign: "center",
  maxWidth: "900px",
  width: "100%",
};

const title = {
  fontSize: "clamp(28px, 5vw, 56px)",
  fontWeight: "bold",
};

const subtitle = {
  marginTop: "12px",
  fontSize: "clamp(14px, 2vw, 18px)",
};

const searchBox = {
  marginTop: "30px",
  background: "#fff",
  padding: "10px",
  borderRadius: "10px",
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  justifyContent: "center",
};

const input = {
  border: "none",
  outline: "none",
  padding: "12px",
  flex: "1 1 200px",
  minWidth: "160px",
};

const searchBtn = {
  background: "#0B5ED7",
  color: "#fff",
  padding: "12px 20px",
  borderRadius: "8px",
  border: "none",
};

const ctaContainer = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
  gap: "12px",
  flexWrap: "wrap",
};

const primaryBtn = {
  background: "#0B5ED7",
  color: "#fff",
  padding: "12px 22px",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
};

const secondaryBtn = {
  background: "#fff",
  color: "#0B5ED7",
  padding: "12px 22px",
  border: "1px solid #0B5ED7",
  borderRadius: "8px",
  fontWeight: "600",
};

const trustIndicators = {
  marginTop: "22px",
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  fontSize: "14px",
  flexWrap: "wrap",
};
