import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ManageRazaCard from "./manageRazaCard";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../network/apis";

const ManageRaza = () => {
  const [raza, setRaza] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const resp = await axiosInstance.get("/raza/manageRaza/getall");
      setRaza(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (razaId) => {
    navigate(`/manageRazaModify/${razaId}`);
  };

  const deleteRaza = async (razaId) => {
    try {
      await axiosInstance.delete(`/raza/manageRaza/${razaId}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (razaId, razaName) => {
    const confirmed = window.confirm(
      `Do you want to delete this Raza (${razaName})? Once deleted, it cannot be recovered.`
    );
    if (confirmed) {
      deleteRaza(razaId);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <Card
        variant="outlined"
        sx={{
          mb: 3,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#FEF7E6",
        }}
      >
        <Typography variant="h5" sx={{color: '#333'}}>
          Manage Raza
        </Typography>
        <IconButton
          color="primary"
          onClick={() => navigate("createNewRazaType")}
          sx={{color: '#333'}}
        >
          <AddIcon />
        </IconButton>
      </Card>
      {raza.map((item) => (
        <ManageRazaCard
          key={item._id}
          data={item}
          onEdit={() => handleEdit(item._id)}
          onClose={() => handleDelete(item._id, item.name)}
        />
      ))}
    </Container>
  );
};

export default ManageRaza;
