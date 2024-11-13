import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { dispatchToasterSuccess, dispatchToasterError } from '../../utils/Shared';
import axiosInstance from '../../network/apis';

const AddOption = () => {
  const { razaid, field_id } = useParams(); // Get razaid and field_id from params
  const [razaData, setRazaData] = useState(null);
  const [options, setOptions] = useState([]);
  const [optionLabel, setOptionLabel] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRazaData = async () => {
      try {
        const response = await axiosInstance.get(`raza/manageRaza/getraza/${razaid}`);
        setRazaData(response.data);
        
        const field = response.data.fields.find(field => field._id === field_id);
        if (field) {
          setOptions(field.options || []);
        }
      } catch (error) {
        dispatchToasterError("Failed to fetch data");
      }
    };
    fetchRazaData();
  }, [razaid, field_id]);

  const handleAddOption = () => {
    if (!optionLabel) {
      dispatchToasterError("Option label cannot be empty");
      return;
    }

    const newOption = { label: optionLabel, value: optionLabel };
    setOptions([...options, newOption]);
    setOptionLabel(''); // Clear input after adding
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, idx) => idx !== index);
    setOptions(updatedOptions);
  };

  const handleDone = async () => {
    if (!razaData) return;

    const updatedFields = razaData.fields.map(field => {
      if (field._id === field_id) {
        return { ...field, options };
      }
      return field;
    });

    const updatedRazaData = {
      id: razaData._id,
      data: { fields: updatedFields },
    };

    try {
      await axiosInstance.put('raza/manageRaza', updatedRazaData);
      dispatchToasterSuccess("Options updated successfully");
      navigate(-1); // Go back
    } catch (error) {
      dispatchToasterError("Failed to update options");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add Option
      </Typography>
      <TextField
        label="Enter option label"
        variant="outlined"
        fullWidth
        value={optionLabel}
        onChange={(e) => setOptionLabel(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleAddOption} fullWidth>
        Add Option
      </Button>

      <List sx={{ mt: 2 }}>
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" color="error" onClick={() => handleRemoveOption(index)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={option.label} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="success" fullWidth onClick={handleDone}>
          Done
        </Button>
      </Box>
    </Container>
  );
};

export default AddOption;
