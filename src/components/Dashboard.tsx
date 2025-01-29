import Login from "@components/Login.tsx";
import Phishing from "@components/Phishing.tsx";
import { useAuth } from "@context/AuthContext.tsx";

function Dashboard() {
  const { user } = useAuth();

  if (user) {
    return <Phishing />;
  } else {
    return <Login />;
  }
}

export default Dashboard;
