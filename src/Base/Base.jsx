/* eslint-disable react/prop-types */
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SideBar from "./SideBar";
import Footer from "./Footer";
import NotificationMenu from "../container/NotificationMenu";
import { config } from "../config";
import { useNavigate } from "react-router-dom";

const Base = ({ children, Page }) => {
  let navigate = useNavigate();
  //Side Bar Setup
  const [open, setOpen] = useState(false);

  //Notification Setup
  const [showNot, setShowNot] = useState(null);
  const handleClickNotification = (event) => {
    setShowNot(event.currentTarget);
  };

  return (
    <div>
      {/*Side Bar Component*/}
      <SideBar open={open} setOpen={setOpen} Page={Page} />

      {/*Nav Bar Component*/}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => navigate("/")}
            >
              <img
                src={config.logo_url}
                alt="GaurdianSphere"
                className="w-[55px] h-[40px]"
              />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: "block" }}
            >
              {Page}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: "flex" }}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleClickNotification}
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ ml: 1 }}
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/*Notification Menu Component*/}
        <NotificationMenu anchorEl={showNot} setAnchorEl={setShowNot} />
      </Box>

      {/*Body Content*/}
      <main className="base-main">{children}</main>

      {/*Footer Component*/}
      <Footer Page={Page} />
    </div>
  );
};
export default Base;
