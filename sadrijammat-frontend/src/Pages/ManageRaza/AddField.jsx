import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Box,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { dispatchToasterSuccess } from '../../utils/Shared';
import axiosInstance from '../../network/apis';


const AddField = () => {
  const { razaid } = useParams();
  const [fieldName, setFieldName] = useState('');
  const [fieldType, setFieldType] = useState('text'); // Default to 'text'
  const [isRequired, setIsRequired] = useState(false);
  const [razaData, setRazaData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`raza/manageRaza/getraza/${razaid}`);
        setRazaData(response.data);
      } catch (error) {
        console.error('Error fetching Raza data:', error);
      }
    };
    fetchData();
  }, [razaid]);

  const handleAddField = async () => {
    const newField = {
      name: fieldName,
      type: fieldType,
      is_required: isRequired,
      options: fieldType === 'select' ? [] : null,
    };

    const updatedData = {
      id: razaData._id,
      data: { fields: [...razaData.fields, newField] },
    };

    try {
      await axiosInstance.put('raza/manageRaza', updatedData);
      dispatchToasterSuccess('Success', 'New field added');
      navigate(-1); // Go back to previous page
    } catch (error) {
      console.error('Error updating fields:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add New Field
      </Typography>

      <TextField
        label="Field Name"
        variant="outlined"
        fullWidth
        value={fieldName}
        onChange={(e) => setFieldName(e.target.value)}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Field Type</InputLabel>
        <Select
          value={fieldType}
          label="Field Type"
          onChange={(e) => setFieldType(e.target.value)}
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="select">Select</MenuItem>
          <MenuItem value="number">Number</MenuItem>
          <MenuItem value="date">Date</MenuItem>
          {/* Add more field types as needed */}
        </Select>
      </FormControl>

      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel component="legend">Is Required?</FormLabel>
        <RadioGroup
          row
          value={isRequired ? 'yes' : 'no'}
          onChange={(e) => setIsRequired(e.target.value === 'yes')}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <Box mt={2}>
        <Button variant="contained" color="primary" fullWidth onClick={handleAddField}>
          Done
        </Button>
      </Box>
    </Container>
  );
};

export default AddField;
