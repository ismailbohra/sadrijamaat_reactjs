import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../network/apis";
import { dispatchToasterSuccess } from "../../utils/Shared";

const AddToRole = () => {
  const { state } = useLocation();
  const { roleName } = state || {}; // Get the role name passed via navigation
  const navigate = useNavigate();

  const [users, setUsers] = useState([]); // All users fetched from search
  const [selectedUsers, setSelectedUsers] = useState([]); // Users selected to add to role
  const [existingRoleUsers, setExistingRoleUsers] = useState([]); // Users who already have the role
  const [searchTerm, setSearchTerm] = useState(""); // For searching users

  // Fetch users by search term
  const fetchUsersBySearch = async () => {
    try {
      const isNumeric = !isNaN(searchTerm);
      let query = "";
      if (isNumeric) {
        query = "?its=" + searchTerm;
      } else {
        query = "?name=" + searchTerm;
      }
      const response = await axiosInstance.get(`user/search` + query);
      setUsers(response.data); // Assuming search results in 'data'
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  // Fetch users who already have the role
  const fetchExistingRoleUsers = async () => {
    try {
      const response = await axiosInstance.get(`/user/search?role=${roleName}`);
      setExistingRoleUsers(response.data.map((user) => user._id)); // Store user IDs
    } catch (error) {
      console.log("Error fetching existing role users:", error);
    }
  };

  // Fetch existing role users on mount
  useEffect(() => {
    fetchExistingRoleUsers();
  }, [roleName]);

  // Toggle user selection
  const handleToggleUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    } else {
      setSelectedUsers((prev) => [...prev, userId]);
    }
  };

  // Submit selected users to the role
  const handleSubmit = async () => {
    try {
      await axiosInstance.post(`/user/assignRole`, {
        rolename: roleName,
        userids: selectedUsers,
      });
      dispatchToasterSuccess(`New User Added to ${roleName}`);
      navigate(-1); // Go back after successful submission
    } catch (error) {
      console.log("Error adding users to role:", error);
    }
  };

  // Render user with checkbox
  const renderUser = (user) => {
    const isSelected = selectedUsers.includes(user._id);
    const alreadyInRole = existingRoleUsers.includes(user._id);

    return (
      <Grid container alignItems="center" spacing={2} key={user._id}>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={isSelected || alreadyInRole}
                onChange={() => !alreadyInRole && handleToggleUser(user._id)}
                disabled={alreadyInRole} // Disable if the user is already in the role
              />
            }
            label={`${user.name} (${user.its})`}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <Box
      sx={{ height: "calc(100vh - 68px)", paddingBottom:5 }}
      justifyContent={"center"}
    >
      <Container maxWidth={"md"}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add to {roleName}
        </Typography>

        <TextField
          label="Search by Name or ITS"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchUsersBySearch()}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={fetchUsersBySearch}
          sx={{ mb: 4 }}
        >
          Search
        </Button>

        <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
          {users.map((user) => renderUser(user))}
        </Box>

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleSubmit}
          disabled={selectedUsers.length === 0}
          sx={{ mt: 4 }}
        >
          Assign Users to {roleName}
        </Button>
      </Container>
    </Box>
  );
};

export default AddToRole;
