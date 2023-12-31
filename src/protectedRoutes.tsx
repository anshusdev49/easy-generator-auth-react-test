import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useToken } from "./tokenContext";

interface ProtectedRoutesProps {
  children: ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const { token }: any = useToken();
  if (token) return <>{children}</>;
  else return <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
