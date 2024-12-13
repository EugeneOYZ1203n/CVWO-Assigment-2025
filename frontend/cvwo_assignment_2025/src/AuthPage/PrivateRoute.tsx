import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{ children: JSX.Element; user_id: number | null; username: string }> = ({
  children,
  user_id, 
  username,
}) => {
  return username && user_id ? children : <Navigate to="/auth" replace />;
};

export default PrivateRoute;