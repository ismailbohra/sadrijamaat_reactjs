import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../network/apis";
import { dispatchToasterSuccess } from "../../utils/Shared";

const FMBMenuScreen = () => {
  const [fmbMenus, setFmbMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const fetchFmbMenus = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/fmb/menu/");
      setFmbMenus(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    setOpenDialog(false);
    try {
      await axiosInstance.delete(`/fmb/menu/${selectedId}`);
      dispatchToasterSuccess("FMB menu deleted successfully");
      fetchFmbMenus();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFmbMenus();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" color="primary" sx={{ flexGrow: 1 }}>
            FMB Menu
          </Typography>
          <IconButton color="primary" onClick={() => navigate("add-menu")}>
            <Add />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 3 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {fmbMenus.length > 0 ? (
              fmbMenus.map((item) => (
                <ListItem
                  key={item._id}
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    border: "1px solid #ddd",
                    padding: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Date: {item.date}
                    </Typography>
                    <Typography variant="body2">
                      Occasion: {item.occasion}
                    </Typography>
                    <Typography variant="body2">Menu: {item.menu}</Typography>
                  </Box>
                  <IconButton
                    color="error"
                    onClick={() => confirmDelete(item._id)}
                  >
                    <Delete />
                  </IconButton>
                </ListItem>
              ))
            ) : (
              <Typography>No FMB menus found</Typography>
            )}
          </List>
        )}
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this FMB menu?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FMBMenuScreen;
