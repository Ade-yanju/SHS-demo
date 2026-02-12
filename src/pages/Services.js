import { FaWrench, FaBolt, FaPaintRoller, FaHammer } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  const services = [
    { name: "Plumbing", icon: <FaWrench size={30} /> },
    { name: "Electrical", icon: <FaBolt size={30} /> },
    { name: "Painting", icon: <FaPaintRoller size={30} /> },
    { name: "Building", icon: <FaHammer size={30} /> },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h2>Select a Service</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {services.map((service) => (
          <div
            key={service.name}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/request")}
          >
            {service.icon}
            <h3>{service.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
