/* eslint-disable react/prop-types */
import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import FeedIcon from "@mui/icons-material/Feed";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import GavelIcon from "@mui/icons-material/Gavel";
import HelpIcon from "@mui/icons-material/Help";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const SideBar = ({ open, setOpen, Page, isAdmin }) => {
  let navigate = useNavigate();

  // User Side Bar data's
  const userSideBarDetails = [
    { Name: "Home", Icon: <HomeIcon key={0} />, URL: "/" },
    { Name: "Case Details", Icon: <FeedIcon key={1} />, URL: "/case-details" },
    {
      Name: "File a Case",
      Icon: <CreateNewFolderIcon key={2} />,
      URL: "/file-case",
    },
    { Name: "New Post", Icon: <PostAddIcon key={3} />, URL: "/new-post" },
    {
      Name: "Your Post",
      Icon: <CollectionsBookmarkIcon key={4} />,
      URL: "/your-post",
    },
    { Name: "Laws", Icon: <GavelIcon key={5} />, URL: "/laws" },
    { Name: "My Account", Icon: <AccountCircle key={6} />, URL: "/account" },
    { Name: "Help", Icon: <HelpIcon key={7} />, URL: "/help" },
  ];

  // Admin Side Bar data's
  // eslint-disable-next-line no-unused-vars
  const adminSideBarDetails = [
    { Name: "Home", Icon: <HomeIcon key={0} />, URL: "/" },
    { Name: "Cases", Icon: <FeedIcon key={1} />, URL: "/all-cases" },
    { Name: "My Account", Icon: <AccountCircle key={2} />, URL: "/account" },
  ];

  //Logout Function
  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div>
      <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <List>
            {!isAdmin && (
              <>
                <ListItem
                  disablePadding
                  sx={{
                    backgroundColor: Page === "OneClick" ? "primary.light" : "",
                  }}
                >
                  <ListItemButton onClick={() => navigate("/oneclick")}>
                    <ListItemIcon>
                      <PowerSettingsNewIcon />
                    </ListItemIcon>
                    <ListItemText primary="OneClick" />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            )}
            {isAdmin
              ? adminSideBarDetails.map((val, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{
                      backgroundColor: Page === val.Name ? "primary.light" : "",
                    }}
                  >
                    <ListItemButton onClick={() => navigate(`${val.URL}`)}>
                      <ListItemIcon>{val.Icon}</ListItemIcon>
                      <ListItemText primary={val.Name} />
                    </ListItemButton>
                  </ListItem>
                ))
              : userSideBarDetails.map((val, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{
                      backgroundColor: Page === val.Name ? "primary.light" : "",
                    }}
                  >
                    <ListItemButton onClick={() => navigate(`${val.URL}`)}>
                      <ListItemIcon>{val.Icon}</ListItemIcon>
                      <ListItemText primary={val.Name} />
                    </ListItemButton>
                  </ListItem>
                ))}
            <ListItem disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default SideBar;
