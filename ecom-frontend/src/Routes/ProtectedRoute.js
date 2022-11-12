import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const {user} = useSelector(
    (state) => state.userLogin
  );
  // console.log(loading, user, isAuthenticated);
  return <>{user === null ? <Navigate to="/login" /> : children}</>;
}

export default ProtectedRoute;
