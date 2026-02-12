import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import QuoteModal from "../components/QuoteModal";
import { useNavigate } from "react-router-dom";

export default function Marketplace() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [trade, setTrade] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  const [loading, setLoading] = useState(true);

  /* ================= ROLE PROTECTION ================= */

  useEffect(() => {
    if (role !== "freelancer") {
      navigate("/hirer-dashboard");
      return;
    }

    fetchJobs();

    // auto refresh marketplace every 10s
    const interval = setInterval(fetchJobs, 10000);
    return () => clearInterval(interval);
  }, []);

  /* ================= LOAD JOBS ================= */

  const fetchJobs = async () => {
    try {
      const res = await axios.get("/api/requests"); // token auto attached

      const mapped = res.data.map((job) => ({
        id: job._id,
        title: job.service,
        client: job.userId?.name || job.name,
        location: job.location,
        description: job.description,
        trade: job.service,
        hirerId: job.userId?._id,
        createdAt: job.createdAt,
      }));

      setJobs(mapped);
      setFilteredJobs(mapped);
    } catch (err) {
      console.log("MARKETPLACE ERROR:", err);
    }
  };

  /* ================= FILTERS ================= */

  useEffect(() => {
    applyFilters();
  }, [search, trade, jobs]);

  const applyFilters = () => {
    let data = [...jobs];

    if (search) {
      data = data.filter((job) =>
        `${job.title}${job.location}${job.client}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
    }

    if (trade) {
      data = data.filter((job) =>
        job.trade.toLowerCase().includes(trade.toLowerCase()),
      );
    }

    setFilteredJobs(data);
  };

  /* ================= QUOTE ================= */

  const openQuoteModal = (job) => setSelectedJob(job);
  const closeQuoteModal = () => setSelectedJob(null);

  /* ================= TIME FORMAT ================= */

  const timeAgo = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  /* ================= UI ================= */

  return (
    <div style={layout}>
      <main style={feedWrapper}>
        <h1 style={heading}>Live Jobs from Hirers</h1>

        {/* SEARCH */}
        <input
          placeholder="Search by job or location..."
          style={searchInput}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <p style={{ marginTop: "20px" }}>Loading jobs...</p>}

        {!loading && filteredJobs.length === 0 && (
          <p style={{ marginTop: "20px" }}>No jobs posted yet</p>
        )}

        <div style={jobGrid}>
          {filteredJobs.map((job) => (
            <motion.div key={job.id} whileHover={{ y: -4 }} style={jobCard}>
              <div>
                <h3 style={jobTitle}>{job.title}</h3>

                <p style={meta}>
                  {job.location} • {timeAgo(job.createdAt)}
                </p>

                <p style={desc}>{job.description}</p>

                <span style={clientTag}>Posted by: {job.client}</span>
              </div>

              <button style={quoteBtn} onClick={() => openQuoteModal(job)}>
                Send Quote
              </button>
            </motion.div>
          ))}
        </div>
      </main>

      {/* QUOTE MODAL */}
      {selectedJob && <QuoteModal job={selectedJob} close={closeQuoteModal} />}
    </div>
  );
}

/* ================= STYLES ================= */

const layout = {
  display: "flex",
  padding: "20px",
  background: "#F9FAFB",
};

const feedWrapper = {
  flex: 1,
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
};

const searchInput = {
  width: "100%",
  marginTop: "18px",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #E5E7EB",
};

const jobGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
  gap: "20px",
  marginTop: "24px",
};

const jobCard = {
  background: "#fff",
  padding: "22px",
  borderRadius: "14px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
};

const jobTitle = {
  fontSize: "18px",
  fontWeight: "600",
};

const meta = {
  fontSize: "13px",
  color: "#6B7280",
  marginTop: "6px",
};

const desc = {
  marginTop: "10px",
  color: "#374151",
  lineHeight: "1.5",
};

const clientTag = {
  marginTop: "12px",
  background: "#E0E7FF",
  padding: "6px 10px",
  borderRadius: "8px",
  fontSize: "12px",
  width: "fit-content",
};

const quoteBtn = {
  marginTop: "20px",
  background: "#16A34A",
  color: "#fff",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  fontWeight: "600",
};
