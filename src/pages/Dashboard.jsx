import { useNavigate } from "react-router-dom";
import { clearToken } from "../auth/token";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard</h2>
      <button
        onClick={() => {
          clearToken();
          navigate("/login");
        }}
      >
        logout
      </button>
    </div>
  );
}