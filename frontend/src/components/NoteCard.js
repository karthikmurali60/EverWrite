import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ReactTimeAgo from "react-time-ago";
import { CardActionArea } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestorePageIcon from '@mui/icons-material/RestorePage';
import Cookies from "js-cookie";
import { put } from "../lib/Requests";

export default function NoteCard(props) {
  const user = Cookies.get("username");
  function truncate(str, l) {
    return str.length > l ? str.substring(0, l - 3) + "..." : str;
  }

  const url = `${user}/notes/${props.data._id}`;

  function deleteNote() {
    console.log("Deleting");
    const url = `${process.env.REACT_APP_BACKEND_URL}/${user}/notes`;
    put(
      url,
      {
        _id: props.data._id,
        deleted: true,
        title: props.data.title,
        content: props.data.content,
        tags: props.data.tags,
        username: user,
      },
      {
        success: function (data) {
          console.log("Deleted");
        },
      }
    );
  }

  function restoreNote() {
    console.log("Restoring");
    const url = `${process.env.REACT_APP_BACKEND_URL}/${user}/notes`;
    put(
      url,
      {
        _id: props.data._id,
        deleted: false,
        title: props.data.title,
        content: props.data.content,
        tags: props.data.tags,
        username: user,
      },
      {
        success: function (data) {
          console.log("Restored");
        },
      }
    );
  }

  if (props.trashed === "true") {
    return (
      <Card
        sx={{
          alignItems: "center",
          minWidth: "18em",
          maxWidth: "18em",
          maxHeight: "16em",
          minHeight: "16em",
        }}
        raised="true"
      >
        <CardContent>
          <Typography variant="h5" component="div">
            <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              {truncate(props.data.title, 23)}
            </span>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Last updated:{" "}
            <ReactTimeAgo date={props.data.updated_at} locale="en-US" />
          </Typography>
          <Typography
            variant="body2"
            sx={{
              minHeight: "7em",
              maxHeight: "7em",
            }}
          >
            <span
              style={{
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {truncate(props.data.content, 200)}
            </span>
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            aria-label="delete"
            onClick={() => {
              restoreNote();
            }}
          >
            <RestorePageIcon sx={{ color: "#1D201F" }} />
          </IconButton>
        </CardActions>
      </Card>
    );
  } else {
    return (
      <Card
        sx={{
          alignItems: "center",
          minWidth: "18em",
          maxWidth: "18em",
          maxHeight: "16em",
          minHeight: "16em",
        }}
        raised="true"
      >
        <CardActionArea href={url}>
          <CardContent>
            <Typography variant="h5" component="div">
              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                {truncate(props.data.title, 23)}
              </span>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Last updated:{" "}
              <ReactTimeAgo date={props.data.updated_at} locale="en-US" />
            </Typography>
            <Typography
              variant="body2"
              sx={{
                minHeight: "7em",
                maxHeight: "7em",
              }}
            >
              <span
                style={{
                  whiteSpace: "pre-wrap",
                  overflowWrap: "break-word",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {truncate(props.data.content, 200)}
              </span>
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          <IconButton
            aria-label="delete"
            onClick={() => {
              deleteNote();
            }}
          >
            <DeleteIcon sx={{ color: "#1D201F" }} />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}
