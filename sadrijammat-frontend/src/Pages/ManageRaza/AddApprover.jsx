import {
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Container,
  FormControlLabel,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../network/apis";
import { dispatchToasterSuccess } from "../../utils/Shared";
import { useParams, useNavigate } from "react-router-dom";

const AddApprover = () => {
  const { razaid } = useParams(); // Extract razaid from route params
  const [roles, setRoles] = useState([]); // All available roles
  const [selectedApprovers, setSelectedApprovers] = useState([]); // Selected approvers (from approvalStatus)
  const [razaData, setRazaData] = useState(null); // To store raza data for pre-selecting approvers

  const navigate = useNavigate(); // Use useNavigate hook from react-router-dom

  // Fetch roles and razaData on mount
  useEffect(() => {
    const fetchRolesAndRazaData = async () => {
      try {
        // Fetch roles for selection
        const rolesResponse = await axiosInstance.get("/roles"); // Fetch available roles
        setRoles(rolesResponse.data); // Assuming roles come in 'data' field

        // Fetch raza data, including current approvers
        const razaResponse = await axiosInstance.get(`/raza/manageRaza/getraza/${razaid}`);
        setRazaData(razaResponse.data); // Store raza data (including approval_status)

        // If razaData exists, pre-select approvers based on current approval_status
        if (razaResponse.data && razaResponse.data.approval_status) {
          setSelectedApprovers(razaResponse.data.approval_status); // Set selected approvers
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchRolesAndRazaData();
  }, [razaid]);

  // Toggle selection of approver
  const handleToggleApprover = (roleName) => {
    setSelectedApprovers(
      (prev) =>
        prev.includes(roleName)
          ? prev.filter((approver) => approver !== roleName) // Remove the approver
          : [...prev, roleName] // Add the approver
    );
  };

  // Submit updated approvers
  const handleSubmit = async () => {
    try {
      await axiosInstance.put(`/raza/manageRaza`, {
        id: razaid,
        data: {
          approval_status: selectedApprovers,
        },
      });
      dispatchToasterSuccess(
        "success",
        "Updated",
        "Approver List Updated",
        2000
      ); // Show success toast
      navigate(-1); // Go back after successful submission (using navigate for React Router v6)
    } catch (error) {
      console.error("Error updating approvers:", error);
    }
  };

  return (
    <Box mt={5} mb={5} sx={{ display: "flex", justifyContent: "center" }}>
      <Container maxWidth="md">
        <Card>
          {/* CardHeader updated with background and text color */}
          <CardHeader
            sx={{
              backgroundColor: "#FEF7E6", // Background color for visibility
              color: "#AD7E05", // Text color
            }}
            title={<Typography variant="h6">Select Approvers</Typography>}
            action={
              <Button sx={{ color: "#AD7E05" }} variant="outlined" onClick={handleSubmit}>
                Save
              </Button>
            }
          />
          <Box sx={{ padding: "20px" }}>
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
              Select Roles to Add as Approvers
            </Typography>
            <List>
              {roles.map((role) => (
                <ListItem key={role._id} sx={{ marginBottom: "10px" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedApprovers.includes(role.name)} // Pre-check the checkboxes based on selectedApprovers
                        onChange={() => handleToggleApprover(role.name)}
                        name={role.name}
                        color="primary"
                      />
                    }
                    label={role.name}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default AddApprover;
