/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useLocation } from "react-router-dom";

const AdminRouter = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const waitBeforeRedirect = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(waitBeforeRedirect);
  }, []);

  useEffect(() => {
    if (user === null) {
      console.log("Waiting for user...");
    } else if (user !== null) {
      console.log("User is logged in:", user);
    } else {
      console.log("Redirecting to /signIn");
    }
  }, [user]);

  if (loading) {
    return <div className="loading-animation">Loading...</div>;
  }

  console.log(user);
  if (user && user.role === "admin") {
    return children;
  } else {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }
};

export default AdminRouter;
