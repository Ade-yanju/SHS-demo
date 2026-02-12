import { motion } from "framer-motion";
import { FaClipboardList, FaComments, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    icon: <FaClipboardList />,
    title: "Post a Job",
    desc: "Tell us what you need done. It’s free and takes less than 2 minutes.",
  },
  {
    icon: <FaComments />,
    title: "Receive Quotes",
    desc: "Get up to 3 quotes from local, interested professionals.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Hire & Review",
    desc: "Choose the best pro for you and get the job done confidently.",
  },
];

export default function HowItWorks() {
  return (
    <div style={{ padding: "90px 60px", background: "#F9FAFB" }}>
      
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ textAlign: "center", fontSize: "30px" }}
      >
        How BuildTrust Works
      </motion.h2>

      <p style={{
        textAlign: "center",
        color: "#6B7280",
        marginTop: "10px"
      }}>
        Getting your project done is easier than ever.
      </p>

      {/* Steps */}
      <div
        style={{
          marginTop: "60px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px",
          textAlign: "center"
        }}
      >
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "#E7F1FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                fontSize: "24px",
                color: "#0B5ED7",
              }}
            >
              {step.icon}
            </div>

            <h3 style={{ marginTop: "20px" }}>{step.title}</h3>

            <p style={{
              marginTop: "10px",
              color: "#6B7280",
              fontSize: "14px"
            }}>
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
