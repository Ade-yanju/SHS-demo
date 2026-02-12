import { useParams } from "react-router-dom";
import { providers } from "../data/providers";

export default function ProviderProfile() {
  const { id } = useParams();

  const provider = providers.find((p) => p.id.toString() === id);

  if (!provider) return <p>Provider not found</p>;

  return (
    <div style={{ padding: "80px 40px" }}>
      <img src={provider.image} alt="" style={{ width: "400px", borderRadius: "10px" }} />

      <h1>{provider.name}</h1>
      <p>{provider.service}</p>
      <p>{provider.location}</p>
      <p>⭐ {provider.rating}</p>
      <p>{provider.price}</p>

      <button style={{
        background: "#16A34A",
        padding: "12px 20px",
        border: "none",
        color: "#fff",
        borderRadius: "8px"
      }}>
        Hire Contractor
      </button>
    </div>
  );
}
