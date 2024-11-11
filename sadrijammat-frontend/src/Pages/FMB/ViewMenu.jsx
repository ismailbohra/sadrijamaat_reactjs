import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from "@mui/material";
import menuImage from "../../assets/MainScreenIcon/food-menu.png";
import axiosInstance from "../../network/apis";


const ViewFmbMenuScreen = () => {
  const [menuData, setMenuData] = useState([
    {
      date: "2024-10-10",
      occasion: "Eid-ul-Fitr",
      menu: "Biryani, Salad, Dessert",
    },
    {
      date: "2024-10-11",
      occasion: "Jumuah",
      menu: "Pulao, Raita, Sweets",
    },
    {
      date: "2024-10-12",
      occasion: "Normal Day",
      menu: "Dal, Rice, Sabzi, Roti",
    },
  ]);

  const fetchFmbMenu = async () => {
    try {
      const response = await axiosInstance.get("fmb/menu");
    //   setMenuData(response.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  useEffect(() => {
    fetchFmbMenu();
  }, []);

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      weekday: "short",
    }).format(date);
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: 3, paddingBottom: 3 }}>
      {menuData.map((item) => (
        <Card key={item.date} sx={{ margin: 2, backgroundColor: "#FEF7E6", display: "flex", borderRadius: 2, boxShadow: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 100, height: 100, margin: 2 }}
            image={menuImage}
            alt="Menu Icon"
          />
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="body1" color="text.secondary">
              {formattedDate(item.date)}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#AD7E05" }}>
              Occasion
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
              {item.occasion}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#AD7E05" }}>
              Menu
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.menu}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default ViewFmbMenuScreen;
