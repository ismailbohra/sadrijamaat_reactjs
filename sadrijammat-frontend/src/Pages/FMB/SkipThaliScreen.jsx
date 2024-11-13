import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dispatchToasterSuccess } from "../../utils/Shared";
import axiosInstance from "../../network/apis";
import Auth from "../../utils/Auth";

const SkippedThaliScreen = () => {
  const [appliedThaliSkipped, setAppliedThaliSkipped] = useState([]);
  const navigate = useNavigate(); // For navigation (like 'ApplyForThaliSkip')

  // Fetch data from API
  const fetchData = async () => {
    const id = Auth.getUserId();
    try {
      const response = await axiosInstance.get(`fmb/skipthali/${id}`);
      setAppliedThaliSkipped(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete request
  const deleteReq = async (id) => {
    try {
      await axiosInstance.delete(`fmb/skipthali/${id}`);
      dispatchToasterSuccess("Deleted Successfully");
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  // Handle delete confirmation
  const handleDelete = (id) => {
    if (
      window.confirm(
        "Do you want to delete this request? Once deleted, it cannot be recovered."
      )
    ) {
      deleteReq(id);
    }
  };

  // Check if the date is in the future
  const checkDate = (date) => {
    const today = new Date();
    const fromDate = new Date(date);
    return fromDate > today;
  };

  return (
    <Box sx={{ marginTop: 5, marginBottom: 5 }}>
      <Container maxWidth={"md"}>
        <Card sx={{ padding: 2, backgroundColor: "#FEF7E6" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 3,
            }}
          >
            <Typography variant="h5">Skipped Thali</Typography>
            <Button
              variant="outlined"
              color="success"
              onClick={() => navigate("apply-skip")}
            >
              Apply for Skip
            </Button>
          </Box>

          <List>
            {appliedThaliSkipped.length === 0 ? (
              <Typography>No request has been created yet!</Typography>
            ) : (
              appliedThaliSkipped.map((item) => (
                <ListItem key={item._id} sx={{ marginBottom: 2 }}>
                  <Card
                    sx={{
                      width: "100%",
                      padding: 2,
                    }}
                  >
                    <CardContent>
                      <Typography variant="body1">
                        Thali Number: {item.thaliNumber}
                      </Typography>
                      <Typography variant="body2">
                        Address: {item.address}
                      </Typography>
                      <Typography variant="body2">
                        From: {item.fromDate}
                      </Typography>
                      <Typography variant="body2">To: {item.toDate}</Typography>

                      {checkDate(item.fromDate) && (
                        <IconButton
                          edge="end"
                          color="error"
                          onClick={() => handleDelete(item._id)}
                          sx={{ position: "absolute", top: 10, right: 30 }}
                        >
                          <CloseIcon />
                        </IconButton>
                      )}
                    </CardContent>
                  </Card>
                </ListItem>
              ))
            )}
          </List>
        </Card>
      </Container>
    </Box>
  );
};

export default SkippedThaliScreen;
