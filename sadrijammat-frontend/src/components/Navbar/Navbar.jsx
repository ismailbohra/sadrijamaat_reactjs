import {
  Avatar,
  Box,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { Settings, Logout } from "@mui/icons-material";
import React, { useRef, useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { connect } from "react-redux";
import logo from "../../assets/logo/main_logo.png";
import demo from "../../assets/images/avatar.png";
import { Outlet, useNavigate } from "react-router-dom";

export const Navbar = (props) => {
  const nameRef = useRef(null);
  const imageRef = useRef(null);
  const avatarRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [nameWidth, setNameWidth] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const containerWidth =
        nameRef.current.parentElement.offsetWidth -
        imageRef.current.offsetWidth -
        avatarRef.current.offsetWidth -
        4; // adjust for padding
      setIsOverflowing(nameWidth > containerWidth);
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [nameWidth]);

  useEffect(() => {
    const measureNameWidth = () => {
      if (nameRef.current) {
        const span = document.createElement("span");
        span.textContent = nameRef.current.textContent;
        span.style.visibility = "hidden";
        span.style.position = "absolute";
        span.style.whiteSpace = "nowrap";
        document.body.appendChild(span);
        setNameWidth(span.offsetWidth);
        document.body.removeChild(span);
      }
    };

    measureNameWidth();
  }, []);
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"row"}
        height={"60px"}
        padding={2}
        bgcolor={"#fef7e6"}
        alignItems={"center"}
        gap={2}
      >
        <Image src={logo} height={"100%"} ref={imageRef} onClick={()=>navigate('/')}/>
        <Typography
          fontWeight={500}
          ref={nameRef}
          sx={{
            color: "#8C5F2E",
            overflow: "hidden",
            textOverflow: isOverflowing ? "ellipsis" : "clip",
            whiteSpace: "nowrap",
          }}
        >
          Ismail Sajjad Hussain Chhita Khera Wala
        </Typography>
        <Avatar
          ref={avatarRef}
          sx={{ marginLeft: "auto", cursor: "pointer" }}
          src={demo}
          onClick={() => setMenuOpen(true)}
        ></Avatar>
        <Menu
          anchorEl={avatarRef.current}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        >
          <MenuItem onClick={() => setMenuOpen(false)}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            Change Password
          </MenuItem>
          <MenuItem onClick={() => handlelogout()}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
      <Box sx={{ marginTop: 1 }}>
        <Outlet />
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
