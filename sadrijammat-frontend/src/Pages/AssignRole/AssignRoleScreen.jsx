import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../network/apis";

const AssignRole = () => {
  const [roles, setRoles] = useState([]);
  const [roleUsers, setRoleUsers] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  // Fetch all roles and their users on component mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get("/roles");
        const tempRolesData = response.data;
        const filteredRoles = tempRolesData.filter((role) => role.name !== "MUMINEEN");
        setRoles(filteredRoles);

        // Fetch users for each role
        filteredRoles.forEach((role) => fetchUsersForRole(role.name));
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  // Fetch users for a specific role
  const fetchUsersForRole = async (roleName) => {
    try {
      const response = await axiosInstance.get(`/user/search?role=${roleName}`);
      setRoleUsers((prev) => ({ ...prev, [roleName]: response.data }));
    } catch (error) {
      console.error(`Error fetching users for role ${roleName}:`, error);
    }
  };

  // Remove user from role and refetch users for that role
  const handleRemoveUser = async () => {
    if (selectedUser && selectedRole) {
      try {
        await axiosInstance.delete(
          `/user/removeRole?userid=${selectedUser._id}&rolename=${selectedRole}`
        );
        fetchUsersForRole(selectedRole);
        handleCloseDialog();
      } catch (error) {
        console.error("Error removing user:", error);
      }
    }
  };

  // Open dialog and set selected user and role
  const handleOpenDialog = (user, roleName) => {
    setSelectedUser(user);
    setSelectedRole(roleName);
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setSelectedRole(null);
  };

  // Render user list item
  const renderUser = (user, roleName) => (
    <ListItem
      key={user._id}
      secondaryAction={
        <IconButton edge="end" color="error" onClick={() => handleOpenDialog(user, roleName)}>
          <CloseIcon />
        </IconButton>
      }
    >
      <ListItemText primary={`${user.name} (${user.its})`} />
    </ListItem>
  );

  // Render role card with associated users
  const renderRoleCard = (role) => {
    const users = roleUsers[role.name] || [];

    return (
      <Card key={role._id} sx={{ mb: 2, backgroundColor: "#FEF7E6" }}>
        <CardHeader
          title={<Typography variant="h6">{role.name}</Typography>}
          action={
            <IconButton color="primary" onClick={() => navigate("add-to-role", { state: { roleName: role.name } })}>
              <AddIcon />
            </IconButton>
          }
        />
        <CardContent>
          <List dense>
            {users.length > 0 ? (
              users.map((user) => renderUser(user, role.name))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No users found.
              </Typography>
            )}
          </List>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {roles.map((role) => renderRoleCard(role))}

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove {selectedUser?.name} from the role {selectedRole}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemoveUser} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AssignRole;
