import React from 'react';
import { Box, Card, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const ManageRazaCard = ({ data, onEdit, onClose }) => {
  return (
    <Card sx={{ backgroundColor: '#FEF7E6', p: 2, mb: 2, borderRadius: 2, boxShadow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
          {data.name}
        </Typography>
        <Box>
          <IconButton onClick={onEdit} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={onClose} color="error">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Typography variant="body1" color="textSecondary">
        {data.type}
      </Typography>
    </Card>
  );
};

export default ManageRazaCard;
