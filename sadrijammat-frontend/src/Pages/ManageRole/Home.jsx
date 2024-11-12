import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Container, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../network/apis';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false); // State to control loading spinner

  const navigate = useNavigate();

  // Fetch all roles
  const fetchRoles = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axiosInstance.get('/roles');
      setRoles(response.data); // Store roles in state
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchRoles(); // Fetch roles on component mount
  }, []);

  // Navigate to Modify Routes screen
  const handleRoleClick = (role) => {
    navigate('modify-route', { state: { role } });
  };

  // Navigate to Add Role screen
  const handleAddRole = () => {
    navigate('new-role');
  };

  return (
    <Box sx={{ padding: 2 }} justifyContent={"center"}>
      <Container maxWidth={"md"}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5" sx={{color:'#8C5F2E'}}>
          Manage Role
        </Typography>
        <IconButton color="primary" onClick={handleAddRole} sx={{color:'#8C5F2E'}}>
          <Add />
        </IconButton>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {roles.map((role) => (
            <ListItem
              key={role._id}
              onClick={() => handleRoleClick(role)}
              button
              sx={{
                mb: 1,
                border: 1,
                borderColor: '#8C5F2E',
                borderRadius: 1,
                backgroundColor: '#FEF7E6',
              }}
            >
              <ListItemText
                primary={role.name}
                primaryTypographyProps={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#8C5F2E',
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
      </Container>
    </Box>
  );
};

export default RoleManagement;
