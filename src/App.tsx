import Dashboard from "@components/Dashboard.tsx";
import { AuthProvider } from "@context/AuthContext.tsx";

function App() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}

export default App;
