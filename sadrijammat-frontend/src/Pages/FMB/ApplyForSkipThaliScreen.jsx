import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../network/apis";
import { dispatchToasterSuccess } from "../../utils/Shared";
import moment from "moment"; // Import moment

const ApplyForThaliSkipScreen = () => {
  const getTomorrowDate = () => {
    return moment().add(1, "day"); // Use moment to create the date
  };

  const [thaliNumber, setThaliNumber] = useState("");
  const [address, setAddress] = useState("");
  const [fromDate, setFromDate] = useState(getTomorrowDate());
  const [toDate, setToDate] = useState(getTomorrowDate());
  const navigate = useNavigate(); // For navigation

  // Handle the submit action for skipping the Thali
  const handleSkipSubmit = async () => {
    const data = {
      thaliNumber,
      address,
      fromDate: fromDate.toISOString().split("T")[0], // Convert moment to ISO string
      toDate: toDate.toISOString().split("T")[0], // Convert moment to ISO string
    };

    try {
      await axiosInstance.post("fmb/skipthali", data);
      dispatchToasterSuccess("Your Request Submitted Successfully");
      navigate(-1); // Go back to previous screen after successful submission
    } catch (error) {
      console.error("Error submitting thali skip request:", error);
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#FFF" }}>
      <Container maxWidth={"md"}>
        <Box
          sx={{
            backgroundColor: "#FEF7E6",
            padding: 3,
            borderRadius: 2,
            marginBottom: 3,
          }}
        >
          <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
            Skip Thali Request
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Thali Number *
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={thaliNumber}
            onChange={(e) => setThaliNumber(e.target.value)}
            placeholder="Enter Thali Number"
            type="number"
            sx={{ marginBottom: 2 }}
          />

          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Address
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Address"
            sx={{ marginBottom: 2 }}
          />

          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            From Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Stack spacing={3}>
              <DatePicker
                label="From Date"
                value={fromDate}
                minDate={moment()} 
                onChange={(date) => setFromDate(moment(date))} // Ensure the date is a valid moment object
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Stack>
          </LocalizationProvider>

          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            To Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Stack spacing={3}>
              <DatePicker
                label="To Date"
                value={toDate}
                minDate={fromDate} 
                onChange={(date) => setToDate(moment(date))} // Ensure the date is a valid moment object
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Stack>
          </LocalizationProvider>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSkipSubmit}
            sx={{ marginTop: 3 }}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ApplyForThaliSkipScreen;
