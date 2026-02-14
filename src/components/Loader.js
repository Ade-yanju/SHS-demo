import logo from "../assets/logo.png";

export default function Loader() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "#fff",
      }}
    >
      <img src={logo} alt="logo" style={{ height: "60px" }} />

      <div
        style={{
          marginTop: "20px",
          width: "40px",
          height: "40px",
          border: "4px solid #0B5ED7",
          borderTop: "4px solid transparent",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
