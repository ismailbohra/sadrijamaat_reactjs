import React from "react";
import { Button, TextField, Grid, Typography, Link } from "@mui/material";

const ForgotPasswordForm = ({ toggleForm }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Dispatch forgot password action with form data
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Email" type="email" fullWidth required />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send Reset Link
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center">
            Remember your password?{" "}
            <Link onClick={() => toggleForm(0)}>Sign In</Link>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};

export default ForgotPasswordForm;
