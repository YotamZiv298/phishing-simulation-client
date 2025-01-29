import { useAuth } from "@context/AuthContext.tsx";
import { Link } from "react-router-dom";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav
      // TODO: Move to css file
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {user ? (
        <>
          <Link to="/phishing">Phishing Simulation</Link>
          <button onClick={logout}>Logout</button>
          <span>Hello {user}</span>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
