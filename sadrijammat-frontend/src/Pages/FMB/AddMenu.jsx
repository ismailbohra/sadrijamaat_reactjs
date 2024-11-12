import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import {
  dispatchToasterError,
  dispatchToasterSuccess,
} from "../../utils/Shared";
import axiosInstance from "../../network/apis";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const AddNewMenuScreen = () => {
  const [date, setDate] = useState(null);
  const [occasion, setOccasion] = useState("Normal Day");
  const [menu, setMenu] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const createFmbMenu = async () => {
    try {
      await axiosInstance.post("fmb/menu/", {
        date: date?.toISOString().split("T")[0], // Format the date to YYYY-MM-DD
        occasion,
        menu,
      });
      dispatchToasterSuccess("FMB menu created successfully");
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        marginTop={4}
        marginBottom={4}
        textAlign={"center"}
        sx={{ color: "#8C5F2E" }}
      >
        Add New FMB Menu
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Date"
              sx={{width:'100%'}}
              value={date}
              onChange={(newDate) => setDate(newDate)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  required
                  size="small"
                  margin="normal"
                />
              )}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Enter Occasion"
            variant="outlined"
            fullWidth
            margin="normal"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Enter Menu"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={menu}
            onChange={(e) => setMenu(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={createFmbMenu}
          >
            Create FMB Menu
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddNewMenuScreen;
