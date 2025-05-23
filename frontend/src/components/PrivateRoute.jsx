import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, adminOnly = false, superAdminOnly = false }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser) return <Navigate to="/" />;

  if (adminOnly && !currentUser.data.isAdmin) return <Navigate to="/" />;

  if (superAdminOnly && !currentUser.data.isSuperAdmin) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
