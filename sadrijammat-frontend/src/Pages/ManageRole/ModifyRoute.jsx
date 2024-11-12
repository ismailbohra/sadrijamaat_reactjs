import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../network/apis";
import { dispatchToasterSuccess } from "../../utils/Shared";

const predefinedRoutes = [
  "APPROVE_RAZA",
  "ADD_MUMINEEN",
  "CREATE_FMB_MENU",
  "OVERALL_RAZA",
  "MUMINEEN_DIRECTORY",
  "APPLY_RAZA",
  "FMB_MENU",
  "EVENT_RSVP",
  "CHECK_THALI",
  "ASSIGN_ROLE",
  "MANAGE_ROLE",
  "MANAGE_RAZA",
  "SKIP_THALI",
  "ANNOUNCEMENT",
];

const ModifyRoutes = () => {
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { role } = state || {};


  // Initialize selected routes based on the current role
  useEffect(() => {
    setSelectedRoutes(role.routes);
  }, [role]);

  // Toggle route selection
  const toggleRoute = (route) => {
    setSelectedRoutes((prev) =>
      prev.includes(route) ? prev.filter((r) => r !== route) : [...prev, route]
    );
  };

  // Submit updated routes for the role
  const handleSubmit = async () => {
    try {
      await axiosInstance.put(`/roles/${role._id}`, { routes: selectedRoutes });
      dispatchToasterSuccess("Role updated successfully");
      navigate(-1); // Navigate back to the previous screen
    } catch (error) {
      console.error("Error updating roles:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ paddingY: 5 }}>
      <Card sx={{ padding: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Modify Routes for {role.name}
          </Typography>
          <Typography variant="subtitle1" mb={2}>
            Select Routes:
          </Typography>
          <List>
            {predefinedRoutes.map((route) => (
              <ListItem key={route} disablePadding>
                <Checkbox
                  checked={selectedRoutes.includes(route)}
                  onChange={() => toggleRoute(route)}
                  color="primary"
                />
                <ListItemText primary={route} />
              </ListItem>
            ))}
          </List>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 3 }}
          >
            Update Role
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ModifyRoutes;
