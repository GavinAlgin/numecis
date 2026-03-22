import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { JSX } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { session, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!session) return <Navigate to="/login" replace />;

  return children;
}