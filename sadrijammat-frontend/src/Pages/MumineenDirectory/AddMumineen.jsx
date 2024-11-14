import React, { useState } from "react";
import {
  Box,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Typography,
  Container,
} from "@mui/material";
import axiosInstance from "../../network/apis";
import { dispatchToasterSuccess } from "../../utils/Shared";

const AddMumineenScreen = () => {
  const [name, setName] = useState("");
  const [its, setIts] = useState("");
  const [email, setEmail] = useState("");
  const [isHof, setIsHof] = useState(false);
  const [hof, setHof] = useState("");
  const [isMehman, setIsMehman] = useState(false);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [sector, setSector] = useState("");

  const handleSubmit = async () => {
    // Creating the data object to be sent to the API
    const mumineenData = {
      name,
      its: Number(its),
      email,
      is_hof: isHof,
      hof: isHof ? Number(its) : Number(hof),
      is_mehman: isMehman,
      address,
      contact,
      sector,
    };

    Object.keys(mumineenData).forEach((key) => {
      if (key !== "is_mehman" && key !== "is_hof" && mumineenData[key] === "") {
        delete mumineenData[key];
      }
    });

    try {
      await axiosInstance.post("user", mumineenData);
      dispatchToasterSuccess("Mumineen added successfully!");
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setName("");
    setIts("");
    setEmail("");
    setIsHof(false);
    setHof("");
    setIsMehman(false);
    setAddress("");
    setContact("");
    setSector("");
  };

  return (
    <Box>
      <Container maxWidth={"sm"}>
        <Box
          sx={{
            p: 3,
            bgcolor: "#FEF7E6",
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Add Mumineen
          </Typography>

          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="ITS"
            value={its}
            onChange={(e) => setIts(e.target.value)}
            type="number"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            margin="normal"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isMehman}
                onChange={() => setIsMehman(!isMehman)}
              />
            }
            label="Is Mehman?"
          />
          <FormControlLabel
            control={
              <Checkbox checked={isHof} onChange={() => setIsHof(!isHof)} />
            }
            label="Is Head of Family (HOF)?"
          />

          <TextField
            fullWidth
            label="HOF ITS"
            value={isHof ? its : hof}
            onChange={(e) => setHof(e.target.value)}
            type="number"
            margin="normal"
            disabled={isHof}
          />
          <TextField
            fullWidth
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            type="tel"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Sector"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
            fullWidth
          >
            Submit
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AddMumineenScreen;
