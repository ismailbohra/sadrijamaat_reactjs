import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import { FiChevronDown } from "react-icons/fi";
import React, { useEffect, useRef, useState } from "react";
import avatarpng from "../../assets/logo/avatar.png";

import { ClickAwayListener } from "@mui/base/ClickAwayListener";

function Cbutton() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    handleClick();
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        onClick={handleOpenUserMenu}
        sx={{
          maxWidth: 200,
          borderRadius: 2,
          boxShadow: 2,
          display: "flex",
          alignItems: "center",
          padding: 1,
          gap: 1,
        }}
        border={1}
        borderColor={"grey"}
      >
        <Avatar sx={{ width: 24, height: 24 }} src={avatarpng} />
        <Typography
          padding={0}
          margin={0}
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        >
          Hi Admin!
        </Typography>
        <FiChevronDown size={15} color={"black"} />
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
        >
          {settings.map((setting) => (
            <MenuItem key={setting}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </ClickAwayListener>
  );
}

export default Cbutton;
