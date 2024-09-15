import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
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

  if (user) {
    return children;
  } else {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }
};

export default PrivateRouter;
