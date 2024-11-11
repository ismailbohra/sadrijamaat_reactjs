import PropTypes from "prop-types";
import React from "react";
import { Navigate } from "react-router-dom";
import Auth from "./Auth";
import MiniDrawer from "../components/Navbar/Navbar";

const PublicRoute = ({ children }) => {
  return <>{children}</>;
};

PublicRoute.propTypes = {
  children: PropTypes.object,
};

export default PublicRoute;
