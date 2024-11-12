import React, { useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Select, MenuItem, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../network/apis';
import { dispatchToasterSuccess } from '../../utils/Shared';


const NewRazaType = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('EVENT_RAZA');
  const [isConflictedRaza, setIsConflictedRaza] = useState('no');
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const handleCreateRazaType = async () => {
    setDisable(true);
    const newRazaType = {
      name,
      type,
      isConflictedRaza: isConflictedRaza === 'yes',
    };

    try {
      await axiosInstance.post('/raza/manageRaza', newRazaType);
      dispatchToasterSuccess('New Raza Added');
      navigate(-1); // Go back to the previous screen
    } catch (error) {
      console.error('Failed to create raza type:', error);
      setDisable(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3, bgcolor: '#FEF7E6', borderRadius: 2, boxShadow: 1,marginTop:10 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Create New Raza Type
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter raza name"
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <FormLabel>Type</FormLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Select raza type' }}
        >
          <MenuItem value="EVENT_RAZA">EVENT_RAZA</MenuItem>
          <MenuItem value="UMOOR_RAZA">UMOOR_RAZA</MenuItem>
        </Select>
      </FormControl>

      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <FormLabel component="legend">Is Conflicted Raza</FormLabel>
        <RadioGroup
          row
          value={isConflictedRaza}
          onChange={(e) => setIsConflictedRaza(e.target.value)}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleCreateRazaType}
        disabled={disable}
        sx={{ mt: 2 }}
      >
        Create
      </Button>
    </Box>
  );
};

export default NewRazaType;
