import React from "react";
import SideBar from "../components/Sidebar.js";
import Topbar from "../components/Topbar.js";
import NoteCard from "../components/NoteCard.js";
import { get } from "../lib/Requests";
import Cookies from "js-cookie";
import { Circles } from "react-loader-spinner";

export default function HomePage() {
  const [notes, setNotes] = React.useState([]);
  const dataFetchedRef = React.useRef(false);
  const user = Cookies.get("username");
  const [isLoading, setIsLoading] = React.useState(true);

  const loadData = async () => {
    let url = `/api/${user}/notes`;
    if (process.env.REACT_APP_ENV === "development") {
      url = `${process.env.REACT_APP_BACKEND_URL}/api/${user}/notes`;
    }
    get(url, {
      success: function (data) {
        setIsLoading(false);
        setNotes(data);
      },
    });
  };

  const onDelete = () => {
    loadData();
  }

  React.useEffect(() => {
    //prevents double call
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    loadData();
  }, []);

  return (
    <article>
      <Topbar title="Home" />
      <SideBar active="home" />
      <div className="content">
        {isLoading ? (
          <Circles
            height="4em"
            width="4em"
            color="#1D201F"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : notes.length === 0 ? (
          <div style={{ textAlign: "center"}}>
            <h4>You haven't created any notes yet!</h4>
          </div>
        ) : (
          <div className="cardGrid">
            {notes.map((note) => {
              return <NoteCard key={note._id} data={note} trashed="false" onDelete={onDelete} />;
            })}
          </div>
        )}
      </div>
    </article>
  );
}
