import { useEffect, useState } from "react";
import axios from "../api/axios";
import ChatBox from "../components/ChatBox";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HirerDashboard() {
  const navigate = useNavigate();

  const hirerId = localStorage.getItem("userId");
  //const token = localStorage.getItem("token");

  const [jobs, setJobs] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [activeJob, setActiveJob] = useState(null);
  const [selectedChatUser, setSelectedChatUser] = useState(null);

  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingQuotes, setLoadingQuotes] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  /* ================= AUTH GUARD ================= */

useEffect(() => {
  if (typeof window === "undefined") return;

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userId");

  if (!token || !id) {
    navigate("/login");
    return;
  }

  loadJobs(id);
}, [navigate]);


  /* ================= LOAD JOBS ================= */

  const loadJobs = async (id) => {
    try {
      setLoadingJobs(true);

      const res = await axios.get(`/api/requests/hirer/${id}`);

      setJobs(res.data || []);

      if (res.data.length > 0) {
        const firstJob = res.data[0];
        setActiveJob(firstJob); // 🔥 THIS WAS MISSING

        if (firstJob.freelancerId?._id) {
          setSelectedChatUser(firstJob.freelancerId._id);
        }
      }
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoadingJobs(false);
    }
  };

  /* ================= LOAD QUOTES ================= */

  const loadQuotes = async (jobId) => {
    if (!jobId) return;

    setLoadingQuotes(true);

    try {
      const res = await axios.get(`/api/quotes/job/${jobId}`);
      setQuotes(res.data || []);
    } catch (err) {
      console.log("Quotes error", err);
    } finally {
      setLoadingQuotes(false);
    }
  };

  /* ================= HIRE FREELANCER ================= */

  const acceptQuote = async (quote) => {
    if (!activeJob) return;

    try {
      setActionLoading(true);

      await axios.put(`/api/quotes/accept/${quote._id}`);

      await axios.put(`/api/requests/assign`, {
        jobId: activeJob._id,
        freelancerId: quote.freelancerId,
      });

      const updated = await axios.get(`/api/requests/${activeJob._id}`);

      setActiveJob(updated.data);

      // 🔥 OPEN CHAT IMMEDIATELY
      setSelectedChatUser(updated.data.freelancerId._id);

      await loadJobs(hirerId);
    } catch (err) {
      handleAuthError(err);
    } finally {
      setActionLoading(false);
    }
  };

  /* ================= PAYMENT RELEASE ================= */

  const releasePayment = async () => {
    if (!activeJob?.freelancerId) {
      alert("No freelancer assigned yet");
      return;
    }

    try {
      setActionLoading(true);

      await axios.post("/api/payments/release", {
        jobId: activeJob._id,
      });

      alert("Payment released successfully");
    } catch (err) {
      handleAuthError(err);
    } finally {
      setActionLoading(false);
    }
  };

  /* ================= AUTH ERROR HANDLER ================= */

  const handleAuthError = (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      navigate("/login");
    } else {
      console.log(err);
    }
  };

  /* ================= UI ================= */

  return (
    <div style={layout}>
      {/* LEFT PROJECT LIST */}
      <aside style={sidebar}>
        <h2 style={logo}>Your Projects</h2>

        {loadingJobs && <p>Loading jobs...</p>}

        {!loadingJobs && jobs.length === 0 && (
          <p>No projects yet. Post a job to begin.</p>
        )}

        {jobs.map((job) => (
          <div
            key={job._id}
            style={activeJob?._id === job._id ? activeProjectItem : projectItem}
            onClick={() => {
              setActiveJob(job);
              loadQuotes(job._id);

              if (job.freelancerId?._id) {
                setSelectedChatUser(job.freelancerId._id);
              } else {
                setSelectedChatUser(null);
              }
            }}
          >
            <strong>{job.service}</strong>
            <p style={meta}>{job.location}</p>
            <span style={status(job.status)}>{job.status}</span>
          </div>
        ))}
      </aside>

      {/* MAIN */}
      <main style={main}>
        {!activeJob && <p>Select a project</p>}

        {activeJob && (
          <>
            <h1 style={jobTitle}>{activeJob.service}</h1>
            <p style={description}>{activeJob.description}</p>

            {/* QUOTES */}
            <h3 style={sectionTitle}>Freelancer Quotes</h3>

            {loadingQuotes && <p>Loading quotes...</p>}

            {!loadingQuotes && quotes.length === 0 && <p>No freelancers yet</p>}

            {quotes.map((q) => (
              <motion.div
                key={q._id}
                style={quoteCard}
                onClick={() => setSelectedChatUser(q.freelancerId)}
              >
                <div>
                  <h4>£{q.price}</h4>
                  <p>{q.message}</p>
                  <span style={quoteStatus}>{q.status}</span>
                </div>

                {q.status !== "accepted" && (
                  <button
                    style={hireBtn}
                    onClick={() => acceptQuote(q)}
                    disabled={actionLoading}
                  >
                    Hire
                  </button>
                )}
              </motion.div>
            ))}
            {/* HIRED FREELANCER PANEL */}
            {activeJob?.freelancerId && (
              <div
                style={{
                  background: "#EEF2FF",
                  padding: "15px",
                  borderRadius: "12px",
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>Freelancer Assigned:</strong>
                  <div>{activeJob.freelancerId.name}</div>
                </div>

                <button
                  style={{
                    background: "#4F46E5",
                    color: "#fff",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "none",
                  }}
  onClick={() => {
  if (activeJob?.freelancerId?._id) {
    setSelectedChatUser(activeJob.freelancerId._id);
  }
}}
                >
                  Message Freelancer
                </button>
              </div>
            )}

            {/* CHAT */}
            {activeJob && selectedChatUser && (
              <>
                <h3 style={sectionTitle}>Project Conversation</h3>
                <ChatBox jobId={activeJob._id} receiverId={selectedChatUser} />
              </>
            )}
          </>
        )}
      </main>

      {/* RIGHT PANEL */}
      <aside style={right}>
        <div style={box}>
          <h4>Escrow Payment</h4>
          <p>Funds protected until completion</p>

          <button
            style={primaryBtn}
            onClick={releasePayment}
            disabled={!activeJob?.freelancerId || actionLoading}
          >
            Release Payment
          </button>
        </div>

        <div style={box}>
          <h4>Project Timeline</h4>
          <ul style={timeline}>
            <li>Job Posted</li>
            <li>Quotes Received</li>
            <li>Freelancer Hired</li>
            <li>Work in Progress</li>
            <li>Completed</li>
          </ul>
        </div>

        <div style={supportBox}>
          <h4>Need help?</h4>
          <button style={contactBtn}>Contact Support</button>
        </div>
      </aside>
    </div>
  );
}

/* ================= STYLES ================= */

const layout = {
  display: "grid",
  gridTemplateColumns: "260px 1fr 300px",
  minHeight: "100vh",
  background: "#F9FAFB",
};

const sidebar = {
  background: "#fff",
  padding: "25px",
  borderRight: "1px solid #eee",
};

const logo = {
  fontSize: "22px",
  fontWeight: "bold",
  marginBottom: "24px",
};

const main = { padding: "35px" };

const right = {
  padding: "25px",
};

const projectItem = {
  padding: "14px",
  background: "#F3F4F6",
  borderRadius: "10px",
  marginBottom: "12px",
  cursor: "pointer",
};

const meta = {
  fontSize: "12px",
  color: "#6B7280",
  marginTop: "4px",
};

const activeProjectItem = {
  ...projectItem,
  background: "#0B5ED7",
  color: "#fff",
};

const status = (s) => ({
  marginTop: "6px",
  display: "inline-block",
  fontSize: "11px",
  background: "#E0E7FF",
  padding: "4px 8px",
  borderRadius: "6px",
});

const quoteCard = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  marginTop: "15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const hireBtn = {
  background: "#22C55E",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
};

const primaryBtn = {
  background: "#0B5ED7",
  color: "#fff",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  width: "100%",
};

const quoteStatus = {
  fontSize: "12px",
  background: "#E0E7FF",
  padding: "6px 10px",
  borderRadius: "8px",
};

const sectionTitle = {
  marginTop: "25px",
};

const jobTitle = {
  fontSize: "28px",
  fontWeight: "bold",
};

const description = {
  marginTop: "8px",
  color: "#6B7280",
};

const box = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
};

const supportBox = {
  background: "#111827",
  color: "#fff",
  padding: "20px",
  borderRadius: "12px",
};

const contactBtn = {
  marginTop: "10px",
  background: "#fff",
  color: "#111827",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
};

const timeline = {
  paddingLeft: "18px",
};
