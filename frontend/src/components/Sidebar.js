import { Drawer, List, Stack, Toolbar } from "@mui/material";
import React from "react";
import SidebarItem from "./SidebarItem";
import { ListItemButton, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";

export default function Sidebar(props) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: "20%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "18%",
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: "#1D201F",
          color: "#FFFFFF",
        },
      }}
    >
      <List disablePadding>
        <Toolbar sx={{ marginBottom: "20px" }}>
          <Stack sx={{ width: "100%" }} direction="row" justifyContent="center">
            {/* <Avatar src={assets.images.logo} /> */}
          </Stack>
        </Toolbar>
        <SidebarItem
          url="/home"
          name="Home"
          handle="home"
          active={props.active}
        />
        <SidebarItem
          url="/trash"
          name="Trash"
          handle="trash"
          active={props.active}
        />
        <ListItemButton
          component={Link}
          to="/"
          sx={{
            color: "#FFFFFF",
            paddingY: "12px",
            paddingX: "24px",
            paddingTop: "205%"
          }}
          onClick={(event) => {
            Cookies.remove("username");
            Cookies.remove("name");
            window.location.href = `/home`;
          }}
        >
          <ListItemIcon
            sx={{
              color: "#FFFFFF",
            }}
          >
            <LogoutIcon />
          </ListItemIcon>
          Sign Out
        </ListItemButton>
      </List>
    </Drawer>
  );
}
