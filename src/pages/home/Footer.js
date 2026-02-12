export default function Footer() {
    return (
      <div
        style={{
          padding: "60px 40px",
          background: "#111827",
          color: "#fff"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px"
          }}
        >
          <div>
            <h3>BuildTrust</h3>
            <p style={{ fontSize: "14px", marginTop: "10px" }}>
              Connecting homeowners with trusted construction professionals.
            </p>
          </div>
  
          <div>
            <h4>Company</h4>
            <p>About</p>
            <p>Careers</p>
            <p>Press</p>
          </div>
  
          <div>
            <h4>Services</h4>
            <p>Plumbing</p>
            <p>Electrical</p>
            <p>Roofing</p>
          </div>
  
          <div>
            <h4>Support</h4>
            <p>Help Center</p>
            <p>Contact</p>
            <p>Safety</p>
          </div>
        </div>
  
        <p style={{ marginTop: "40px", fontSize: "13px", color: "#9CA3AF" }}>
          © 2026 BuildTrust UK. All rights reserved.
        </p>
      </div>
    );
  }
  