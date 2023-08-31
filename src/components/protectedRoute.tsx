import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

type Props = { children: ReactNode };

export default function ProtectedRoute({ children }: Props) {
  const { user } = UserAuth();
  if (!user.email) {
    return <Navigate to="/" />;
  } else {
  
    return children;
  }
}
