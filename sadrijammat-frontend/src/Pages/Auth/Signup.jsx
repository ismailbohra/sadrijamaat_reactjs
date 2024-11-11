import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const SignupForm = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    its: "",
    hof: "",
    ishof: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      hof: prevState.ishof ? prevState.its : prevState.hof,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      ishof: checked,
      hof: checked ? prevState.its : "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Dispatch signup action with form data
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            type="text"
            name="name"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            type="email"
            name="email"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="ITS"
            type="text"
            name="its"
            fullWidth
            required
            value={formData.its}
            onChange={handleChange}
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.ishof}
                onChange={handleCheckboxChange}
                name="ishof"
                size="small"
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="HOF"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="HOF ITS"
            type="text"
            name="hof"
            fullWidth
            required
            value={formData.hof}
            onChange={handleChange}
            size="small"
            disabled={formData.ishof}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Signup
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center">
            Already have an account?{" "}
            <Link onClick={() => toggleForm(0)}>Sign In</Link>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignupForm;
