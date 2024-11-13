import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../network/apis";

const EditField = () => {
  const { razaid, fieldId } = useParams(); // assuming fieldId is passed via route params
  const navigate = useNavigate();
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("text");
  const [isRequired, setIsRequired] = useState(false);
  const [razaData, setRazaData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        `raza/manageRaza/getraza/${razaid}`
      );
      const field = response.data.fields.find((f) => f._id === fieldId);
      setRazaData(response.data);
      setFieldName(field?.name || "");
      setFieldType(field?.type || "text");
      setIsRequired(field?.is_required || false);
    };
    fetchData();
  }, [razaid, fieldId]);

  const handleSaveField = async () => {
    const updatedFields = razaData.fields.map((f) =>
      f._id === fieldId
        ? {
            ...f,
            name: fieldName,
            type: fieldType,
            is_required: isRequired,
            options: fieldType == "select" ? [] : null,
          }
        : f
    );

    try {
      await axiosInstance.put(`raza/manageRaza`, {
        id: razaid,
        data: { ...razaData, fields: updatedFields },
      });
      navigate(-1); // navigate back
    } catch (error) {
      console.error("Failed to update field:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ padding: 4, marginTop: 3 }}>
        <Typography variant="h6" gutterBottom>
          Edit Field
        </Typography>

        <TextField
          fullWidth
          label="Field Name"
          variant="outlined"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
          <InputLabel>Field Type</InputLabel>
          <Select
            label="Field Type"
            value={fieldType}
            onChange={(e) => setFieldType(e.target.value)}
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="select">Select</MenuItem>
            <MenuItem value="number">Number</MenuItem>
            <MenuItem value="date">Date</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Is Required:
        </Typography>
        <RadioGroup
          row
          value={isRequired}
          onChange={(e) => setIsRequired(e.target.value === "true")}
        >
          <FormControlLabel
            value={true}
            control={<Radio color="primary" />}
            label="Yes"
          />
          <FormControlLabel
            value={false}
            control={<Radio color="primary" />}
            label="No"
          />
        </RadioGroup>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSaveField}
          sx={{ marginTop: 3 }}
        >
          Save Changes
        </Button>
      </Paper>
    </Container>
  );
};

export default EditField;
