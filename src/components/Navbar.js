import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { FaBars } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  /* =========================
     ALWAYS SYNC ROLE
     (runs on route change + login)
  ========================== */

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, [location]); // ← KEY FIX

  /* =========================
     LOGOUT
  ========================== */

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");

    setRole(null);
    navigate("/login");
  };

  /* =========================
     DASHBOARD ROUTER
  ========================== */

  const goDashboard = () => {
    if (role === "hirer") navigate("/hirer-dashboard");
    else if (role === "freelancer") navigate("/freelancer-dashboard");
    else if (role === "admin") navigate("/admin");
  };

  /* =========================
     UI
  ========================== */

  return (
    <nav style={nav}>
      {/* LOGO */}
      <div style={logoBox} onClick={() => navigate("/")}>
        <img src={logo} alt="logo" style={{ height: "40px" }} />
        <h3>BuildTrust</h3>
      </div>

      {/* ================= DESKTOP ================= */}
      <div style={desktopMenu}>
        <Link to="/" style={link}>
          How it Works
        </Link>

        {/* FREELANCER ONLY */}
        {role === "freelancer" && (
          <Link to="/marketplace" style={link}>
            Marketplace
          </Link>
        )}

        {/* HIRER ONLY */}
        {role === "hirer" && (
          <Link to="/post-job">
            <button style={btn}>Post Job</button>
          </Link>
        )}

        {/* DASHBOARD */}
        {role && (
          <button style={dashboardBtn} onClick={goDashboard}>
            Dashboard
          </button>
        )}

        {/* ADMIN */}
        {role === "admin" && (
          <Link to="/admin" style={link}>
            Admin Panel
          </Link>
        )}

        {/* AUTH */}
        {!role && (
          <>
            <Link to="/login" style={link}>
              Login
            </Link>
            <Link to="/signup" style={link}>
              Sign Up
            </Link>
          </>
        )}

        {/* LOGOUT */}
        {role && (
          <button onClick={logout} style={logoutBtn}>
            Logout
          </button>
        )}
      </div>

      {/* ================= MOBILE ICON ================= */}
      <FaBars size={22} onClick={() => setOpen(!open)} style={menuIcon} />

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div style={mobileMenu}>
          <Link to="/">How it Works</Link>

          {role === "freelancer" && <Link to="/marketplace">Marketplace</Link>}
          {role === "hirer" && <Link to="/post-job">Post Job</Link>}

          {role && <button onClick={goDashboard}>Dashboard</button>}

          {role === "admin" && <Link to="/admin">Admin Panel</Link>}

          {!role && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}

          {role && <button onClick={logout}>Logout</button>}
        </div>
      )}
    </nav>
  );
}

/* =========================
   STYLES
========================= */

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 30px",
  background: "#fff",
  borderBottom: "1px solid #eee",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const logoBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
};

const desktopMenu = {
  display: "flex",
  gap: "25px",
  alignItems: "center",
};

const menuIcon = {
  cursor: "pointer",
};

const mobileMenu = {
  position: "absolute",
  top: "70px",
  right: "20px",
  background: "#fff",
  padding: "20px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const link = {
  textDecoration: "none",
  color: "#111827",
};

const btn = {
  background: "#0B5ED7",
  color: "#fff",
  padding: "10px 18px",
  border: "none",
  borderRadius: "8px",
};

const dashboardBtn = {
  background: "#16A34A",
  color: "#fff",
  padding: "10px 18px",
  border: "none",
  borderRadius: "8px",
};

const logoutBtn = {
  background: "#ef4444",
  color: "#fff",
  padding: "8px 14px",
  border: "none",
  borderRadius: "6px",
};
