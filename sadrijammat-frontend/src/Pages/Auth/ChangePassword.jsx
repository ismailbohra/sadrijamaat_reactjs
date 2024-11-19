import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { dispatchToasterError, dispatchToasterSuccess } from "../../utils/Shared";
import axiosInstance from "../../network/apis";
import { useNavigate } from "react-router-dom";


// Styled Card
const CenteredCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  padding: theme.spacing(4),
  margin: "auto",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
  borderRadius: 10,
  textAlign: "center",
}));

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      dispatchToasterError("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await axiosInstance.post("user/changepassword", {
        oldpassword: oldPassword,
        newpassword: newPassword,
      });
      dispatchToasterSuccess(response.data.message || "Password changed successfully!");
      navigate(-1)
      
    } catch (error) {
      dispatchToasterError(
        error.response?.data?.message || "Failed to change password. Try again!"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 68px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <CenteredCard>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Change Password
        </Typography>

        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Old Password"
            name="oldPassword"
            type="password"
            value={formData.oldPassword}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="New Password"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{ mt: 3 }}
          >
            Submit
          </Button>
        </Box>
      </CenteredCard>
    </Box>
  );
};

export default ChangePassword;
