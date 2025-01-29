import { useAuth } from "@context/AuthContext.tsx";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: Readonly<PropsWithChildren>) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
