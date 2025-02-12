import React from "react";

import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Jakob/my-app/src/store/store.ts";

interface PrivateRouteProps {
  // isAuthenticated: boolean;
  redirectTo?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  // isAuthenticated,
  redirectTo = "/login",
}) => {
  const user = useSelector((state: RootState) => state.user);

  if (!user.firstFetch) return <></>;
  return user.isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
