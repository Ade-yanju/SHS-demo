import { useState } from "react";
import axios from "axios";

export default function RequestForm() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    service: "",
    description: "",
    contact: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    await axios.post(
      "https://shs-demo-backend.onrender.com/api/requests",
      form,
    );
    alert("Request submitted successfully");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Request a Service</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <br />
      <br />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <br />
      <br />
      <input
        name="service"
        placeholder="Service Needed"
        onChange={handleChange}
      />
      <br />
      <br />
      <input name="contact" placeholder="Contact" onChange={handleChange} />
      <br />
      <br />

      <textarea
        name="description"
        placeholder="Describe your issue"
        onChange={handleChange}
      ></textarea>
      <br />
      <br />

      <button onClick={submit}>Submit Request</button>
    </div>
  );
}
