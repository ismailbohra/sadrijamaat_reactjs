import React, { useEffect, useState } from "react";
import { Box, Button, Container, TextField, CircularProgress, Typography } from "@mui/material";
import DataTable from "react-data-table-component";
import axiosInstance from "../../network/apis";

const MumineenDirectoryScreen = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch all users
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("user/getalluser/");
      setUsers(response.data.users); // Assuming the API returns an array of users
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch users based on search
  const searchUsers = async () => {
    if (searchTerm.trim() === "") {
      fetchAllUsers(); // If search term is empty, fetch all users
      return;
    }

    setLoading(true);
    try {
      const isNumeric = !isNaN(searchTerm);
      let query = isNumeric ? `?its=${searchTerm}` : `?name=${searchTerm}`;
      const response = await axiosInstance.get(`user/search${query}`);
      setUsers(response.data); // Assuming the API returns an array of users
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers(); // Fetch all users on component mount
  }, []);

  // Define columns for DataTable
  const columns = [
    { name: "Name", selector: row => row.name, sortable: true, wrap: true },
    { name: "ITS", selector: row => row.its, sortable: true, width: "90px" },
    { name: "Email", selector: row => row.email, sortable: true, wrap: true },
    { name: "Contact", selector: row => row.contact, sortable: true, width: "150px" },
    { name: "HOF", selector: row => (row.is_hof ? "Yes" : "No"), sortable: true, width: "80px" },
    { name: "HOF ITS", selector: row => row.hof, sortable: true, width: "100px" },
    { name: "Address", selector: row => row.address, sortable: false, wrap: true },
    { name: "Mehman", selector: row => (row.is_mehman ? "Yes" : "No"), sortable: true, width: "100px" },
  ];

  return (
    <Box padding={2}>
      <Box sx={{ mt: 4, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by Name or ITS"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && searchUsers()} // Trigger search on Enter key press
          sx={{ mb: 3 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={searchUsers}
          sx={{ mb: 3 }}
          disabled={loading}
        >
          Search
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataTable
          columns={columns}
          data={users}
          pagination
          responsive
          highlightOnHover
          noDataComponent={<Typography variant="body1">No users found</Typography>}
          customStyles={{
            tableWrapper: { style: { overflowX: "auto" } }, // Responsive scroll
            rows: { style: { minHeight: "72px" } },
            headCells: {
              style: { backgroundColor: "#FEF7E6", fontWeight: "bold" },
            },
            cells: {
              style: {
                padding: "8px 12px",
                whiteSpace: "pre-wrap",  // Allows wrapping
                overflowWrap: "break-word", // Breaks long words if needed
                maxWidth: "200px", // Set max width for wrapping
              },
            },
          }}
        />
      )}
    </Box>
  );
};

export default MumineenDirectoryScreen;
