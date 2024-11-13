import DashboardIcon from "@mui/icons-material/Dashboard";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../network/apis";
import Auth from "../utils/Auth";

import foodImage from "../assets/MainScreenIcon/food.png";
import foodMenu from "../assets/MainScreenIcon/food-menu.png";
import Announcement from "../assets/MainScreenIcon/announcement.png";
import Addpeople from "../assets/MainScreenIcon/addpeople.png";
import Approve from "../assets/MainScreenIcon/approve.png";
import myraza from "../assets/MainScreenIcon/myraza.png";
import assignrole from "../assets/MainScreenIcon/assignrole.png";
import manageRole from "../assets/MainScreenIcon/managerole.png";
import addmenu from "../assets/MainScreenIcon/addmenu.png";
import checkthali from "../assets/MainScreenIcon/checkThali.png";
import manageRaza from "../assets/MainScreenIcon/manageRaza.png";
import users from "../assets/MainScreenIcon/users.png";
import allraza from "../assets/MainScreenIcon/allraza.png";
import { CalendarMonth } from "@mui/icons-material";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getMumineenByIdReq } from "../redux/Mumineen/MumineenAction";

export const Dashboard = (props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [categorizedRoutes, setCategorizedRoutes] = useState({});

  const colors = [
    "rgb(142, 68, 173)",
    "rgb(243, 156, 18)",
    "rgb(135, 0, 0)",
    "rgb(211, 84, 0)",
    "rgb(0, 106, 63)",
    "rgb(192, 57, 43)",
    "rgb(39, 174, 96)",
    "rgb(41, 128, 185)",
  ];

  const roleTitle = {
    APPROVE_RAZA: { name: "Approve Raza", img: Approve },
    ADD_MUMINEEN: { name: "Add Mumineen", img: Addpeople },
    CREATE_FMB_MENU: { name: "Create FMB Menu", img: addmenu },
    OVERALL_RAZA: { name: "All Raza", img: allraza },
    WAJEBAAT_APPOINTMENT: {
      name: "Wajebaat Appointment",
      icon: <CalendarMonth />,
    },
    // MUMINEEN_DIRECTORY: { name: "Mumineen Directory", img: users },
    APPLY_RAZA: { name: "My Raza", img: myraza },
    FMB_MENU: { name: "FMB Menu", img: foodMenu },
    EVENT_RSVP: { name: "Event RSVP", icon: <CalendarMonth /> },
    // CHECK_THALI: { name: "Check Thali", img: checkthali },
    ASSIGN_ROLE: { name: "Assign Role", img: assignrole },
    MANAGE_ROLE: { name: "Manage Role", img: manageRole },
    MANAGE_RAZA: { name: "Manage Raza", img: manageRaza },
    // SKIP_THALI: { name: "Skip Thali", img: foodImage },
    ANNOUNCEMENT: { name: "Announcement", img: Announcement },
  };

  const fetchRoles = async () => {
    try {
      const response = await axiosInstance.get("roles");
      const userId = Auth.getUserId();
      const userResponse = await axiosInstance.get(
        "/user/getUserbyid/" + userId
      );
      const userData = userResponse.data;
      const roleData = response.data;
      const userRoles = roleData.filter((role) =>
        userData.role.includes(role.name)
      );
      const categorized = userRoles.reduce((acc, role) => {
        acc[role.name] = role.routes;
        return acc;
      }, {});

      setUser(userData);
      setCategorizedRoutes(categorized);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
    const userId = Auth.getUserId();
    props.getUser(userId,()=>{})
  }, []);

  const handlenavigate = (route, category) => {
    if (!route == "APPROVE_RAZA") {
      navigate(route);
    } else {
      navigate(route, { state: { approver: category } });
    }
  };

  let count = 0;
  return (
    <Container sx={{ paddingTop: 5 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontSize: 30,
          color: "#ad7e05",
          fontWeight: "600",
          fontFamily: "cursive",
          marginBottom: 10,
        }}
      >
        Welcome to Anjuman-e-Saifee Sadri-Sagheer
      </Typography>
      {Object.keys(categorizedRoutes).map((category, catIndex) => (
        <div key={catIndex} style={{ marginBottom: 40 }}>
          <Typography
            variant="h5"
            gutterBottom
            style={{
              fontSize: 24,
              color: "#ad7e05",
              fontWeight: "600",
            }}
          >
            {category}
          </Typography>
          <Grid container spacing={3}>
            {categorizedRoutes[category].map((route, routeIndex) =>
              roleTitle[route] ? (
                <Grid item xs={6} sm={3} md={2.5} key={routeIndex}>
                  <Card
                    sx={{
                      backgroundColor: colors[count++ % colors.length],
                      height: 150,
                      cursor: "pointer",
                      transition: "box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                    onClick={() => handlenavigate(route, category)}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        color: "#fff",
                      }}
                    >
                      {roleTitle[route]?.img ? (
                        <img
                          src={roleTitle[route].img}
                          alt={roleTitle[route].name}
                          style={{ width: 50, height: 50, filter: "invert(1)" }}
                        />
                      ) : roleTitle[route]?.icon ? (
                        roleTitle[route].icon
                      ) : (
                        <DashboardIcon sx={{ fontSize: 50, color: "white" }} />
                      )}
                      <Typography variant="body1" sx={{ marginTop: 1 }}>
                        {roleTitle[route]?.name || route}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ) : null
            )}
          </Grid>
        </div>
      ))}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  // map necessary state
});

const mapDispatchToProps = (dispatch) => ({
  getUser: bindActionCreators(getMumineenByIdReq, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
