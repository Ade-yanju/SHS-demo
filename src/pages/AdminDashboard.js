import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";

/*
ENTERPRISE ADMIN DASHBOARD
Fully responsive • Backend integrated • Production layout
*/

export default function AdminDashboard() {
  const [section, setSection] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [stats, setStats] = useState({
    users: 0,
    freelancers: 0,
    jobs: 0,
    revenue: 0,
  });

  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [payments, setPayments] = useState([]);

  /* ================= RESPONSIVE HANDLER ================= */

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [statsRes, usersRes, jobsRes, quotesRes, paymentsRes] =
        await Promise.all([
          axios.get("/api/admin/stats"),
          axios.get("/api/admin/users"),
          axios.get("/api/admin/jobs"),
          axios.get("/api/admin/quotes"),
          axios.get("/api/admin/payments"),
        ]);

      setStats(statsRes.data || {});
      setUsers(usersRes.data || []);
      setJobs(jobsRes.data || []);
      setQuotes(quotesRes.data || []);
      setPayments(paymentsRes.data || []);
    } catch (err) {
      console.error("ADMIN LOAD ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ADMIN ACTIONS ================= */

  const suspendUser = async (id) => {
    await axios.put(`/api/admin/suspend/${id}`);
    loadDashboard();
  };

  const cancelJob = async (id) => {
    await axios.put(`/api/admin/cancel-job/${id}`);
    loadDashboard();
  };

  const removeQuote = async (id) => {
    await axios.delete(`/api/admin/delete-quote/${id}`);
    loadDashboard();
  };

  const freezePayment = async (id) => {
    await axios.put(`/api/admin/freeze-payment/${id}`);
    loadDashboard();
  };

  /* ================= LOADER ================= */

  if (loading) {
    return (
      <div style={loader}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          style={spinner}
        />
        <p>Loading Admin Console...</p>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div style={layout}>
      {/* MOBILE MENU BUTTON */}
      {isMobile && (
        <button style={mobileToggle} onClick={() => setMobileNav(!mobileNav)}>
          ☰
        </button>
      )}

      {/* SIDEBAR */}
      <aside
        style={{
          ...sidebar,
          transform: isMobile
            ? mobileNav
              ? "translateX(0)"
              : "translateX(-100%)"
            : "translateX(0)",
        }}
      >
        <h2 style={logo}>BuildTrust Admin</h2>

        <NavItem
          label="Overview"
          id="overview"
          section={section}
          setSection={setSection}
        />
        <NavItem
          label="Users"
          id="users"
          section={section}
          setSection={setSection}
        />
        <NavItem
          label="Jobs"
          id="jobs"
          section={section}
          setSection={setSection}
        />
        <NavItem
          label="Quotes"
          id="quotes"
          section={section}
          setSection={setSection}
        />
        <NavItem
          label="Payments"
          id="payments"
          section={section}
          setSection={setSection}
        />
      </aside>

      {/* MAIN CONTENT */}
      <main
        style={{
          ...main,
          marginLeft: isMobile ? "0" : "240px",
        }}
      >
        <div style={header}>
          <h1>Platform Command Center</h1>
          <div style={adminBadge}>Super Admin</div>
        </div>

        {/* OVERVIEW */}
        {section === "overview" && (
          <div style={statsGrid}>
            <Stat title="Users" value={stats?.users} />
            <Stat title="Freelancers" value={stats?.freelancers} />
            <Stat title="Jobs" value={stats?.jobs} />
            <Stat title="Revenue" value={`£${stats?.revenue || 0}`} />
          </div>
        )}

        {/* USERS */}
        {section === "users" && (
          <Table title="Platform Users">
            {users.map((u) => (
              <Row key={u._id}>
                <Cell>{u.name}</Cell>
                <Cell>{u.email}</Cell>
                <Cell>{u.role}</Cell>
                <Action danger onClick={() => suspendUser(u._id)}>
                  Suspend
                </Action>
              </Row>
            ))}
          </Table>
        )}

        {/* JOBS */}
        {section === "jobs" && (
          <Table title="All Jobs">
            {jobs.map((j) => (
              <Row key={j._id}>
                <Cell>{j.service}</Cell>
                <Cell>{j.location}</Cell>
                <Cell>{j.status}</Cell>
                <Action danger onClick={() => cancelJob(j._id)}>
                  Cancel
                </Action>
              </Row>
            ))}
          </Table>
        )}

        {/* QUOTES */}
        {section === "quotes" && (
          <Table title="Quotes">
            {quotes.map((q) => (
              <Row key={q._id}>
                <Cell>£{q.price}</Cell>
                <Cell>{q.message}</Cell>
                <Action danger onClick={() => removeQuote(q._id)}>
                  Delete
                </Action>
              </Row>
            ))}
          </Table>
        )}

        {/* PAYMENTS */}
        {section === "payments" && (
          <Table title="Payments">
            {payments.map((p) => (
              <Row key={p._id}>
                <Cell>£{p.amount}</Cell>
                <Cell>{p.status}</Cell>
                <Action danger onClick={() => freezePayment(p._id)}>
                  Freeze
                </Action>
              </Row>
            ))}
          </Table>
        )}
      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function NavItem({ label, id, section, setSection }) {
  return (
    <div
      onClick={() => setSection(id)}
      style={section === id ? activeNav : navItem}
    >
      {label}
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} style={statCard}>
      <h2>{value || 0}</h2>
      <p>{title}</p>
    </motion.div>
  );
}

function Table({ title, children }) {
  return (
    <div style={table}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

const Row = ({ children }) => <div style={row}>{children}</div>;

const Cell = ({ children }) => <div style={cell}>{children}</div>;

function Action({ children, danger, onClick }) {
  return (
    <button onClick={onClick} style={danger ? dangerBtn : actionBtn}>
      {children}
    </button>
  );
}

/* ================= STYLES ================= */

const layout = { display: "flex", minHeight: "100vh", background: "#F3F4F6" };

const sidebar = {
  width: "240px",
  background: "#111827",
  color: "#fff",
  padding: "25px",
  position: "fixed",
  top: 0,
  bottom: 0,
  transition: "0.3s",
  zIndex: 1000,
};

const main = {
  flex: 1,
  padding: "30px",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
  gap: "20px",
};

const table = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  marginTop: "20px",
};

const row = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
  gap: "10px",
  padding: "12px 0",
  borderBottom: "1px solid #eee",
};

const cell = { fontSize: "14px" };

const activeNav = {
  background: "#2563EB",
  color: "#fff",
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "10px",
  cursor: "pointer",
};

const navItem = {
  padding: "12px",
  marginBottom: "10px",
  cursor: "pointer",
  color: "#fff",
};

const statCard = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
};

const actionBtn = {
  background: "#0B5ED7",
  color: "#fff",
  padding: "6px 10px",
  border: "none",
  borderRadius: "6px",
};

const dangerBtn = {
  background: "#EF4444",
  color: "#fff",
  padding: "6px 10px",
  border: "none",
  borderRadius: "6px",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
};

const adminBadge = {
  background: "#0B5ED7",
  color: "#fff",
  padding: "6px 14px",
  borderRadius: "8px",
  fontWeight: "bold",
};

const logo = {
  fontWeight: "bold",
  fontSize: "22px",
  marginBottom: "30px",
};

const mobileToggle = {
  position: "fixed",
  top: "20px",
  left: "20px",
  zIndex: 1100,
  padding: "10px",
  borderRadius: "8px",
};

const loader = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

const spinner = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "4px solid #0B5ED7",
  borderTop: "4px solid transparent",
};
