import { Drawer, List, Stack, Toolbar } from "@mui/material";
import React from "react";
import SidebarItem from "./SidebarItem";

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
      </List>
    </Drawer>
  );
}
