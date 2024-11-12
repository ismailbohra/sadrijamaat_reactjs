import React, { useState } from "react";
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
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../network/apis";

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

const NewRole = () => {
  const [roleName, setRoleName] = useState("");
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const navigate = useNavigate();

  const toggleRoute = (route) => {
    setSelectedRoutes((prev) =>
      prev.includes(route) ? prev.filter((r) => r !== route) : [...prev, route]
    );
  };

  const handleSubmit = async () => {
    if (!roleName.trim()) {
      alert("Role name cannot be empty");
      return;
    }

    try {
      await axiosInstance.post("/roles", {
        name: roleName,
        routes: selectedRoutes,
      });
      alert("Role added successfully");
      navigate(-1); // Navigate back to the roles screen
    } catch (error) {
      console.error("Error adding role:", error);
      alert("Error adding role, please try again.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ paddingY: 5 }}>
      <Card sx={{ padding: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Add New Role
          </Typography>
          <TextField
            fullWidth
            label="Role Name"
            variant="outlined"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            sx={{ mb: 3 }}
          />
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
            Add Role
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewRole;
