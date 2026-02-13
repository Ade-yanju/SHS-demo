import { useEffect, useState } from "react";
import axios from "../api/axios";
import ChatBox from "../components/ChatBox";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [activeJob, setActiveJob] = useState(null);
  const [earnings, setEarnings] = useState(0);
  const [loading, setLoading] = useState(true);

  const freelancerId = localStorage.getItem("userId");

  useEffect(() => {
    if (!freelancerId) return;
    fetchDashboardData();
  }, [freelancerId]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [jobRes, quoteRes] = await Promise.all([
        axios.get("/api/requests/freelancer/my-jobs"),
        axios.get(`/api/quotes/freelancer/${freelancerId}`),
      ]);

      setJobs(jobRes.data);
      setQuotes(quoteRes.data);
      setActiveJob(jobRes.data[0] || null);

      /* real earnings calculation */
      const paidQuotes = quoteRes.data.filter((q) => q.status === "paid");
      const total = paidQuotes.reduce(
        (acc, q) => acc + Number(q.price || 0),
        0,
      );

      setEarnings(total);
    } catch (err) {
      console.error("FREELANCER DASHBOARD ERROR:", err);

      if (err.response?.status === 401) {
        // token expired or missing
        localStorage.clear();
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p style={{ padding: "40px" }}>Loading dashboard...</p>;

  return (
    <div style={page}>
      {/* LEFT */}
      <div style={sidebar}>
        <h3>Active Projects</h3>

        {jobs.map((job) => (
          <div
            key={job._id}
            style={projectItem}
            onClick={() => setActiveJob(job)}
          >
            <strong>{job.service}</strong>
            <p style={meta}>{job.location}</p>
          </div>
        ))}

        <h3 style={{ marginTop: "30px" }}>Quotes Sent</h3>

        {quotes.map((q) => (
          <div key={q._id} style={quoteItem}>
            £{q.price} — {q.status}
          </div>
        ))}
      </div>

      {/* CENTER */}
      <div style={mainPanel}>
        {activeJob ? (
          <>
            <h2>{activeJob.service}</h2>
            <p>{activeJob.description}</p>

            <ChatBox jobId={activeJob._id} receiverId={activeJob.userId} />
          </>
        ) : (
          <p>No active project</p>
        )}
      </div>

      {/* RIGHT */}
      <div style={rightPanel}>
        <div style={invoiceBox}>
          <h4>Total Earnings</h4>
          <h2>£{earnings}</h2>
        </div>

        <div style={activityBox}>
          <h4>Recent Activity</h4>
          <p>Quotes submitted</p>
          <p>Client replies</p>
          <p>Payments received</p>
        </div>

        <div style={contractorBox}>
          <h4>Status</h4>
          <button style={availableBtn}>Available for work</button>
        </div>
      </div>
    </div>
  );
}

/* styles trimmed for brevity — reuse yours */

/* =====================
   RESPONSIVE STYLES
===================== */

const page = {
  display: "flex",
  flexWrap: "wrap",
  minHeight: "100vh",
  background: "#F9FAFB",
};

/* LEFT */
const sidebar = {
  flex: "1 1 220px",
  background: "#fff",
  padding: "20px",
  borderRight: "1px solid #eee",
};

const projectItem = {
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "10px",
  background: "#F3F4F6",
  cursor: "pointer",
};

const quoteItem = {
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "8px",
  background: "#E0E7FF",
  color: "#3730A3",
  fontWeight: "bold",
};

const meta = {
  fontSize: "12px",
  color: "#6B7280",
  margin: "5px 0 0 0",
};

/* CENTER */
const mainPanel = {
  flex: "3 1 500px",
  padding: "30px",
};

const progressSection = {
  marginTop: "20px",
};

const progressBar = {
  height: "8px",
  background: "#E5E7EB",
  borderRadius: "6px",
  overflow: "hidden",
};

const progressFill = {
  height: "100%",
  background: "#0B5ED7",
};

const chatBox = {
  marginTop: "30px",
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
};

const message = {
  background: "#F3F4F6",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "10px",
};

const messageAlt = {
  background: "#0B5ED7",
  color: "#fff",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "10px",
};

const chatInput = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

/* RIGHT */
const rightPanel = {
  flex: "1 1 260px",
  padding: "20px",
};

const invoiceBox = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
};

const activityBox = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
};

const contractorBox = {
  background: "#111827",
  color: "#fff",
  padding: "20px",
  borderRadius: "12px",
};

const availableBtn = {
  marginTop: "10px",
  background: "#22C55E",
  color: "#fff",
  padding: "10px 16px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const payBtn = {
  marginTop: "10px",
  background: "#0B5ED7",
  color: "#fff",
  padding: "10px 16px",
  border: "none",
  borderRadius: "8px",
};

const callBtn = {
  marginTop: "10px",
  width: "100%",
  padding: "10px",
  border: "none",
  borderRadius: "8px",
};

const emailBtn = {
  marginTop: "10px",
  width: "100%",
  padding: "10px",
  border: "none",
  borderRadius: "8px",
};
