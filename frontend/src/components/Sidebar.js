import { Drawer, List, Stack, Toolbar, Button, ListItemButton, ListItemIcon } from "@mui/material";
import React from "react";
import SidebarItem from "./SidebarItem";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import SendIcon from "@mui/icons-material/Send";
import Cookies from "js-cookie";
import { put } from "../lib/Requests";

export default function Sidebar(props) {
  const user = Cookies.get("username");

  const handleClick = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/${user}/notes`;
      const payload_data = {
        title: '',
        content: '',
        username: user,
        tags: [],
      };

      put(url, payload_data, {
        success: function (data) {
          window.location.href = `/${user}/notes/${data['note_id']}`;
        },
      });
      // Handle response
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

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
        <Button variant="contained" endIcon={<SendIcon />}
          component={Link}
          sx={{
            color: "#FFFFFF",
            paddingY: "12px",
            paddingX: "24px"
          }}
          onClick={() => {
            handleClick();
          }}
        >
          Create Note
        </Button>
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
          }}
          onClick={() => {
            Cookies.remove("username");
            Cookies.remove("name");
            window.location.href = `/`;
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
