import PropTypes from "prop-types";
import React, { Suspense, useEffect } from "react";
import { useLocation } from "react-router";
import { Route, Routes as ReactRouterRoutes, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Auth from "../utils/Auth";
import PrivateRoute from "../utils/PrivateRoutes";
import UserLogin from "../Pages/Auth/Auth";
import AppbarAndNAvabar from "../components/Navbar/Navbar";
import { verifyTokenReq } from "../redux/users/UserAction";
import applyRazaRoutes from "./ApplyRazaRoute";
import approveRazaRoute from "./ApproveRazaRoute";
import { bindActionCreators } from "redux";
import MainScreen from "../Pages/MainScreen";
import { connect } from "react-redux";
import { CREATE_FMB_MENU, FMB_MENU, SKIP_THALI } from "./FMBRoute";
import { ASSIGN_ROLE } from "./AssingRoleRoute";
import { MANAGE_ROLE } from "./ManageRole";

const Routes = (props) => {
  let userType = Auth.getRoles();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    userType = Auth.getRoles();
    if (!Auth.isAuth() && location.pathname !== "/auth") {
      Auth.signOut();
      navigate("/auth");
    }
  }, [location]);

  useEffect(() => {
    if (Auth.getToken() != null) {
      props.verifyTokenReq();
    }
  }, []);

  const Modules = [
    {
      routeName: 'APPLY_RAZA',
      routes: applyRazaRoutes,
    },
    {
      routeName: 'APPROVE_RAZA',
      routes: approveRazaRoute,
    },
    {
      routeName: 'FMB_MENU',
      routes: FMB_MENU,
    },
    {
      routeName: 'SKIP_THALI',
      routes: SKIP_THALI,
    },
    {
      routeName: 'CREATE_FMB_MENU',
      routes: CREATE_FMB_MENU,
    },
    {
      routeName: 'ASSIGN_ROLE',
      routes: ASSIGN_ROLE,
    },
    {
      routeName: 'MANAGE_ROLE',
      routes: MANAGE_ROLE,
    },
  ];

  return (
    <>
      <ReactRouterRoutes>
        <Route path="/" element={<AppbarAndNAvabar/>}>
          <Route index path="" element={<MainScreen />}/>
        </Route>
        <Route path="/Auth" element={<UserLogin />} />
        {Auth.isAuth() && (
          Modules.map((module) => (
            <Route path={module.routeName} element={<AppbarAndNAvabar />} key={module.routeName}>
              {module.routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <PrivateRoute>{<route.component />}</PrivateRoute>
                    </Suspense>
                  }
                >
                  {route.children?.length > 0 &&
                    route.children.map((childRoute) => (
                      <Route
                        index={childRoute.index}
                        key={childRoute.path}
                        path={childRoute.path}
                        element={
                          <Suspense fallback={<Loader />}>
                            <PrivateRoute>{<childRoute.component />}</PrivateRoute>
                          </Suspense>
                        }
                      />
                    ))}
                </Route>
              ))}
            </Route>
          ))
        )}
        <Route path="*" element={<UserLogin />} />
      </ReactRouterRoutes>
    </>
  );
};

Routes.propTypes = {
  verifyTokenReq: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  verifyTokenReq: bindActionCreators(verifyTokenReq, dispatch),
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
