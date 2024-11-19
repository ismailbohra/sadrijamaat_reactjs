import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axiosInstance from "../../network/apis";
import {
  dispatchToasterSuccess
} from "../../utils/Shared";

const ForgotPasswordForm = ({ toggleForm }) => {
  const [its, setits] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const resp = await axiosInstance.post(`user/forgotpassword`, {
        its,
      });
      console.log(resp)
      dispatchToasterSuccess(resp.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="ITS"
            type="number"
            fullWidth
            required
            value={its}
            onChange={(e) => setits(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
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
